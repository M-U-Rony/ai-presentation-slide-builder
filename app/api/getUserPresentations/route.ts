import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  try {
    const presentations = await prisma.prsesentation.findMany({
      where: { userId: String(userId) },
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
