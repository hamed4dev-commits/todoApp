import * as z from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .trim()
      .min(3, "Name must have 3 or more character!"),
    email: z
      .string()
      .min(2, "Email is required")
      .trim()
      .email("Enter valid Email"),
    password: z
      .string()
      .min(1, "Password is required")
      .trim()
      .min(6, "Password must have 6 or more character!")
      .regex(/^\S+$/, "Password cannot contain spaces"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .trim()
      .regex(/^\S+$/, "Password cannot contain spaces"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  
export type SignUpType = z.infer<typeof SignUpSchema>;
