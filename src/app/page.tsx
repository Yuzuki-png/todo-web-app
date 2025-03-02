"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import TodoList from "@/components/TodoList";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await api.get<Todo[]>("/todos");
        setTodos(res.data);
      } catch (error) {
        console.error("ToDo取得エラー", error);
      }
    }
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo) return;
    try {
      const res = await api.post<Todo>("/todos", { title: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo("");
    } catch (error) {
      console.error("ToDo追加エラー", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("ToDo削除エラー", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">ToDo App</h1>
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
