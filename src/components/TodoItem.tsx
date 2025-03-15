import { Todo } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Trash, Check } from "lucide-react";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  // Function to handle toggling the todo status
  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  return (
    <li className="flex items-center justify-between p-3 border-b last:border-b-0 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={handleToggle}
          className={`flex items-center justify-center w-5 h-5 rounded-full border ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300"
          }`}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>

        <span
          onClick={handleToggle}
          className={`cursor-pointer transition-all ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {todo.text}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash className="w-4 h-4" />
      </Button>
    </li>
  );
}
