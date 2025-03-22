## 機能

- **ユーザー認証**: 安全なログイン/ログアウト機能
- **タスク管理**: タスクの追加、表示、完了/未完了の切り替え、削除
- **リアルタイムフィードバック**: 操作成功/失敗時のトースト通知
- **レスポンシブデザイン**: あらゆるデバイスに対応

## 技術スタック

- **フロントエンド**: Next.js, TypeScript, React
- **UI**: shadcn/ui, Tailwind CSS
- **API 通信**: Axios
- **認証**: JWT 認証
- **コンテナ化**: Docker

## セットアップ

### Docker を使用する場合

```bash
# リポジトリをクローン
git clone https://github.com/Yuzuki-png/todo-web-app.git

# ディレクトリに移動
cd my-todo-frontend

# Dockerコンテナを構築して起動
docker-compose up
```

### ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/Yuzuki-png/todo-web-app.git

# ディレクトリに移動
cd my-todo-frontend

# 依存関係のインストール
npm install

# 開発サーバーの起動
docker-compose up --build
```

## 使い方

1. ログイン画面でアカウント認証を行います
2. メイン画面でタスクを追加します
3. タスクの完了状態を切り替えるには、チェックボックスをクリックします
4. タスクを削除するには、ゴミ箱アイコンをクリックします

## API エンドポイント

アプリケーションは以下のエンドポイントと通信します：

- `POST /auth/login` - ユーザー認証
- `GET /auth/me` - ログインユーザー情報取得
- `GET /tasks` - タスク一覧取得
- `POST /tasks` - 新規タスク作成
- `PATCH /tasks/:id/toggle` - タスク完了状態の切り替え
- `DELETE /tasks/:id` - タスク削除
