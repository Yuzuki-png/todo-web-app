"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">ToDoリスト</h1>

        <div className="flex gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border px-4 py-2 rounded-lg"
            placeholder="タスクを入力..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            追加
          </button>
        </div>

        <ul className="list-disc list-inside text-lg">
          {tasks.length === 0 ? (
            <li className="text-gray-500">タスクがありません</li>
          ) : (
            tasks.map((t, index) => <li key={index}>{t}</li>)
          )}
        </ul>
      </main>
    </div>
  );
}
