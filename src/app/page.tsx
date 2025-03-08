"use client";

import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import { api } from "@/lib/api";
// src/types/index.ts
export type Todo = {
  id: number;
  text: string; // バックエンドに合わせてtextに統一
  completed: boolean;
};
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await api.get<Todo[]>("/tasks");
        setTodos(res.data); // 変換不要
      } catch (error) {
        console.error("ToDo取得エラー", error);
      }
    }
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await api.post<Todo>("/tasks", { text: newTodo });
      setTodos((prev) => [...prev, res.data]);
      setNewTodo("");
    } catch (error) {
      console.error("ToDo追加エラー", error);
    }
  };

  // 残りのコードは同じ

  // 以下省略...

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="flex gap-2">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="新しいToDoを追加..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTodo}
        >
          追加
        </button>
      </div>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
