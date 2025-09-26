import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

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
        picture: `https://avatar.iran.liara.run/public/${Math.floor(
          Math.random() * 100
        )}`,
      },
    });

    const token = jwt.sign({ userId: user.userId }, SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { message: "Signup Successfull" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
