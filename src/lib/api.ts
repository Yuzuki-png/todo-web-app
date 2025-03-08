import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://task-backend:3000";

export const api = axios.create({
  baseURL: API_URL,
});
