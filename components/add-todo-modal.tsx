"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AlertCircleIcon, SquarePen } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AddTodoModal({ setTodos, isEdit = false, todoData }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(todoData?.color || "");
  const [title, setTitle] = useState(todoData?.title || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddOrEditTodo = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        isEdit ? `/api/todo/todos/${todoData?.id}` : "/api/todo/todos",
        {
          method: isEdit ? "PUT" : "POST",
          body: JSON.stringify({ color, title }),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        if (isEdit) {
          setTodos((todos) => {
            const newTodoList = todos.map((todo) => {
              if (todo.id === todoData?.id) {
                return { ...todo, title, color };
              } else return todo;
            });
            return newTodoList;
          });
        } else {
          setTodos((todos) => [data?.todo, ...todos]);
          setColor("");
          setTitle("");
        }
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 flex justify-center">
      {isEdit && (
        <div
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent hover:text-white hover:outline-white"
        >
          <SquarePen />
        </div>
      )}
      <Dialog
        onOpenChange={(e) => {
          setOpen(e);
        }}
        open={open}
      >
        <DialogTrigger asChild>
          {!isEdit && (
            <Button variant="outline" onClick={() => setOpen(true)}>
              Add Todo
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                placeholder="Add your todo here"
                defaultValue={todoData?.title ?? ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Color
              </Label>
              <Select
                onValueChange={(e) => setColor(e)}
                defaultValue={todoData?.color ?? ""}
              >
                <SelectTrigger className="col-span-3 w-full">
                  <SelectValue
                    placeholder="Select a color"
                    className="w-full"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Colors</SelectLabel>
                    <SelectItem value="#a5b59d">
                      Green <div className="w-2 h-2 bg-[#a5b59d]"></div>
                    </SelectItem>
                    <SelectItem
                      value="#ebbba7"
                      className="flex justify-between"
                    >
                      Yellow <div className="w-2 h-2 bg-[#ebbba7]"></div>
                    </SelectItem>
                    <SelectItem value="#e18a77">
                      Red <div className="w-2 h-2 bg-[#e18a77]"></div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to add todo.</AlertTitle>
            </Alert>
          )}
          <DialogFooter>
            <Button
              disabled={!title || !color || loading}
              onClick={handleAddOrEditTodo}
              type="submit"
            >
              {isEdit ? "Edit Todo" : "Add Todo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
