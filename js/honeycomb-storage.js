// ハニカムグリッドの保存・読み込み機能を提供するJavaScriptファイル

// グローバルオブジェクトを確保
window.HoneycombApp = window.HoneycombApp || {};
const HoneycombApp = window.HoneycombApp;

// ローカルストレージのキー
HoneycombApp.STORAGE_KEYS = {
  WORKFLOW: 'honeycomb_workflow',
  CLIPBOARD: 'honeycomb_clipboard',
  SETTINGS: 'honeycomb_settings',
  PROJECT_PROMPT: 'honeycomb_project_prompt'
};

// ワークフローの保存
HoneycombApp.saveWorkflow = function() {
  try {
    const workflowData = HoneycombApp.exportWorkflowData();
    
    // ローカルストレージに保存
    localStorage.setItem(HoneycombApp.STORAGE_KEYS.WORKFLOW, JSON.stringify(workflowData));
    
    // ファイルとしてダウンロード
    const blob = new Blob([JSON.stringify(workflowData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `honeycomb-workflow-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('ワークフローが保存されました');
    return true;
  } catch (error) {
    console.error('ワークフローの保存に失敗しました:', error);
    return false;
  }
};

// ワークフローの読み込み
HoneycombApp.loadWorkflow = function() {
  // ファイル選択ダイアログを表示
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const workflowData = JSON.parse(e.target.result);
          const success = HoneycombApp.importWorkflowData(workflowData);
          
          if (success) {
            console.log('ワークフローが読み込まれました');
            // ローカルストレージにも保存
            localStorage.setItem(HoneycombApp.STORAGE_KEYS.WORKFLOW, JSON.stringify(workflowData));
          } else {
            alert('ワークフローの読み込みに失敗しました');
          }
        } catch (error) {
          console.error('ファイルの解析に失敗しました:', error);
          alert('無効なファイル形式です');
        }
      };
      reader.readAsText(file);
    }
  };
  
  input.click();
};

// 自動保存の読み込み
HoneycombApp.loadAutoSave = function() {
  try {
    const savedData = localStorage.getItem(HoneycombApp.STORAGE_KEYS.WORKFLOW);
    if (savedData) {
      const workflowData = JSON.parse(savedData);
      return HoneycombApp.importWorkflowData(workflowData);
    }
    return false;
  } catch (error) {
    console.error('自動保存データの読み込みに失敗しました:', error);
    return false;
  }
};

// クリップボードの保存
HoneycombApp.saveClipboard = function() {
  try {
    const clipboardEntries = [];
    const entries = document.querySelectorAll('.clipboard-entry');
    
    entries.forEach(entry => {
      const textarea = entry.querySelector('.clipboard-textarea');
      const typeElement = entry.querySelector('.entry-type');
      const timestampElement = entry.querySelector('.entry-timestamp');
      const nodeId = entry.getAttribute('data-node-id');
      
      if (textarea) {
        clipboardEntries.push({
          nodeId: nodeId,
          type: typeElement ? typeElement.textContent : '',
          content: textarea.value,
          timestamp: timestampElement ? timestampElement.textContent : new Date().toISOString()
        });
      }
    });
    
    // プロジェクトプロンプトも保存
    const projectPrompt = document.getElementById('project-prompt-textarea');
    const projectPromptContent = projectPrompt ? projectPrompt.value : '';
    
    const clipboardData = {
      entries: clipboardEntries,
      projectPrompt: projectPromptContent,
      timestamp: new Date().toISOString()
    };
    
    // ローカルストレージに保存
    localStorage.setItem(HoneycombApp.STORAGE_KEYS.CLIPBOARD, JSON.stringify(clipboardData));
    
    // ファイルとしてダウンロード
    const blob = new Blob([JSON.stringify(clipboardData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `honeycomb-clipboard-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('クリップボードが保存されました');
    return true;
  } catch (error) {
    console.error('クリップボードの保存に失敗しました:', error);
    return false;
  }
};

// クリップボードの読み込み
HoneycombApp.loadClipboard = function() {
  // ファイル選択ダイアログを表示
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const clipboardData = JSON.parse(e.target.result);
          const success = HoneycombApp.restoreClipboard(clipboardData);
          
          if (success) {
            console.log('クリップボードが読み込まれました');
            // ローカルストレージにも保存
            localStorage.setItem(HoneycombApp.STORAGE_KEYS.CLIPBOARD, JSON.stringify(clipboardData));
          } else {
            alert('クリップボードの読み込みに失敗しました');
          }
        } catch (error) {
          console.error('ファイルの解析に失敗しました:', error);
          alert('無効なファイル形式です');
        }
      };
      reader.readAsText(file);
    }
  };
  
  input.click();
};

// クリップボードの復元
HoneycombApp.restoreClipboard = function(clipboardData) {
  try {
    if (!clipboardData || !clipboardData.entries) {
      return false;
    }
    
    // プロジェクトプロンプトを復元
    if (clipboardData.projectPrompt) {
      const projectPrompt = document.getElementById('project-prompt-textarea');
      if (projectPrompt) {
        projectPrompt.value = clipboardData.projectPrompt;
      }
    }
    
    // クリップボードエントリを復元
    const clipboardContent = document.querySelector('.clipboard-content');
    if (clipboardContent) {
      // 既存のエントリをクリア（セパレーター以外）
      const existingEntries = clipboardContent.querySelectorAll('.clipboard-entry');
      existingEntries.forEach(entry => entry.remove());
      
      // 新しいエントリを追加
      clipboardData.entries.forEach(entryData => {
        HoneycombApp.addClipboardEntry(entryData.type, entryData.content, entryData.timestamp, entryData.nodeId);
      });
    }
    
    return true;
  } catch (error) {
    console.error('クリップボードの復元に失敗しました:', error);
    return false;
  }
};

// プロジェクトプロンプトの自動保存
HoneycombApp.autoSaveProjectPrompt = function() {
  const projectPrompt = document.getElementById('project-prompt-textarea');
  if (projectPrompt) {
    localStorage.setItem(HoneycombApp.STORAGE_KEYS.PROJECT_PROMPT, projectPrompt.value);
  }
};

// プロジェクトプロンプトの自動読み込み
HoneycombApp.autoLoadProjectPrompt = function() {
  const savedPrompt = localStorage.getItem(HoneycombApp.STORAGE_KEYS.PROJECT_PROMPT);
  const projectPrompt = document.getElementById('project-prompt-textarea');
  if (savedPrompt && projectPrompt) {
    projectPrompt.value = savedPrompt;
  }
};

// 定期的な自動保存
HoneycombApp.startAutoSave = function() {
  // 30秒ごとにワークフローを自動保存
  setInterval(() => {
    const workflowData = HoneycombApp.exportWorkflowData();
    localStorage.setItem(HoneycombApp.STORAGE_KEYS.WORKFLOW, JSON.stringify(workflowData));
  }, 30000);
  
  // 5秒ごとにプロジェクトプロンプトを自動保存
  setInterval(() => {
    HoneycombApp.autoSaveProjectPrompt();
  }, 5000);
};