import { NextResponse } from "next/server";

let todos = [{ id: 1, title: "最初のToDo", completed: false }];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}
