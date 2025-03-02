"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/" className="text-xl font-bold">
        ToDoアプリ
      </Link>
      {user ? (
        <button onClick={logout} className="text-red-400">
          ログアウト
        </button>
      ) : (
        <Link href="/login">ログイン</Link>
      )}
    </header>
  );
}
