import { Todo } from "@/app/page";

type Props = {
  todo: Todo;
  toggleTodo: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
};

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  // Function to handle toggling the todo status
  const handleToggle = () => {
    // Explicitly invert the current completed status
    toggleTodo(todo.id, !todo.completed);
  };

  return (
    <li className="flex justify-between p-2 border-b">
      <div className="flex items-center gap-2">
        {/* Checkbox to visually indicate toggle state */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-4 w-4"
        />
        <span
          onClick={handleToggle}
          className={`cursor-pointer ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </li>
  );
}
