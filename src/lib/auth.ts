// 認証関連のシンプルなヘルパー関数

// トークンの保存
export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

// トークンの取得
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// トークンの削除
export const removeToken = (): void => {
  localStorage.removeItem("token");
};

// ユーザーがログイン済みかをチェック
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
