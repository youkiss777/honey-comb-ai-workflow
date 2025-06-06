// UI related functionality for Honeycomb grid
window.HoneycombApp = window.HoneycombApp || {};
const HoneycombApp = window.HoneycombApp;

// Draw hexagonal grid and populate nodeData
HoneycombApp.drawGrid = function() {
  const svg = document.getElementById('honeycomb-container');
  if (!svg) return;

  svg.innerHTML = '';
  const width = svg.clientWidth || parseInt(svg.getAttribute('width'), 10);
  const height = svg.clientHeight || parseInt(svg.getAttribute('height'), 10);

  const radius = HoneycombApp.hexRadius || 40;
  const hexHeight = HoneycombApp.hexHeight || radius * Math.sqrt(3);
  const hexWidth = HoneycombApp.hexWidth || radius * 2;
  const spacingX = HoneycombApp.hexSpacingX || hexWidth * 0.75;
  const spacingY = HoneycombApp.hexSpacingY || hexHeight;

  const cols = Math.max(1, Math.floor(width / spacingX));
  const rows = Math.max(1, Math.floor(height / spacingY));

  const startX = (width - (cols - 1) * spacingX - hexWidth) / 2 + radius;
  const startY = (height - (rows - 1) * spacingY - hexHeight) / 2 + radius;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const centerX = startX + c * spacingX + (r % 2 ? spacingX / 2 : 0);
      const centerY = startY + r * spacingY;
      const nodeId = `${r}-${c}`;
      HoneycombApp.createNode(nodeId, r, c, centerX, centerY);

      const hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i + Math.PI / 6;
        points.push([
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle)
        ].join(','));
      }
      hex.setAttribute('points', points.join(' '));
      hex.setAttribute('fill', HoneycombApp.defaultTaskType.color);
      hex.setAttribute('stroke', '#ffffff');
      hex.setAttribute('stroke-width', '2');
      hex.dataset.nodeId = nodeId;

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', centerX);
      text.setAttribute('y', centerY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#ffffff');
      text.setAttribute('font-size', '10px');
      text.textContent = nodeId;

      svg.appendChild(hex);
      svg.appendChild(text);
    }
  }
};

// Set up basic UI listeners
HoneycombApp.setupAllUIListeners = function() {
  const svg = document.getElementById('honeycomb-container');
  if (!svg) return;

  svg.addEventListener('click', event => {
    if (event.target.tagName === 'polygon') {
      const nodeId = event.target.dataset.nodeId;
      HoneycombApp.selectedNodeId = nodeId;
      console.log('Selected node:', nodeId);
    }
  });

  const saveBtn = document.getElementById('save-button');
  if (saveBtn) saveBtn.addEventListener('click', HoneycombApp.saveWorkflow);
  const loadBtn = document.getElementById('load-button');
  if (loadBtn) loadBtn.addEventListener('click', HoneycombApp.loadWorkflow);
  const resetBtn = document.getElementById('reset-button');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      HoneycombApp.resetAllData();
      HoneycombApp.drawGrid();
    });
  }
};
