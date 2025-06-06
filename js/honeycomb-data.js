// ハニカムグリッドのデータ管理機能を提供するJavaScriptファイル

// グローバルオブジェクトを確保
window.HoneycombApp = window.HoneycombApp || {};
const HoneycombApp = window.HoneycombApp;

// データ構造の初期化
HoneycombApp.nodeData = {};
HoneycombApp.connectionData = {};
HoneycombApp.selectedNodes = [];
HoneycombApp.selectedNodeId = null;

// デフォルトタスクタイプ
HoneycombApp.defaultTaskType = {
  id: 'default',
  name: 'デフォルトタスク',
  color: '#555555',
  icon: '\uf111',
  iconClass: 'fa-circle'
};

// タスクタイプ定義
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

// AIモデル定義
HoneycombApp.aiModels = [
  { id: 'claude', name: 'Claude', shortName: 'CLA' },
  { id: 'gpt', name: 'GPT', shortName: 'GPT' },
  { id: 'gemini', name: 'Gemini', shortName: 'GEM' },
  { id: 'grok', name: 'Grok', shortName: 'GRO' },
  { id: 'perplexity', name: 'Perplexity', shortName: 'PPX' },
  { id: 'felo', name: 'Felo', shortName: 'FEL' },
  { id: 'genspark', name: 'Genspark', shortName: 'GSP' }
];

// グリッド設定
HoneycombApp.hexRadius = 40;
HoneycombApp.hexHeight = HoneycombApp.hexRadius * Math.sqrt(3);
HoneycombApp.hexWidth = HoneycombApp.hexRadius * 2;
HoneycombApp.hexSpacingX = HoneycombApp.hexWidth * 0.75;
HoneycombApp.hexSpacingY = HoneycombApp.hexHeight;

// ドラッグ関連の変数
HoneycombApp.isDragging = false;
HoneycombApp.dragStartNodeId = null;
HoneycombApp.tempArrow = null;

// ノードデータの取得
HoneycombApp.getNodeData = function(nodeId) {
  return HoneycombApp.nodeData[nodeId] || null;
};

// ノードデータの更新
HoneycombApp.updateNodeData = function(nodeId, data) {
  if (HoneycombApp.nodeData[nodeId]) {
    Object.assign(HoneycombApp.nodeData[nodeId], data);
    return true;
  }
  return false;
};

// 新しいノードの作成
HoneycombApp.createNode = function(nodeId, row, col, centerX, centerY) {
  HoneycombApp.nodeData[nodeId] = {
    id: nodeId,
    name: `タイル ${row}-${col}`,
    type: HoneycombApp.defaultTaskType.id,
    model: HoneycombApp.aiModels[0].id,
    position: { x: centerX, y: centerY },
    row: row,
    col: col,
    isTaskAssigned: false,
    prompt: '',
    maxLength: 500,
    creativity: 0.7,
    progress: 0,
    status: 'idle' // idle, running, complete, error
  };
  return HoneycombApp.nodeData[nodeId];
};

// 接続データの取得
HoneycombApp.getConnectionData = function(connectionId) {
  return HoneycombApp.connectionData[connectionId] || null;
};

// 接続の作成
HoneycombApp.createConnectionData = function(sourceNodeId, targetNodeId, directionType) {
  const connectionId = `${sourceNodeId}-${targetNodeId}`;
  
  HoneycombApp.connectionData[connectionId] = {
    sourceNodeId,
    targetNodeId,
    directionType,
    element: null
  };
  
  // 相互通行の場合は逆方向の接続も作成
  if (directionType === 'bidirectional') {
    const reverseConnectionId = `${targetNodeId}-${sourceNodeId}`;
    HoneycombApp.connectionData[reverseConnectionId] = {
      sourceNodeId: targetNodeId,
      targetNodeId: sourceNodeId,
      directionType,
      element: null
    };
  }
  
  return connectionId;
};

// 接続の削除
HoneycombApp.removeConnectionData = function(connectionId) {
  if (HoneycombApp.connectionData[connectionId]) {
    const connection = HoneycombApp.connectionData[connectionId];
    
    // 相互通行の場合は逆方向の接続データも削除
    if (connection.directionType === 'bidirectional') {
      const reverseConnectionId = `${connection.targetNodeId}-${connection.sourceNodeId}`;
      delete HoneycombApp.connectionData[reverseConnectionId];
    }
    
    delete HoneycombApp.connectionData[connectionId];
    return true;
  }
  return false;
};

// ワークフローデータのエクスポート
HoneycombApp.exportWorkflowData = function() {
  return {
    nodes: HoneycombApp.nodeData,
    connections: HoneycombApp.connectionData,
    metadata: {
      version: '1.0',
      timestamp: new Date().toISOString(),
      nodeCount: Object.keys(HoneycombApp.nodeData).length,
      connectionCount: Object.keys(HoneycombApp.connectionData).length
    }
  };
};

// ワークフローデータのインポート
HoneycombApp.importWorkflowData = function(data) {
  try {
    if (data.nodes) {
      HoneycombApp.nodeData = data.nodes;
    }
    if (data.connections) {
      HoneycombApp.connectionData = data.connections;
    }
    
    // グリッドとUIを再描画
    if (typeof HoneycombApp.drawGrid === 'function') {
      HoneycombApp.drawGrid();
    }
    
    return true;
  } catch (error) {
    console.error('ワークフローデータのインポートに失敗しました:', error);
    return false;
  }
};

// データの初期化
HoneycombApp.resetAllData = function() {
  HoneycombApp.nodeData = {};
  HoneycombApp.connectionData = {};
  HoneycombApp.selectedNodes = [];
  HoneycombApp.selectedNodeId = null;
  HoneycombApp.isDragging = false;
  HoneycombApp.dragStartNodeId = null;
  HoneycombApp.tempArrow = null;
};