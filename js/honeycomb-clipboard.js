// Clipboard UI utilities
window.HoneycombApp = window.HoneycombApp || {};
const HoneycombApp = window.HoneycombApp;

// Add clipboard entry element
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
  timeSpan.textContent = timestamp || new Date().toISOString();

  header.appendChild(typeSpan);
  header.appendChild(timeSpan);

  const textarea = document.createElement('textarea');
  textarea.className = 'clipboard-textarea';
  textarea.value = content || '';

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'button-group';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-button';
  copyBtn.textContent = '⧉';
  copyBtn.addEventListener('click', () => {
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (e) {}
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-button';
  deleteBtn.textContent = '×';
  deleteBtn.addEventListener('click', () => entry.remove());

  buttonGroup.appendChild(copyBtn);
  buttonGroup.appendChild(deleteBtn);

  entry.appendChild(header);
  entry.appendChild(textarea);
  entry.appendChild(buttonGroup);

  container.appendChild(entry);
  return entry;
};
