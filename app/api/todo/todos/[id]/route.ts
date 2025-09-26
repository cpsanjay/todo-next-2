import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }) {
  try {
    const userId = verifyToken(request);
    if (!userId) return NextResponse.json({ message: "Unauthenticated" });
    const { id } = await params;
    const { title, completed, color } = await request.json();

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;
    if (color !== undefined) updateData.color = color;

    const todo = await prisma.todos.update({
      where: {
        id,
      },
      data: updateData,
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
