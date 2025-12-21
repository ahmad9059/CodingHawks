import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { date: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        imageUrl: true,
        date: true,
      },
    });

    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}
