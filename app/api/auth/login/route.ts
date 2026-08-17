import users from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";
import z, { email } from "zod";

const LoginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = LoginSchema.parse(body);
    const user = users.find((u) => u.email === validated.email);

    if (!user || user.password !== validated.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }
    return NextResponse.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
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
