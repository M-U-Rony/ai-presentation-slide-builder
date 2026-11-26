import { prisma } from "@/lib/prisma";
import { apiOk, handleRoute, requireSession } from "@/lib/api";

// Always scoped to the signed-in user. There is intentionally no way to ask
// for another user's presentations.
export const GET = handleRoute("getUserPresentations", async () => {
  const session = await requireSession();

  const presentations = await prisma.presentation.findMany({
    where: { userId: session.user.id },
    // Only what the dashboard cards need: deck info plus the first slide.
    select: {
      id: true,
      title: true,
      totalSlides: true,
      themeColors: true,
      createdAt: true,
      slides: {
        orderBy: { slidenumber: "asc" },
        take: 1,
        select: { id: true, title: true, subtitle: true, slideLayout: true, content: true, imgUrl: true, slidenumber: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return apiOk(presentations);
});
