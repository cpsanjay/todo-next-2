"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import AddTodoModal from "../add-todo-modal";

export function TodoItem({
  description = "",
  item = {},
  onToggle,
  onDelete,
  setTodos,
}) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(item?.completed);

  const onChange = async (e) => {
    setChecked(!checked);
    setLoading(true);
    try {
      const res = await fetch(`/api/todo/todos/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: e }),
        credentials: "include",
      });
      onToggle(item.id, e);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      try {
        const res = await fetch(`/api/todo/todos/${item.id}`, {
          method: "DELETE",
          credentials: "include",
        });
        onDelete(item.id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-4 my-2 mx-2 bg-[${item.color}] text-black border-radium rounded-md p-1`}
    >
      <Checkbox
        className="peer-absolute left-0 translate-x-2.5"
        id="todo1"
        checked={checked}
        disabled={loading}
        onCheckedChange={onChange}
      />
      <label
        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="todo1"
      >
        {description}
      </label>
      <div className="ml-auto">
        <Button className="ml-auto h-8 w-8 mr-2" size="icon" variant="outline">
          <AddTodoModal isEdit={true} todoData={item} setTodos={setTodos} />
        </Button>
        <Button
          className="ml-auto h-8 w-8"
          size="icon"
          variant="outline"
          onClick={handleDelete}
        >
          <TrashIcon className="h-4 w-4 border-black" />
          <span className="sr-only">Delete task</span>
        </Button>
      </div>
    </div>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
