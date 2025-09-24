import { string, z } from "zod";

export const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
});

export const loginSchema = z.object({
  username: string(),
  password: string(),
});

const colors = ["#a5b59d", "#ebbba7", "#e18a77"];

export const createTodoSchema = z.object({
  title: z.string(),
  color: z.enum(colors),
});
