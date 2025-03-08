import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://task-backend:3000";

// タスクの一覧取得
export async function GET() {
  try {
    const res = await axios.get(`${API_URL}/tasks`);
    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// タスクの作成
export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const res = await axios.post(`${API_URL}/tasks`, { text });
    return NextResponse.json(res.data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
