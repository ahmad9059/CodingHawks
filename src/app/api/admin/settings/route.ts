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
    const settings = await prisma.siteSettings.findMany({
      orderBy: { key: "asc" },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
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

    // Check if setting with this key already exists
    const existingSetting = await prisma.siteSettings.findUnique({
      where: { key: data.key },
    });

    if (existingSetting) {
      return NextResponse.json(
        { error: "Setting with this key already exists" },
        { status: 400 }
      );
    }

    const setting = await prisma.siteSettings.create({
      data: {
        key: data.key,
        value: data.value,
        type: data.type,
      },
    });
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create setting" },
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
    const setting = await prisma.siteSettings.update({
      where: { id: data.id },
      data: {
        value: data.value,
        type: data.type,
      },
    });
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update setting" },
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

    await prisma.siteSettings.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete setting" },
      { status: 500 }
    );
  }
}
