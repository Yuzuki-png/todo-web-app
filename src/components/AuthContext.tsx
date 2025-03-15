"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ApiError } from "next/dist/server/api-utils";

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ログイン状態の確認
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // トークンをAPIヘッダーに設定
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // ユーザー情報を取得
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("認証エラー:", error);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ログイン処理
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;

      // トークンを保存
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // ユーザー情報を取得
      const userResponse = await api.get("/auth/me");
      setUser(userResponse.data);

      // ホームページへリダイレクト
      router.push("/");
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("ログインエラー:", err);
    }
  };

  // 新規登録処理
  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      await api.post("/auth/register", { name, email, password });
      router.push("/login");
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("登録エラー:", err);
    }
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 認証コンテキストを使用するためのカスタムフック
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
