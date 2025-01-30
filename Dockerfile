# 1. Node.jsの軽量な公式イメージを使用
FROM node:18-alpine AS builder

# 2. 作業ディレクトリを設定
WORKDIR /app

# 3. パッケージマネージャのキャッシュを活かすため、package.jsonだけ先にコピー
COPY package.json package-lock.json ./

# 4. 依存関係をインストール
RUN npm install

# 5. ソースコードをコピー
COPY . .

# 6. 本番ビルド（開発用の場合は省略）
RUN npm run build

# 7. 実行用の軽量イメージを使用（マルチステージビルド）
FROM node:18-alpine

# 8. 作業ディレクトリを設定
WORKDIR /app

# 9. 先ほどビルドしたファイルをコピー
COPY --from=builder /app ./

# 10. 環境変数を設定（開発環境の場合）
ENV NEXT_PUBLIC_API_URL=http://localhost:3001/api

# 11. サーバーを起動（開発環境用）
CMD ["npm", "run", "dev"]
