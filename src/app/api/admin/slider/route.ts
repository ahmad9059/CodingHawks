import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) return false;

  const payload = verifyToken(token);
  return !!payload;
}

export async function GET(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const images = await prisma.sliderImage.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const image = await prisma.sliderImage.create({
      data: {
        title: data.title,
        description: data.description || null,
        imageUrl: data.imageUrl,
        order: data.order,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create image" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const image = await prisma.sliderImage.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description || null,
        imageUrl: data.imageUrl,
        order: data.order,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.sliderImage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
