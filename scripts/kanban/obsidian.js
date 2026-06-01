/**
 * Obsidian Swimlane Kanban renderer.
 *
 * Produces a markdown file compatible with the Swimlane Kanban plugin.
 * H1 headings = swimlanes (threads), H2 headings = columns, list items = cards.
 *
 * @param {Array} threads — thread objects with columns of enriched members
 * @returns {string} Markdown document with swimlane-kanban frontmatter
 */

import { classifyColumn } from "./render.js";

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

const renderThreadSection = (thread) => {
  const lines = [`# ${thread.title}`];

  for (const col of COLUMNS) {
    const items = thread.columns[col] ?? [];
    lines.push(`## ${COLUMN_LABELS[col]}`);
    if (items.length) {
      lines.push(...items.map(renderItem));
    }
    lines.push("");
  }

  return lines.join("\n");
};

export const renderObsidian = (threads) => {
  const frontmatter = [
    "---",
    "swimlane-kanban: board",
    "---",
    "",
  ].join("\n");

  const body = threads.map(renderThreadSection).join("\n");

  return frontmatter + body;
};
