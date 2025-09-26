"use client";

import AddTodoModal from "@/components/add-todo-modal";
import { TodoItem } from "@/components/ui/todo-item";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      console.log({ loading, user });
      router.push("/login");
      return;
    }
    const getTodos = async () => {
      try {
        const res = await fetch("/api/todo/todos", {
          credentials: "include",
        });
        const data = await res.json();
        setTodos(data?.todos);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, [user, loading, router]);

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
        {todos?.length === 0 ? (
          <div className="mx-auto flex">
            <span className="mx-auto mt-4">
              Add todo by clicking the button
            </span>
          </div>
        ) : (
          todos?.map((item, i) => (
            <TodoItem
              key={i}
              description={item?.title}
              item={item}
              onDelete={handleDelete}
              onToggle={handleToggle}
              setTodos={setTodos}
            />
          ))
        )}
        <AddTodoModal setTodos={setTodos} />
      </div>
    </div>
  );
}
