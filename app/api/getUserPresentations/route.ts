import { prisma } from "@/lib/prisma";
import { apiOk, handleRoute, requireSession } from "@/lib/api";

// Always scoped to the signed-in user. There is intentionally no way to ask
// for another user's presentations.
export const GET = handleRoute("getUserPresentations", async () => {
  const session = await requireSession();

  const presentations = await prisma.presentation.findMany({
    where: { userId: session.user.id },
    include: {
      slides: {
        orderBy: { slidenumber: "asc" },
        take: 1,
      },
    },
    orderBy: { id: "desc" },
  });

  return apiOk(presentations);
});
