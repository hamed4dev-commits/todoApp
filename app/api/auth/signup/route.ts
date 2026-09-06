import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { SignUpSchema } from "@/src/features/auth/schema/SignUp.schema";
import { SafeUser } from "@/src/features/auth/types/user";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const validated = SignUpSchema.parse(body);


    const checkRes = await fetch(
      `http://localhost:3001/users?email=${validated.email}`,
    );

    const existingUser = await checkRes.json();

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 },
      );
    }

    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: validated.name,
        email: validated.email,
        password: validated.password,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const newUser = await res.json();
    
    const safeUser: SafeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: safeUser
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
