import { Todo } from "@/app/page";
import TodoItem from "./TodoItem";
import { api } from "@/lib/api";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function TodoList({ todos, setTodos }: Props) {
  const [error, setError] = useState<string | null>(null);

  // Todoの完了状態を切り替える
  const toggleTodo = async (id: number) => {
    try {
      setError(null);
      // バックエンドのエンドポイントに合わせて /toggle を追加
      const response = await api.patch<Todo>(`/tasks/${id}/toggle`);

      if (response.data) {
        // APIからの応答を使用して状態を更新
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? response.data : todo))
        );
        // 成功メッセージをトーストで表示
        toast.success("タスクの状態を更新しました");
      }
    } catch (error: Error | unknown) {
      console.error("Todoの更新中にエラーが発生しました:", error);
      setError(
        "タスクの更新中にエラーが発生しました。もう一度お試しください。"
      );
      // エラーメッセージをトーストで表示
      toast.error("タスクの更新に失敗しました");
    }
  };

  // Todoを削除する
  const deleteTodo = async (id: number) => {
    try {
      setError(null);
      await api.delete(`/tasks/${id}`);

      // 削除に成功したら、ローカルの状態からも削除
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      // 成功メッセージをトーストで表示
      toast.success("タスクを削除しました");
    } catch (error: Error | unknown) {
      console.error("Todoの削除中にエラーが発生しました:", error);
      setError(
        "タスクの削除中にエラーが発生しました。もう一度お試しください。"
      );
      // エラーメッセージをトーストで表示
      toast.error("タスクの削除に失敗しました");
    }
  };

  return (
    <div className="w-full max-w-md">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {todos.length === 0 ? (
        <div className="text-center p-4 bg-gray-50 rounded-md">
          <p className="text-gray-500">
            タスクがありません。新しいタスクを追加してください。
          </p>
        </div>
      ) : (
        <ul className="mt-4 w-full border rounded-md overflow-hidden">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
