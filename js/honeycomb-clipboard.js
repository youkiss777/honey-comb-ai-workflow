// クリップボードUI操作を提供するJavaScriptファイル

// グローバルオブジェクトを確保
window.HoneycombApp = window.HoneycombApp || {};
const HoneycombApp = window.HoneycombApp;

/**
 * クリップボードUIを初期化
 */
HoneycombApp.initClipboard = function() {
  const clipboard = document.querySelector('.clipboard');
  if (!clipboard) return;

  // --- ヘッダーの生成 ---
  let header = clipboard.querySelector('.clipboard-header');
  if (!header) {
    header = document.createElement('div');
    header.className = 'clipboard-header';
    header.innerHTML = `
      <h2>Clipboard</h2>
      <div class="clipboard-controls">
        <button class="clipboard-button add-entry-button" title="Add entry">+</button>
        <button class="clipboard-button save-clipboard-button" title="Save"><i class="fas fa-download"></i></button>
        <button class="clipboard-button load-clipboard-button" title="Load"><i class="fas fa-upload"></i></button>
        <button class="clipboard-button clear-clipboard-button" title="Clear"><i class="fas fa-trash"></i></button>
        <button class="clipboard-button toggle-clipboard-button" title="Collapse"><i class="fas fa-chevron-up"></i></button>
      </div>`;
    clipboard.appendChild(header);
  }

  // --- コンテンツ領域の生成 ---
  let content = clipboard.querySelector('.clipboard-content');
  if (!content) {
    content = document.createElement('div');
    content.className = 'clipboard-content';
    content.innerHTML = `
      <div class="project-prompt-container">
        <div class="project-prompt-header">Project Prompt
          <div class="button-group"><button class="small-button copy-project-prompt">コピー</button></div>
        </div>
        <textarea id="project-prompt-textarea"></textarea>
      </div>
      <div class="clipboard-separator"></div>`;
    clipboard.appendChild(content);
  }

  // --- イベントリスナー設定 ---
  const toggleBtn = header.querySelector('.toggle-clipboard-button');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      content.classList.toggle('collapsed');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = content.classList.contains('collapsed') ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
      }
    });
  }

  const addBtn = header.querySelector('.add-entry-button');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      HoneycombApp.addClipboardEntry('メモ', '');
      HoneycombApp.saveClipboard?.();
    });
  }

  const saveBtn = header.querySelector('.save-clipboard-button');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => HoneycombApp.saveClipboard && HoneycombApp.saveClipboard());
  }

  const loadBtn = header.querySelector('.load-clipboard-button');
  if (loadBtn) {
    loadBtn.addEventListener('click', () => HoneycombApp.loadClipboard && HoneycombApp.loadClipboard());
  }

  const clearBtn = header.querySelector('.clear-clipboard-button');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      HoneycombApp.clearClipboard();
      HoneycombApp.saveClipboard?.();
    });
  }

  const copyPromptBtn = content.querySelector('.copy-project-prompt');
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      const textarea = content.querySelector('#project-prompt-textarea');
      if (textarea) navigator.clipboard.writeText(textarea.value);
    });
  }

  // 既存データの自動読み込み
  if (localStorage.getItem(HoneycombApp.STORAGE_KEYS.CLIPBOARD)) {
    const stored = JSON.parse(localStorage.getItem(HoneycombApp.STORAGE_KEYS.CLIPBOARD));
    HoneycombApp.restoreClipboard?.(stored);
  }
};

/**
 * クリップボードエントリを追加
 * @param {string} type - エントリの種類
 * @param {string} content - テキスト内容
 * @param {string} [timestamp] - タイムスタンプ文字列
 * @param {string} [nodeId] - 関連ノードID
 * @returns {HTMLElement|null}
 */
HoneycombApp.addClipboardEntry = function(type, content, timestamp, nodeId) {
  const container = document.querySelector('.clipboard-content');
  if (!container) return null;

  const entry = document.createElement('div');
  entry.className = 'clipboard-entry';
  if (nodeId) entry.setAttribute('data-node-id', nodeId);

  const header = document.createElement('div');
  header.className = 'clipboard-entry-header';

  const typeSpan = document.createElement('span');
  typeSpan.className = 'entry-type';
  typeSpan.textContent = type || '';

  const timeSpan = document.createElement('span');
  timeSpan.className = 'entry-timestamp';
  timeSpan.textContent = timestamp || new Date().toLocaleString();

  const btnGroup = document.createElement('div');
  btnGroup.className = 'button-group';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-button';
  copyBtn.textContent = 'C';
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(textarea.value);
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-button';
  delBtn.textContent = 'X';
  delBtn.addEventListener('click', () => {
    entry.remove();
    HoneycombApp.saveClipboard?.();
  });

  btnGroup.appendChild(copyBtn);
  btnGroup.appendChild(delBtn);

  header.appendChild(typeSpan);
  header.appendChild(timeSpan);
  header.appendChild(btnGroup);

  const textarea = document.createElement('textarea');
  textarea.className = 'clipboard-textarea';
  textarea.value = content || '';

  entry.appendChild(header);
  entry.appendChild(textarea);

  container.appendChild(entry);
  return entry;
};

/**
 * クリップボード内のすべてのエントリを削除
 */
HoneycombApp.clearClipboard = function() {
  const container = document.querySelector('.clipboard-content');
  if (!container) return;
  const entries = container.querySelectorAll('.clipboard-entry');
  entries.forEach(e => e.remove());
};

