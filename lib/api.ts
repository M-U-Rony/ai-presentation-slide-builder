import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/auth";

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "QUOTA_EXCEEDED"
  | "GENERATION_IN_PROGRESS"
  | "AI_TIMEOUT"
  | "AI_BAD_RESPONSE"
  | "AI_PROVIDER_ERROR"
  | "INTERNAL";

const STATUS: Record<ApiErrorCode, number> = {
  UNAUTHORIZED: 401,
  VALIDATION_ERROR: 400,
  NOT_FOUND: 404,
  QUOTA_EXCEEDED: 429,
  GENERATION_IN_PROGRESS: 409,
  AI_TIMEOUT: 504,
  AI_BAD_RESPONSE: 502,
  AI_PROVIDER_ERROR: 502,
  INTERNAL: 500,
};

export type ApiErrorBody = {
  success: false;
  error: { code: ApiErrorCode; message: string; meta?: Record<string, unknown> };
};

export type ApiOkBody<T> = { success: true; data: T };

/**
 * An error that is safe to show to the client. Anything else thrown inside
 * `handleRoute` is logged server-side and returned as a generic INTERNAL error.
 */
export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly meta?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function apiOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiOkBody<T>>({ success: true, data }, init);
}

export function apiError(code: ApiErrorCode, message: string, meta?: Record<string, unknown>) {
  return NextResponse.json<ApiErrorBody>(
    { success: false, error: { code, message, ...(meta ? { meta } : {}) } },
    { status: STATUS[code] },
  );
}

/** Returns the signed-in user or throws UNAUTHORIZED. */
export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new ApiError("UNAUTHORIZED", "Please sign in to continue.");
  }
  return session;
}

/** Parses the JSON body and validates it; throws VALIDATION_ERROR on failure. */
export async function parseBody<S extends z.ZodType>(req: NextRequest, schema: S): Promise<z.infer<S>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new ApiError("VALIDATION_ERROR", "Request body must be valid JSON.");
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new ApiError("VALIDATION_ERROR", result.error.issues[0]?.message ?? "Invalid request.");
  }
  return result.data;
}

/**
 * Wraps a route handler: ApiErrors become typed JSON errors; anything else is
 * logged with its route name and returned as INTERNAL without leaking details.
 */
export function handleRoute<A extends unknown[]>(
  name: string,
  fn: (...args: A) => Promise<Response>,
): (...args: A) => Promise<Response> {
  return async (...args: A) => {
    try {
      return await fn(...args);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "INTERNAL" || STATUS[err.code] >= 500) {
          console.error(`[api:${name}] ${err.code}: ${err.message}`, err.cause ?? "");
        }
        return apiError(err.code, err.message, err.meta);
      }
      console.error(`[api:${name}] unhandled error`, err);
      return apiError("INTERNAL", "Something went wrong. Please try again.");
    }
  };
}
