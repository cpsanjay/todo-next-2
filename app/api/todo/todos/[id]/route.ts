import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }) {
  try {
    const userId = verifyToken(request);
    if (!userId) return NextResponse.json({ message: "Unauthenticated" });
    const { id } = await params;
    const { title, completed } = await request.json();
    const todo = await prisma.todos.updateMany({
      where: {
        id,
      },
      data: {
        title,
        completed,
      },
    });

    if (todo.count === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(request: Request, { params }) {
  try {
    const userId = verifyToken(request);
    if (!userId) return NextResponse.json({ message: "Unauthenticated" });
    const { id } = await params;
    const todo = await prisma.todos.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Removed todo", todo });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
