
import { loginSchema } from "@/src/features/auth/schema/Login.schema";
import { SafeUser } from "@/src/features/auth/types/user";

import { NextRequest, NextResponse } from "next/server";
import z from "zod";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);

    const res = await fetch(
      `http://localhost:3001/users?email=${validated.email}`,
    );

    const users = await res.json();
    const user = users[0];
   
    if (!user || user.password !== validated.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }
    const safeUser: SafeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const response = NextResponse.json({
      message: "Login successful",
      user: safeUser,
    });
    response.cookies.set("token", user.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "validation Failed", error: error },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
