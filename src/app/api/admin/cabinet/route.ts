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
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(teamMembers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team members" },
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
    const teamMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        position: data.position,
        imageUrl: data.imageUrl || null,
        bio: data.bio || null,
        linkedin: data.linkedin || null,
        instagram: data.instagram || null,
        github: data.github || null,
        website: data.website || null,
        order: data.order || 0,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(teamMember);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create team member" },
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
    const teamMember = await prisma.teamMember.update({
      where: { id: data.id },
      data: {
        name: data.name,
        position: data.position,
        imageUrl: data.imageUrl || null,
        bio: data.bio || null,
        linkedin: data.linkedin || null,
        instagram: data.instagram || null,
        github: data.github || null,
        website: data.website || null,
        order: data.order || 0,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(teamMember);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team member" },
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

    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
