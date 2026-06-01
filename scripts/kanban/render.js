/**
 * Kanban HTML renderer.
 *
 * Takes structured thread data and produces a self-contained HTML string.
 * Includes a flyout panel for reading zettel content with rendered markdown.
 *
 * @param {Array} threads — thread objects with columns of enriched members
 * @param {{ zettels: Record<string, { title: string, body: string, tags: string[] }>, connections: Array<{ source: string, label: string, target: string, note?: string }> }} context
 * @returns {string} Complete HTML document
 */

const COLUMNS = ["backlog", "ready", "in-progress", "blocked", "done"];

const COLUMN_LABELS = {
  backlog: "Backlog",
  ready: "Ready",
  "in-progress": "In Progress",
  blocked: "Blocked",
  done: "Done",
};

const COLUMN_COLORS = {
  backlog: { bg: "#f1f2f4", border: "#ccc", badge: "#6b7280" },
  ready: { bg: "#e0f2fe", border: "#7dd3fc", badge: "#0369a1" },
  "in-progress": { bg: "#ede9fe", border: "#c4b5fd", badge: "#6d28d9" },
  blocked: { bg: "#fef3c7", border: "#fcd34d", badge: "#b45309" },
  done: { bg: "#dcfce7", border: "#86efac", badge: "#15803d" },
};

const MATURITY_COLORS = {
  implemented: "#15803d",
  "in-progress": "#6d28d9",
  incomplete: "#c2410c",
  planned: "#6b7280",
  speculative: "#9333ea",
  deferred: "#6b7280",
  deprecated: "#dc2626",
  rejected: "#dc2626",
  open: "#6b7280",
};

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const renderCard = (item) => {
  const matColor = MATURITY_COLORS[item.maturity] ?? "#6b7280";
  const readinessBadge = item.readiness
    ? `<span class="badge readiness">${escapeHtml(item.readiness)}</span>`
    : "";
  return `
      <div class="card" data-slug="${escapeHtml(item.slug)}">
        <span class="card-symbol" style="color: ${matColor}">${item.symbol}</span>
        <span class="card-title">${escapeHtml(item.title)}</span>
        <div class="card-meta">
          <span class="badge maturity" style="background: ${matColor}">${escapeHtml(item.maturity)}</span>
          ${readinessBadge}
        </div>
      </div>`;
};

const renderColumn = (key, items) => {
  const { bg, border } = COLUMN_COLORS[key];
  const label = COLUMN_LABELS[key];
  const count = items.length;
  return `
    <div class="column" style="background: ${bg}; border-color: ${border}">
      <div class="column-header">
        <span class="column-title">${label}</span>
        <span class="column-count">${count}</span>
      </div>
      <div class="column-body">
        ${items.map(renderCard).join("\n")}
      </div>
    </div>`;
};

const renderThread = (thread) => {
  const pct = thread.total ? Math.round((thread.done / thread.total) * 100) : 0;
  const columns = COLUMNS.map((key) => renderColumn(key, thread.columns[key] ?? [])).join("\n");
  return `
  <div class="swimlane">
    <div class="swimlane-header">
      <h2>${escapeHtml(thread.title)}</h2>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${pct}%"></div>
      </div>
      <span class="progress-label">${thread.done}/${thread.total}</span>
    </div>
    <div class="board">
      ${columns}
    </div>
  </div>`;
};

