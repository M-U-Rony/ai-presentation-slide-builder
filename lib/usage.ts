import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api";
import { DAILY_DECK_LIMIT, DAILY_IMAGE_LIMIT } from "@/lib/constants";
import type { UsageKind } from "@/generated/prisma/enums";

const LIMITS: Record<UsageKind, number> = {
  DECK: DAILY_DECK_LIMIT,
  IMAGE: DAILY_IMAGE_LIMIT,
};

/**
 * A PENDING row older than this is treated as abandoned (e.g. the server was
 * restarted mid-generation) so it no longer blocks the user. It still counts
 * toward the daily quota.
 */
const STALE_PENDING_MS = 5 * 60 * 1000;

/** Quota windows are calendar days in the server's local time zone. */
function dayBounds(now = new Date()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export type UsageSummary = {
  deck: { used: number; limit: number };
  image: { used: number; limit: number };
  inProgress: boolean;
  resetsAt: string;
};

export async function getUsage(userId: string): Promise<UsageSummary> {
  const { start, end } = dayBounds();
  const [groups, pending] = await Promise.all([
    prisma.usageEvent.groupBy({
      by: ["kind"],
      where: { userId, createdAt: { gte: start } },
      _count: { _all: true },
    }),
    prisma.usageEvent.count({
      where: {
        userId,
        status: "PENDING",
        createdAt: { gte: new Date(Date.now() - STALE_PENDING_MS) },
      },
    }),
  ]);
  const used = (kind: UsageKind) => groups.find((g) => g.kind === kind)?._count._all ?? 0;

  return {
    deck: { used: used("DECK"), limit: LIMITS.DECK },
    image: { used: used("IMAGE"), limit: LIMITS.IMAGE },
    inProgress: pending > 0,
    resetsAt: end.toISOString(),
  };
}

/**
 * Atomically checks the daily quota and the one-generation-at-a-time rule
 * (across decks and images), then records a PENDING usage row.
 *
 * A per-user Postgres advisory lock serialises concurrent requests from the
 * same user, so two simultaneous requests cannot both pass the check.
 */
async function reserve(userId: string, kind: UsageKind): Promise<string> {
  const { start, end } = dayBounds();

  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${userId}))`;

    const active = await tx.usageEvent.count({
      where: {
        userId,
        status: "PENDING",
        createdAt: { gte: new Date(Date.now() - STALE_PENDING_MS) },
      },
    });
    if (active > 0) {
      throw new ApiError(
        "GENERATION_IN_PROGRESS",
        "Another generation is still running. Please wait for it to finish.",
      );
    }

    const used = await tx.usageEvent.count({
      where: { userId, kind, createdAt: { gte: start } },
    });
    if (used >= LIMITS[kind]) {
      const what = kind === "DECK" ? "decks" : "images";
      throw new ApiError(
        "QUOTA_EXCEEDED",
        `You have used all ${LIMITS[kind]} ${what} for today. Please try again tomorrow.`,
        { kind, used, limit: LIMITS[kind], resetsAt: end.toISOString() },
      );
    }

    const event = await tx.usageEvent.create({ data: { userId, kind } });
    return event.id;
  });
}

async function finish(eventId: string, status: "SUCCEEDED" | "FAILED") {
  try {
    await prisma.usageEvent.update({
      where: { id: eventId },
      data: { status, finishedAt: new Date() },
    });
  } catch (err) {
    // Never mask the generation's own result because bookkeeping failed;
    // a stuck PENDING row expires after STALE_PENDING_MS anyway.
    console.error("[usage] failed to finalise usage event", eventId, err);
  }
}

/**
 * Runs `fn` as one quota-counted generation. Quota is consumed whether `fn`
 * succeeds or fails (no refunds), per the project's quota policy.
 */
export async function withGeneration<T>(
  userId: string,
  kind: UsageKind,
  fn: () => Promise<T>,
): Promise<T> {
  const eventId = await reserve(userId, kind);
  try {
    const result = await fn();
    await finish(eventId, "SUCCEEDED");
    return result;
  } catch (err) {
    await finish(eventId, "FAILED");
    throw err;
  }
}
