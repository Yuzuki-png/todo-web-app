// db.ts
// Next.jsフロントエンドでは通常データベース接続は直接行いません
// このファイルはプレースホルダーとして残しておくか、
// もしくはAPI Routes内で使用する場合に備えた最小限の実装です

// 注: このファイルは必要に応じて実装するか、削除しても構いません
// データアクセスは基本的にAPIクライアント（api.ts）を通じて行うことをお勧めします

// サーバーサイドコンポーネントやAPI Routesでデータベースに接続する場合の例
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export const query = async (text: string, params?: any[]) => {
//   return pool.query(text, params);
// };
