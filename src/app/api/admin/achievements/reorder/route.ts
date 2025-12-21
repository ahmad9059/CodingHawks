import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const { achievements } = await request.json();

    // Update all achievements with new order
    await Promise.all(
      achievements.map((achievement: { id: string; order: number }) =>
        prisma.achievement.update({
          where: { id: achievement.id },
          data: { order: achievement.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering achievements:", error);
    return NextResponse.json(
      { error: "Failed to reorder achievements" },
      { status: 500 }
    );
  }
}
