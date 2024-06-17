# 飲み会マッチングサービス

## 環境構築手順
1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/nogamis1815/DrinkingPartyMatch.git
   cd DrinkingPartyMatch/backend
2. **環境変数ファイルのコピー**
   ```bash
    cp .env.example .env
3. **コンテナ立ち上げ**
    ```bash
    docker-compose build --no-cache
4. **マイグレーション実行**
    ```bash
    docker-compose exec laravel-app php artisan migrate
5. **ローカルホストにアクセス**
    http://localhost/

### 使用技術

- **PHP**: 8.2.20
- **Laravel**: 9.52.16
- **React**: 18.3.1
- **Docker**: 24.0.5
- **Nginx**: 1.27.0
- **Node.js**: 18.20.3
- **npm**: 10.7.0
- **Composer**: 2.7.7