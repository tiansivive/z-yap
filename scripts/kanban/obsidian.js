/**
 * Obsidian Kanban renderer.
 *
 * Produces a markdown file compatible with the obsidian-kanban plugin.
 * Columns = status (Backlog, Ready, In Progress, Blocked, Done).
 * Thread names appear as delimiter cards within each column.
 *
 * @param {Array} threads — thread objects with columns of enriched members
 * @returns {string} Markdown document with kanban-plugin frontmatter
 */

const COLUMNS = ["backlog", "ready", "in-progress", "blocked", "done"];

const COLUMN_LABELS = {
  backlog: "Backlog",
  ready: "Ready",
  "in-progress": "In Progress",
  blocked: "Blocked",
  done: "Done",
};

const renderItem = (item) => {
  const checked = item.maturity === "implemented" ? "x" : " ";
  return `- [${checked}] [[${item.slug}|${item.title}]]`;
};

export const renderObsidian = (threads) => {
  const frontmatter = "---\nkanban-plugin: basic\n---\n\n";

  const lines = [];
  for (const col of COLUMNS) {
    lines.push(`## ${COLUMN_LABELS[col]}\n`);

    for (const thread of threads) {
      const items = thread.columns[col] ?? [];
      if (!items.length) continue;
      lines.push(`- [ ] **${thread.title}**`);
      lines.push(...items.map(renderItem));
    }
    lines.push("");
  }

  return frontmatter + lines.join("\n");
};
