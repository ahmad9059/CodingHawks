import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const { images } = await request.json();

    // Update all slider images with new order
    await Promise.all(
      images.map((image: { id: string; order: number }) =>
        prisma.sliderImage.update({
          where: { id: image.id },
          data: { order: image.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering slider images:", error);
    return NextResponse.json(
      { error: "Failed to reorder slider images" },
      { status: 500 }
    );
  }
}
