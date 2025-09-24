import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createTodoSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userId = verifyToken(request);
    if (!userId)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    const todos = await prisma.todos.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = verifyToken(request);

    console.log({ userId });

    if (!userId)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await request.json();
    const verified = createTodoSchema.safeParse(body);

    console.log({ verified });

    if (verified.error)
      return NextResponse.json(
        { message: "error in the data sent", error: verified.error },
        { status: 402 }
      );

    const { title, color } = verified.data;

    console.log({ title, color });

    const todo = await prisma.todos.create({
      data: {
        title,
        color,
        authorId: userId,
      },
    });

    console.log({ todo });

    return NextResponse.json({ todo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 402 });
  }
}

// async function main() {
//   const todo = await prisma.todos.create({
//     data: {
//       authorId: userId,
//       title,
//       color,
//     },
//   });

//   console.log(todo);
// }

// main();
