import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiError, apiOk, handleRoute, requireSession } from "@/lib/api";

export const GET = handleRoute("getPresentation", async (req: NextRequest) => {
  const session = await requireSession();

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    throw new ApiError("VALIDATION_ERROR", "Presentation ID is required.");
  }

  // Ownership is part of the query, so "not yours" and "doesn't exist" are
  // indistinguishable to the caller (both 404).
  const presentation = await prisma.presentation.findFirst({
    where: { id, userId: session.user.id },
    include: {
      slides: {
        orderBy: { slidenumber: "asc" },
      },
    },
  });

  if (!presentation) {
    throw new ApiError("NOT_FOUND", "Presentation not found.");
  }

  return apiOk(presentation);
});
