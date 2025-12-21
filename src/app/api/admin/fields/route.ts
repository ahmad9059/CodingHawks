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
    const fields = await prisma.field.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(fields);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch fields" },
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
    const field = await prisma.field.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        order: data.order || 0,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(field);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create field" },
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
    const field = await prisma.field.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        order: data.order || 0,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(field);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update field" },
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

    await prisma.field.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete field" },
      { status: 500 }
    );
  }
}
