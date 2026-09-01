import users from "@/lib/users";

import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const LoginSchema = z.object({
  
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json();
    const validated = LoginSchema.parse(body);
    const user = users.find((u) => u.email === validated.email);
    console.log(user);
    if (!user || user.password !== validated.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }
    const response = NextResponse.json({
      message: "Login successful",
      user: { name: user.name, email: user.email, id: user.id },
    });
    response.cookies.set("token", user.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    
    return response
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
