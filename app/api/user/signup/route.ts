import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse({ error: validation.error.issues }, { status: 400 });
    }

    const { username, password, name } = validation.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 402 });
  }
}
