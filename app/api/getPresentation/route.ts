import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Presentation ID is required" },
      { status: 400 }
    );
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const presentation = await prisma.presentation.findUnique({
      where: { id },
      include: {
        slides: {
          orderBy: { slidenumber: "asc" },
        },
      },
    });

    if (!presentation) {
      return NextResponse.json(
        { success: false, error: "Presentation not found" },
        { status: 404 }
      );
    }

    // IDOR Protection: Verify that the requesting user owns this presentation
    if (presentation.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You do not have permission to view this presentation." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: presentation,
    });
  } catch (error) {
    console.error("Error fetching presentation:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}