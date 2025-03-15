import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://task-backend:3000";

export const api = axios.create({
  baseURL: API_URL,
});

// JWTトークンが存在する場合、リクエストヘッダーに追加
// src/lib/api.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// console.logを追加してデバッグ
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token exists:", !!token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Added Authorization header");
  }
  return config;
});
