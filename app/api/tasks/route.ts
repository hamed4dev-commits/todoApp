import { NextResponse } from "next/server";

const mockTodos = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build a project", completed: false },
  { id: 3, title: "Deploy to production", completed: false },
  { id: 4, title: "Write tests", completed: true },
  { id: 5, title: "Document code", completed: false },
];

export async function GET() {
  try {
    return NextResponse.json(mockTodos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
