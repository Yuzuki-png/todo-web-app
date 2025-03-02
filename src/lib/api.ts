import axios from "axios";

export const api = axios.create({
  baseURL: "http://nest:3001", // コンテナ名を指定してリクエスト
});
