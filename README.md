# 🍯 Honeycomb AI Workflow Tool

**六角形グリッドベースのAIタスク管理・ワークフロー可視化システム**

[![GitHub stars](https://img.shields.io/github/stars/youkiss777/honey-comb-ai-workflow?style=social)](https://github.com/youkiss777/honey-comb-ai-workflow/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/youkiss777/honey-comb-ai-workflow?style=social)](https://github.com/youkiss777/honey-comb-ai-workflow/network)
[![GitHub issues](https://img.shields.io/github/issues/youkiss777/honey-comb-ai-workflow)](https://github.com/youkiss777/honey-comb-ai-workflow/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📖 プロジェクト概要

Honeycomb AI Workflow Toolは、**六角形グリッド**を使用した革新的なAIタスク管理・ワークフロー可視化システムです。複数のAIモデルを統合し、視覚的で直感的なインターフェースでワークフローを設計・管理できます。

### ✨ 主な特徴

- 🔶 **六角形グリッドUI**: 従来の四角形グリッドより自然な多方向接続
- 🤖 **マルチAI対応**: Claude, GPT, Gemini, Grok, Perplexity等の統合管理
- 🎨 **視覚的ワークフロー**: ドラッグ&ドロップによる直感的操作
- 📋 **リアルタイムクリップボード**: 作業内容の即座保存・共有
- 🎯 **タスクタイプ管理**: 要約、調査、推論、アイデア生成等の分類
- 🔄 **接続システム**: 一方通行、双方向、方向性の可視化
- 🌙 **ダークテーマ**: 目に優しいUI設計
- 🇯🇵 **日本語完全対応**: 日本語環境での完全動作

## 🚀 クイックスタート

### 1. リポジトリのクローン
```bash
git clone https://github.com/youkiss777/honey-comb-ai-workflow.git
cd honey-comb-ai-workflow
```

### 2. 簡単な起動方法
最もシンプルな方法：
```bash
# HTTPサーバーを起動（Python 3.x）
python -m http.server 8000

# または Node.js環境で
npx serve .
```

ブラウザで `http://localhost:8000` にアクセス

### 3. 推奨ファイル
- **初心者**: `honeycomb-simple.html` - 基本機能のデモ
- **フル機能**: `honeycomb-grid.html` - 全機能統合版
- **モジュール版**: `honeycomb-grid-external.html` - 外部ファイル読み込み版

## 🎮 使用方法

### 基本操作
1. **ノード選択**: 六角形をクリック
2. **タスクタイプ設定**: 右パネルまたは右クリックメニュー
3. **AIモデル選択**: 設定パネルから選択
4. **接続作成**: Shift+ドラッグまたは2つのノード選択後「接続作成」
5. **テキスト入力**: ダブルクリックでクリップボードに追加

### 高度な機能
- **複数選択**: Ctrl+クリック
- **ズーム**: マウスホイール（Ctrl押しながら）
- **パネルリサイズ**: パネル境界をドラッグ
- **ワークフロー保存**: 保存ボタンでローカル保存

## 📁 プロジェクト構造

```
honey-comb-ai-workflow/
├── README.md                     # このファイル
├── package.json                  # Node.js設定
├── development_plan.md           # 開発計画
│
├── html/                         # HTMLファイル群
│   ├── honeycomb-simple.html     # シンプル版デモ
│   ├── honeycomb-grid.html       # 統合版（推奨）
│   ├── honeycomb-grid-external.html # 外部ファイル版
│   └── [その他のバリエーション]
│
├── js/                          # JavaScriptファイル群
│   ├── honeycomb-core.js        # コア機能・初期化
│   ├── honeycomb-grid.js        # グリッド描画・六角形管理
│   ├── honeycomb-ui.js          # UI操作・イベント処理
│   ├── honeycomb-data.js        # データ管理
│   ├── honeycomb-storage.js     # 保存・読み込み
│   └── honeycomb-clipboard.js   # クリップボード機能
│
├── css/                         # スタイルシート
│   └── honeycomb-styles.css     # 統合スタイル
│
└── docs/                        # ドキュメント
    ├── analysis-report.md       # 技術分析レポート
    └── api-reference.md         # API仕様書
```

## 🛠 技術スタック

### フロントエンド
- **HTML5** - セマンティックマークアップ
- **CSS3** - フレックスボックス、グリッド、アニメーション
- **JavaScript (ES6+)** - モジュール化、非同期処理
- **SVG** - ベクターグラフィックス、六角形描画

### 外部ライブラリ
- **Font Awesome 6.4.0** - アイコンライブラリ
- **Google Fonts** - 日本語対応フォント

### 対応AIモデル
- Claude (Anthropic)
- GPT (OpenAI)
- Gemini (Google)
- Grok (xAI)
- Perplexity
- Felo
- Genspark

## 🎨 タスクタイプ

| タイプ | 色 | 用途 |
|--------|--------|--------|
| 要約 | 🔴 赤 | 情報の要約・整理 |
| 調査 | 🟠 オレンジ | リサーチ・情報収集 |
| アイデア生成 | 🟡 黄 | ブレインストーミング・創造 |
| 推論 | 🟢 緑 | 論理的思考・分析 |
| 反論 | 🩷 ピンク | 批判的思考・反証 |
| 思考 | 🔵 水色 | 深い思考・哲学的検討 |
| コーディング | 🔵 青 | プログラミング・開発 |
| デバッグ | 🔴 赤 | エラー修正・最適化 |

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

### コントリビューション方法
1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### バグレポート・機能要求
[Issues](https://github.com/youkiss777/honey-comb-ai-workflow/issues) で報告してください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🔮 今後の予定

- [ ] リアルタイム協働機能
- [ ] AI実行エンジン統合
- [ ] モバイル対応強化
- [ ] テンプレート・ライブラリ
- [ ] エンタープライズ版開発

## 📞 連絡先

プロジェクトに関する質問やフィードバックがあれば、お気軽にご連絡ください。

---

⭐ このプロジェクトが役に立った場合は、GitHubでスターを付けていただけると嬉しいです！

**Made with ❤️ by [youkiss777](https://github.com/youkiss777)**