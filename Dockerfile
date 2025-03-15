# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピーして依存関係をインストール
COPY package.json package-lock.json ./
RUN npm ci

# アプリのコードをコピー
COPY . .

# Next.jsのビルド
RUN npm run build

# アプリを起動
CMD ["npm", "start"]
