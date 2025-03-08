import { Todo } from "@/app/page";
import TodoItem from "./TodoItem";
import { api } from "@/lib/api";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function TodoList({ todos, setTodos }: Props) {
  // Todoの完了状態を切り替える
  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      // バックエンドのエンドポイントに合わせて /toggle を追加
      const response = await api.patch<Todo>(`/tasks/${id}/toggle`);

      if (response.data) {
        // APIからの応答を使用して状態を更新
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? response.data : todo))
        );
      }
    } catch (error) {
      console.error("Todoの更新中にエラーが発生しました:", error);
    }
  };

  // Todoを削除する
  const deleteTodo = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);

      // 削除に成功したら、ローカルの状態からも削除
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Todoの削除中にエラーが発生しました:", error);
    }
  };

  return (
    <ul className="mt-4 w-full max-w-md">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
