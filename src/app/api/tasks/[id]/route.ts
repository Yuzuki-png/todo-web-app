import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/tasks";

// ✅ `DELETE /api/tasks/{id}`
export async function DELETE(
  _: NextRequest,
  { params }: { params?: { id?: string } }
) {
  if (!params?.id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const { id } = params;
  console.log(`Proxy DELETE request for task ID: ${id}`);

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to delete task: ${res.statusText}` },
        { status: res.status }
      );
    }

    console.log(`Task ${id} deleted successfully`);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Task deletion error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ `PATCH /api/tasks/{id}/toggle` に対応
export async function PATCH(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log(`🔄 PATCH request received for task ID: ${id}`);

  try {
    const res = await fetch(`${API_URL}/${id}/toggle`, {
      method: "PATCH",
    });

    console.log("🛠️ Forwarded to:", `${API_URL}/${id}/toggle`);
    console.log("🔄 Response status from backend:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("🚨 Failed to toggle task:", errorText);
      return NextResponse.json(
        { error: `Failed to toggle task: ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log(`✅ Task ${id} toggled successfully`);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("🚨 Task toggle error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
