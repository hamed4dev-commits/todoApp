import users from "@/lib/users";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const body = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {message: "Not authenticated"},
        { status: 401 },
      );
    }
    const user = users.find((u) => u.id === token);
    if (!user) {
      return NextResponse.json(
        {
          message: "User Not Found"
        },
        { status: 401 },
      );
    }
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
