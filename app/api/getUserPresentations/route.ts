import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Determine target userId: session user or explicit query param
    const searchParams = req.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId");
    const targetUserId = queryUserId || session?.user?.id;

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const presentations = await prisma.presentation.findMany({
      where: { userId: targetUserId },
      include: {
        slides: {
          orderBy: { slidenumber: "asc" },
          take: 1,
        },
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: presentations,
    });
  } catch (error) {
    console.error("Error fetching user presentations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
