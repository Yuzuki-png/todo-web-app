"use client";

import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, toggleTask } from "@/lib/api";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // タスク一覧を取得
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((error) => console.error("タスク取得エラー:", error));
  }, []);

  // タスクを追加
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const task = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, task]);
      setNewTask("");
    } catch (error) {
      console.error("タスク追加エラー:", error);
    }
  };

  // タスクを削除
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("タスク削除エラー:", error);
    }
  };

  // タスクの完了状態をトグル
  const handleToggleTask = async (id: number) => {
    try {
      const updatedTask = await toggleTask(id);
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) return updatedTask;
          return task;
        })
      );

      console.log(`updatedTask${updatedTask}`);
    } catch (error) {
      console.error("タスク更新エラー:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
      <div className="flex gap-2">
        <input
          className="border p-2 w-full"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="新しいタスクを入力"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2"
        >
          追加
        </button>
      </div>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b p-2"
          >
            <span
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
