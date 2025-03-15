"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import TodoList from "@/components/TodoList";
import { api } from "@/lib/api";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogOut, Plus } from "lucide-react";
import { AxiosError } from "axios";

// Todo型の定義
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();

  // タスク一覧の取得
  useEffect(() => {
    async function fetchTodos() {
      try {
        setError(null);
        setIsLoading(true);
        const res = await api.get<Todo[]>("/tasks");
        setTodos(res.data);
      } catch (error: unknown) {
        console.error("ToDo取得エラー", error);
        // トークン切れなどの認証エラーの場合
        if (error instanceof AxiosError && error.response?.status === 401) {
          toast.error(
            "ログインセッションが切れました。再度ログインしてください。"
          );
          logout();
        } else {
          setError("タスクの読み込み中にエラーが発生しました。");
          toast.error("タスクの読み込みに失敗しました");
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchTodos();
    }
  }, [user, logout]);

  // 新しいTodoを追加する
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    try {
      setError(null);
      setIsLoading(true);
      const res = await api.post<Todo>("/tasks", { text: newTodo });

      // APIからの応答を使用して状態を更新
      setTodos([...todos, res.data]);
      setNewTodo("");
      toast.success("新しいタスクを追加しました");
    } catch (error: unknown) {
      console.error("Todo追加エラー", error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error(
          "ログインセッションが切れました。再度ログインしてください。"
        );
        logout();
      } else {
        setError("タスクの追加中にエラーが発生しました。");
        toast.error("タスクの追加に失敗しました");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />

        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">タスク管理</h1>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              ログアウト
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <form onSubmit={addTodo} className="flex gap-2">
              <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新しいタスクを入力..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !newTodo.trim()}>
                <Plus className="mr-2 h-4 w-4" />
                追加
              </Button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              タスク一覧
            </h2>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <p className="text-gray-500">読み込み中...</p>
              </div>
            ) : (
              <TodoList todos={todos} setTodos={setTodos} />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
