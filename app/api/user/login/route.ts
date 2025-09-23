import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret123";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json({
        error: "Check the credential",
      });

    const { username, password } = validation.data;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Wrong Credentials" }, { status: 401 });
    }

    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "7d" });

    const response = NextResponse.json(
      { message: "Login Successfull" },
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
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
