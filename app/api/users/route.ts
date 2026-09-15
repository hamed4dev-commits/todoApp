import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }
    const res = await fetch(`http://localhost:3001/users`);
    if (!res?.ok) {
      return NextResponse.json(
        {
          message: "Cannot retrieve users",
        },
        { status: 502 },
      );
    }
    const users = await res.json();
    const safeUsers = users.map(
      ({ password, ...user }: { password: string; [key: string]: unknown }) =>
        user,
    );

    return NextResponse.json({ users: safeUsers });
  } catch (error) {
    console.error("GET /api/users error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
