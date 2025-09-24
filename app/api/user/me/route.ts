import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userId = verifyToken(request);

    if (!userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { userId },
      select: { name: true, username: true, userId: true, picture: true },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
