import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) return false;

  const payload = verifyToken(token);
  return !!payload;
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fields } = await request.json();

    // Update all fields with new order
    await Promise.all(
      fields.map((field: { id: string; order: number }) =>
        prisma.field.update({
          where: { id: field.id },
          data: { order: field.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reorder fields" },
      { status: 500 }
    );
  }
}
