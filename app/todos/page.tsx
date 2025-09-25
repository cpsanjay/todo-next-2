"use client";

import { TodoItem } from "@/components/ui/todo-item";
import { useAuth } from "@/context/AuthContext";

import { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    const getTodos = async () => {
      try {
        const res = await fetch("/api/todo/todos", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setTodos(data?.todos);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, [user]);

  const handleDelete = (id) => {
    setTodos((items) => items.filter((item) => item.id !== id));
  };

  const handleToggle = (id, completed) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  return (
    <div className="">
      <div className="mx-auto max-w-screen-md">
        {todos?.map((item, i) => (
          <TodoItem
            key={i}
            description={item?.title}
            item={item}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
