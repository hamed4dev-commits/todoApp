import * as z from "zod";

export const newTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: "Title must be at least 5 characters long" })
    .refine((value) => !/\d/.test(value), {
      message: "Title must not contain numbers",
    }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters long" })
    .refine((value) => !/\d/.test(value), {
      message: "Description must not contain numbers",
    }),
  // store completed as boolean; react-hook-form will convert the select value to boolean
  // completed: z.nativeEnum({ TRUE: "true", FALSE: "false" })
  completed: z.boolean(),
});
