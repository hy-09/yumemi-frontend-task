# 株式会社ゆめみ フロントエンドコーディング試験
## 成果物URL
https://hy-09.github.io/yumemi-frontend-task/

## 試験内容
https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d

## 技術スタック
### フロントエンド
#### メイン
- React 18 / TypeScript / Vite
- TailwindCSS
- Tanstack Query
- Recharts

#### リンター・フォーマッター
- ESLint
- Prettier

#### テストツール
- Vitest
- Mock Service Worker

### デプロイ
- GitHub Actions (GitHub Pages)
<br>

## ローカル環境構築
※Dockerがインストールされている前提になります
<br>
<br>

### cloneした後、`.env`を作成
```
cp .env.example .env
```

作成後、環境変数を設定する
<br>
<br>

### Dockerコンテナを起動
```
docker compose up -d
```  
※コンテナを起動した際に`npm i && npm run dev`を自動で実行するよう設定しています
<br>
<br>

コマンド（npm ... など）を実行する際は、以下を実行してコンテナ内に入ってから行う
```
docker compose exec frontend sh
```
ターミナルが`/frontend #`となっていればコンテナ内に入れています😉
<br>
<br>

### アプリ画面URL
http://localhost:5173/

