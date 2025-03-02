type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
  toggleTodo: (id: number, completed: boolean) => void;
};

export default function TodoItem({ todo, toggleTodo }: Props) {
  return (
    <li className="flex justify-between p-2 border-b">
      <span
        onClick={() => toggleTodo(todo.id, todo.completed)}
        className={`cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </span>
    </li>
  );
}
