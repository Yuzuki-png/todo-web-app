"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">ログイン</h1>
      <form className="w-64 flex flex-col gap-2" onSubmit={handleLogin}>
        <input
          type="email"
          className="border p-2 rounded"
          placeholder="メール"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 rounded"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          ログイン
        </button>
      </form>
    </div>
  );
}
