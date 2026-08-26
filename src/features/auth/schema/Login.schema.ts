import * as z from "zod";

export const loginSchema = z.object({
    email: z
      .string()
      .min(2, "Email is required")
      .trim()
      .email("Enter valid Email"),
    password: z
      .string()
      .min(1, "Password is required")
      .trim()
      .min(6, "Password must have 6 or more character!"),
  });
 export type loginType = z.infer<typeof loginSchema>;