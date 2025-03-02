"use client";

import TodoItem from "@/components/TodoItem";
import { api } from "@/lib/api";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export default function TodoList({ todos, setTodos }: Props) {
  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      await api.patch(`/todos/${id}`, { completed: !completed });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error("ToDo更新エラー", error);
    }
  };

  return (
    <ul className="mt-4 w-64">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
}
