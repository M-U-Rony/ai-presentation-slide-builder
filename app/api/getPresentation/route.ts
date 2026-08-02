import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

    if(!id){
        return NextResponse.json({
            success: false,
            error:"id required"
        })
    }

    try {

        const presentation = await prisma.prsesentation.findFirst({
            where: { id: Number(id) },
            include: { slides: true },
        })

        if (!presentation) {
      return NextResponse.json(
        { error: "Presentation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: presentation,
    });
        
    } catch (error) {
        console.error("Error fetching presentation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
    }
    
}