const API_URL = "/api/tasks"; // ✅ Next.js の API ルートを使用

export const getTasks = async () => {
  try {
    console.log(`Fetching: ${API_URL}`);

    const res = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

export const createTask = async (text: string) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error(`タスクの作成に失敗 (Status: ${res.status})`);

    return await res.json();
  } catch (error) {
    console.error("タスク作成エラー:", error);
    throw error;
  }
};
export const deleteTask = async (id: number) => {
  const res = await fetch(`/api/tasks/${id}`, {
    // ✅ Next.js の API にリクエスト
    method: "DELETE",
  });

  console.log("Response status:", res.status);

  if (!res.ok) throw new Error("タスクの削除に失敗しました");
};

export const toggleTask = async (id: number) => {
  const res = await fetch(`/api/tasks/${id}/toggle`, {
    method: "PATCH",
  });

  console.log("🔄 Response status:", res.status);
  console.log(`toggleTask: ${toggleTask}`);
  console.log(`res: ${res}`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("🚨 タスクのトグルに失敗しました:", errorText);
    throw new Error("タスクのトグルに失敗しました");
  }

  return res.json();
};
