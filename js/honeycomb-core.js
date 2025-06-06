// ハニカムグリッドのコア機能を提供するJavaScriptファイル

// グローバルオブジェクトを取得
const HoneycombApp = window.HoneycombApp;

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoadedイベントが発生しました');
  // 初期化処理
  setTimeout(function() {
    console.log('初期化処理を開始します');
    HoneycombApp.initializeApp();
  }, 1000);
});

// アプリケーションの初期化
HoneycombApp.initializeApp = function() {
  console.log('ハニカムグリッドアプリケーションを初期化しています...');

  // 必要なオブジェクトが定義されているか確認
  if (!HoneycombApp.hexRadius) {
    console.log('六角形の半径を設定します');
    HoneycombApp.hexRadius = 40;
    HoneycombApp.hexHeight = HoneycombApp.hexRadius * Math.sqrt(3);
    HoneycombApp.hexWidth = HoneycombApp.hexRadius * 2;
    HoneycombApp.hexSpacingX = HoneycombApp.hexWidth * 0.75;
    HoneycombApp.hexSpacingY = HoneycombApp.hexHeight;
  }

  if (!HoneycombApp.nodeData) {
    console.log('ノードデータを初期化します');
    HoneycombApp.nodeData = {};
  }

  if (!HoneycombApp.connectionData) {
    console.log('接続データを初期化します');
    HoneycombApp.connectionData = {};
  }

  if (!HoneycombApp.selectedNodes) {
    HoneycombApp.selectedNodes = [];
    HoneycombApp.selectedNodeId = null;
  }

  if (!HoneycombApp.defaultTaskType) {
    console.log('デフォルトタスクタイプを設定します');
    HoneycombApp.defaultTaskType = {
      id: 'default',
      name: 'デフォルトタスク',
      color: '#555555',
      icon: '\uf111',
      iconClass: 'fa-circle'
    };
  }

  if (!HoneycombApp.nodeTypes || HoneycombApp.nodeTypes.length === 0) {
    console.log('タスクタイプを設定します');
    HoneycombApp.nodeTypes = [
      { id: 'summary', name: '要約タスク', color: '#9900FF', icon: '\uf15c', iconClass: 'fa-file-alt' },
      { id: 'research', name: '調査タスク', color: '#FF6600', icon: '\uf002', iconClass: 'fa-search' },
      { id: 'ideation', name: 'アイデア生成', color: '#FFCC00', icon: '\uf0eb', iconClass: 'fa-lightbulb' },
      { id: 'reasoning', name: '推論タスク', color: '#00CC00', icon: '\uf5dc', iconClass: 'fa-brain' },
      { id: 'counter', name: '反論タスク', color: '#FF66CC', icon: '\uf362', iconClass: 'fa-exchange-alt' },
      { id: 'thinking', name: '思考タスク', color: '#00CCFF', icon: '\uf085', iconClass: 'fa-cogs' },
      { id: 'coding', name: 'コーディング', color: '#3366FF', icon: '\uf121', iconClass: 'fa-code' },
      { id: 'debug', name: 'デバッグ', color: '#FF3366', icon: '\uf188', iconClass: 'fa-bug' },
      { id: 'custom', name: 'カスタムタスク', color: '#0066FF', icon: '\uf005', iconClass: 'fa-star' }
    ];
  }

  if (!HoneycombApp.aiModels || HoneycombApp.aiModels.length === 0) {
    console.log('AIモデルを設定します');
    HoneycombApp.aiModels = [
      { id: 'claude', name: 'Claude', shortName: 'CLA' },
      { id: 'gpt', name: 'GPT', shortName: 'GPT' },
      { id: 'gemini', name: 'Gemini', shortName: 'GEM' },
      { id: 'grok', name: 'Grok', shortName: 'GRO' },
      { id: 'perplexity', name: 'Perplexity', shortName: 'PPX' },
      { id: 'felo', name: 'Felo', shortName: 'FEL' },
      { id: 'genspark', name: 'Genspark', shortName: 'GSP' }
    ];
  }

  // 初期状態でアイコンを設定
  const toggleButton = document.getElementById('toggle-settings');
  if (toggleButton) {
    const icon = toggleButton.querySelector('i');
    icon.className = 'fas fa-times';
  }

  // 初期状態でパネルが開いていることを確認
  const settingsPanel = document.getElementById('settings-panel');
  if (settingsPanel) {
    settingsPanel.classList.remove('collapsed');
  }

  // クリップボードUIの初期化
  if (typeof HoneycombApp.initClipboard === 'function') {
    HoneycombApp.initClipboard();
  }

  // SVG要素を確認
  const svg = document.getElementById('honeycomb-container');
  console.log('SVG要素:', svg);

  // グリッドを描画
  console.log('グリッド描画開始');
  HoneycombApp.drawGrid();
  console.log('グリッド描画完了');

  // 各種イベントリスナーを設定
  HoneycombApp.setupAllUIListeners();
  console.log('初期化完了');
}