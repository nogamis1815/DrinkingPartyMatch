# ベースイメージの指定
FROM node:18

# 作業ディレクトリの設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# 開発サーバーの起動
CMD ["npm", "start"]

# ポート3000を公開
EXPOSE 3000