export const renderKanban = (threads, context = {}) => {
  const now = new Date().toISOString().slice(0, 10);
  const swimlanes = threads.map(renderThread).join("\n");
  const totalDone = threads.reduce((s, t) => s + t.done, 0);
  const totalItems = threads.reduce((s, t) => s + t.total, 0);

  const zettelJson = JSON.stringify(context.zettels ?? {});
  const connectionsJson = JSON.stringify(context.connections ?? []);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>z-yap threads — ${now}</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #f8f9fa;
    color: #1a1a1a;
    padding: 24px;
    line-height: 1.5;
  }
  body.flyout-open { overflow: hidden; }

  header {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e5e7eb;
  }
  header h1 { font-size: 1.5rem; font-weight: 700; }
  header .stats { color: #6b7280; font-size: 0.875rem; }

  .swimlane { margin-bottom: 32px; }

  .swimlane-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .swimlane-header h2 { font-size: 1.1rem; font-weight: 600; white-space: nowrap; }

  .progress-bar-container {
    flex: 1;
    max-width: 200px;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
  }
  .progress-bar {
    height: 100%;
    background: #15803d;
    border-radius: 3px;
    transition: width 0.3s;
  }
  .progress-label { font-size: 0.8rem; color: #6b7280; white-space: nowrap; }

  .board {
    display: grid;
    grid-template-columns: repeat(${COLUMNS.length}, 1fr);
    gap: 8px;
    min-height: 60px;
  }

  .column {
    border: 1px solid;
    border-radius: 8px;
    padding: 8px;
    min-height: 50px;
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  .column-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #374151; }
  .column-count {
    font-size: 0.7rem;
    background: rgba(0,0,0,0.08);
    padding: 1px 6px;
    border-radius: 10px;
    color: #374151;
  }

  .column-body { display: flex; flex-direction: column; gap: 6px; }

  .card {
    background: white;
    border-radius: 6px;
    padding: 8px 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.06);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: box-shadow 0.15s, transform 0.15s;
  }
  .card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    transform: translateY(-1px);
  }
  .card.active {
    outline: 2px solid #3b82f6;
    outline-offset: 1px;
  }
  .card-symbol { font-size: 0.9rem; flex-shrink: 0; }
  .card-title { font-size: 0.82rem; font-weight: 500; flex: 1; min-width: 0; }
  .card-meta { display: flex; gap: 4px; width: 100%; }

  .badge {
    font-size: 0.65rem;
    padding: 1px 6px;
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .badge.maturity { color: white; }
  .badge.readiness {
    background: transparent;
    border: 1px solid #d1d5db;
    color: #6b7280;
  }

  /* Flyout */
  .flyout-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.2);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s;
    z-index: 90;
  }
  .flyout-backdrop.visible { opacity: 1; pointer-events: auto; }

  .flyout {
    position: fixed;
    top: 0; right: 0;
    width: min(560px, 90vw);
    height: 100vh;
    background: white;
    box-shadow: -4px 0 24px rgba(0,0,0,0.12);
    transform: translateX(100%);
    transition: transform 0.25s ease;
    z-index: 100;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .flyout.open { transform: translateX(0); }

  .flyout-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 24px 12px;
    border-bottom: 1px solid #e5e7eb;
    flex-shrink: 0;
  }
  .flyout-header h3 { font-size: 1.15rem; font-weight: 700; margin: 0; line-height: 1.3; }
  .flyout-close {
    background: none; border: none;
    font-size: 1.5rem; color: #6b7280;
    cursor: pointer; padding: 0 4px;
    line-height: 1;
  }
  .flyout-close:hover { color: #1a1a1a; }

  .flyout-tags {
    padding: 8px 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    flex-shrink: 0;
  }
  .flyout-tag {
    font-size: 0.68rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: #f1f2f4;
    color: #374151;
    font-weight: 500;
  }

  .flyout-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px 24px 24px;
  }
  .flyout-content h1 { display: none; }
  .flyout-content h2 { font-size: 1rem; margin: 1.2em 0 0.4em; font-weight: 600; }
  .flyout-content h3 { font-size: 0.9rem; margin: 1em 0 0.3em; font-weight: 600; }
  .flyout-content p { margin: 0.5em 0; font-size: 0.88rem; }
  .flyout-content ul, .flyout-content ol { margin: 0.5em 0; padding-left: 1.5em; font-size: 0.88rem; }
  .flyout-content li { margin: 0.25em 0; }
  .flyout-content code { background: #f1f2f4; padding: 1px 4px; border-radius: 3px; font-size: 0.82rem; }
  .flyout-content pre { background: #f8f9fa; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 0.8em 0; }
  .flyout-content pre code { background: none; padding: 0; }
  .flyout-content strong { font-weight: 600; }
  .flyout-content a.backlink {
    color: #3b82f6;
    text-decoration: none;
    cursor: pointer;
    border-bottom: 1px dotted #93c5fd;
  }
  .flyout-content a.backlink:hover { border-bottom-style: solid; }
  .flyout-content a.backlink.dead { color: #6b7280; cursor: default; border-bottom-color: #d1d5db; }

  .flyout-connections {
    border-top: 1px solid #e5e7eb;
    padding: 12px 24px 20px;
    flex-shrink: 0;
    max-height: 35vh;
    overflow-y: auto;
  }
  .flyout-connections h4 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    margin-bottom: 6px;
  }
  .flyout-edge {
    font-size: 0.8rem;
    padding: 3px 0;
    display: flex;
    gap: 6px;
    align-items: baseline;
  }
  .flyout-edge .edge-label {
    font-size: 0.68rem;
    color: #6b7280;
    font-family: monospace;
    white-space: nowrap;
  }
  .flyout-edge .edge-target {
    color: #3b82f6;
    cursor: pointer;
    border-bottom: 1px dotted #93c5fd;
  }
  .flyout-edge .edge-target:hover { border-bottom-style: solid; }
  .flyout-edge .edge-target.dead { color: #374151; cursor: default; border-bottom: none; }
  .flyout-edge .edge-dir { color: #9ca3af; font-size: 0.75rem; }

  @media (max-width: 900px) {
    .board { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 600px) {
    .board { grid-template-columns: 1fr 1fr; }
    .flyout { width: 100vw; }
  }
</style>
</head>
<body>
  <header>
    <h1>z-yap threads</h1>
    <span class="stats">${totalDone}/${totalItems} items done &middot; ${threads.length} threads &middot; ${now}</span>
  </header>
  ${swimlanes}

  <div class="flyout-backdrop" id="flyout-backdrop"></div>
  <div class="flyout" id="flyout">
    <div class="flyout-header">
      <h3 id="flyout-title"></h3>
      <button class="flyout-close" id="flyout-close">&times;</button>
    </div>
    <div class="flyout-tags" id="flyout-tags"></div>
    <div class="flyout-content" id="flyout-content"></div>
    <div class="flyout-connections" id="flyout-connections"></div>
  </div>

<script>
const ZETTELS = ${zettelJson};
const CONNECTIONS = ${connectionsJson};
const allSlugs = new Set(Object.keys(ZETTELS));
const boardSlugs = new Set(document.querySelectorAll('.card[data-slug]').values().map(c => c.dataset.slug));

const flyout = document.getElementById('flyout');
const backdrop = document.getElementById('flyout-backdrop');
const flyoutTitle = document.getElementById('flyout-title');
const flyoutTags = document.getElementById('flyout-tags');
const flyoutContent = document.getElementById('flyout-content');
const flyoutConns = document.getElementById('flyout-connections');

let activeCard = null;

function openFlyout(slug) {
  const z = ZETTELS[slug];
  if (!z) return;

  if (activeCard) activeCard.classList.remove('active');
  activeCard = document.querySelector('.card[data-slug="' + slug + '"]');
  if (activeCard) activeCard.classList.add('active');

  flyoutTitle.textContent = z.title;
  flyoutTags.innerHTML = z.tags.map(t => '<span class="flyout-tag">' + t + '</span>').join('');

  let html = marked.parse(z.body);
  html = html.replace(/\\[\\[([^\\]|]+?)(?:\\|([^\\]]+?))?\\]\\]/g, (_, target, label) => {
    const display = label || target;
    if (boardSlugs.has(target)) {
      return '<a class="backlink" data-slug="' + target + '">' + display + '</a>';
    } else if (allSlugs.has(target)) {
      return '<a class="backlink dead" title="' + target + ' (not on board)">' + display + '</a>';
    }
    return '<a class="backlink dead">' + display + '</a>';
  });
  flyoutContent.innerHTML = html;

  const outgoing = CONNECTIONS.filter(e => e.source === slug);
  const incoming = CONNECTIONS.filter(e => e.target === slug);

  let connsHtml = '';
  if (outgoing.length || incoming.length) {
    connsHtml = '<h4>Connections</h4>';
    for (const e of outgoing) {
      const targetZ = ZETTELS[e.target];
      const display = targetZ ? targetZ.title : e.target;
      const cls = boardSlugs.has(e.target) ? 'edge-target' : 'edge-target dead';
      const ds = boardSlugs.has(e.target) ? ' data-slug="' + e.target + '"' : '';
      connsHtml += '<div class="flyout-edge"><span class="edge-dir">&rarr;</span><span class="edge-label">' + e.label + '</span><span class="' + cls + '"' + ds + '>' + display + '</span></div>';
    }
    for (const e of incoming) {
      const sourceZ = ZETTELS[e.source];
      const display = sourceZ ? sourceZ.title : e.source;
      const cls = boardSlugs.has(e.source) ? 'edge-target' : 'edge-target dead';
      const ds = boardSlugs.has(e.source) ? ' data-slug="' + e.source + '"' : '';
      connsHtml += '<div class="flyout-edge"><span class="edge-dir">&larr;</span><span class="edge-label">' + e.label + '</span><span class="' + cls + '"' + ds + '>' + display + '</span></div>';
    }
  }
  flyoutConns.innerHTML = connsHtml;

  flyout.classList.add('open');
  backdrop.classList.add('visible');
  document.body.classList.add('flyout-open');
  flyoutContent.scrollTop = 0;
}

function closeFlyout() {
  flyout.classList.remove('open');
  backdrop.classList.remove('visible');
  document.body.classList.remove('flyout-open');
  if (activeCard) { activeCard.classList.remove('active'); activeCard = null; }
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card[data-slug]');
  if (card) { openFlyout(card.dataset.slug); return; }

  const link = e.target.closest('[data-slug]');
  if (link && flyout.contains(link)) { openFlyout(link.dataset.slug); return; }
});

document.getElementById('flyout-close').addEventListener('click', closeFlyout);
backdrop.addEventListener('click', closeFlyout);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeFlyout(); });
<\/script>
</body>
</html>`;
};

/**
 * Classify a member into a kanban column.
 * @param {{ maturity: string, readiness: string }} item
 * @returns {string} Column key
 */
export const classifyColumn = ({ maturity, readiness }) => {
  if (maturity === "implemented") return "done";
  if (maturity === "in-progress") return "in-progress";
  if (readiness === "blocked" || readiness === "needs-design") return "blocked";
  if (readiness === "ready") return "ready";
  return "backlog";
};
