import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import users from "@/lib/users";
import { v6 as uuidv6 } from "uuid";
import { cookies } from "next/headers";

const SignUpSchema = z
  .object({
    name: z.string().min(3).trim(),
    email: z.string().min(8).email().trim().toLowerCase(),
    password: z.string().min(6).regex(/^\S+$/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const validated = SignUpSchema.parse(body);
    const existingUser = users.find((user) => user.email === validated.email);
    console.log(users);
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 },
      );
    }
    const newUser = {
      name: validated.name,
      email: validated.email,
      password: validated.password,
      id: uuidv6() as string,
    };
    users.push(newUser);
    console.log(users);
    cookieStore.set("token", newUser.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: { name: newUser.name, email: newUser.email, id: newUser.id },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation Failed", errors: error },
        { status: 400 },
      );
    }
  }
  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 },
  );
}
