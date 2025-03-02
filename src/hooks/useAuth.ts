import { useState, useEffect } from "react";
import { api } from "@/lib/api";

type User = {
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ email: "test@example.com" }); // 本来はAPIからユーザーデータを取得する
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post<{ token: string }>("/auth", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser({ email });
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("ログインに失敗しました");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}
