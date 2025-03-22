import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://todoapp.click";
export async function DELETE(request: NextRequest) {
  try {
    // URLからidをパース
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    console.log(`Attempting to delete task with ID: ${id}`);
    console.log(`Request URL: ${API_URL}/tasks/${id}`);

    await axios.delete(`${API_URL}/tasks/${id}`);
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    console.error("タスク削除エラー", error);
    // エラーの詳細情報を出力
    if (axios.isAxiosError(error)) {
      console.log("Request config:", error.config);
      console.log("Response status:", error.response?.status);
      console.log("Response data:", error.response?.data);
    }
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 2]; // /[id]/toggleの形式なので-2

    console.log(`Toggling task with ID: ${id}`);
    console.log(`Request URL: ${API_URL}/tasks/${id}/toggle`);

    const res = await axios.patch(`${API_URL}/tasks/${id}/toggle`);
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("タスク更新エラー", error);
    // エラーの詳細情報を出力
    if (axios.isAxiosError(error)) {
      console.log("Request config:", error.config);
      console.log("Response status:", error.response?.status);
      console.log("Response data:", error.response?.data);
    }
    return NextResponse.json(
      { error: "Failed to toggle task" },
      { status: 500 }
    );
  }
}
