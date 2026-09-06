import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { SafeUser } from "@/src/features/auth/types/user";

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
    
    const res = await fetch(`http://localhost:3001/users/${token}`);
    if (!res.ok) {
      return NextResponse.json(
        {
          message: "User Not Found",
        },
        { status: 401 },
      );
    }
    const user = await res.json();
    const safeUser: SafeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return NextResponse.json({
      user: safeUser
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
