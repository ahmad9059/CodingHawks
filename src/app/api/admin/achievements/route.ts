import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const achievement = await prisma.achievement.create({
      data: {
        title: data.title,
        description: data.description,
        year: data.year,
        imageUrl: data.imageUrl,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
        buttonEnabled: data.buttonEnabled,
        order: data.order,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Error creating achievement:", error);
    return NextResponse.json(
      { error: "Failed to create achievement" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const achievement = await prisma.achievement.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        year: data.year,
        imageUrl: data.imageUrl,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
        buttonEnabled: data.buttonEnabled,
        order: data.order,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Error updating achievement:", error);
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.achievement.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
