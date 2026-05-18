/**
 * Shared parsing for z-yap zettels and connections.
 * Pure Node.js — no dependencies beyond fs/path.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
export const ZETTELS_DIR = join(ROOT, "zettels");
export const CONNECTIONS_FILE = join(ROOT, "connections.md");

// --- Zettel parsing ---

export const parseZettel = (filepath) => {
  const text = readFileSync(filepath, "utf-8");
  const parts = text.split("---");
  if (parts.length < 3) return null;

  const fm = parseFrontmatter(parts[1]);
  if (!fm) return null;

  const body = parts.slice(2).join("---").trim();
  const title =
    body.split("\n").find((l) => l.startsWith("# "))?.slice(2).trim() ??
    basename(filepath, ".md");

  return {
    slug: basename(filepath, ".md"),
    title,
    tags: fm.tags ?? [],
    refs: fm.refs ?? [],
    body,
    path: filepath,
  };
};

const parseFrontmatter = (raw) => {
  const tags = [];
  const refs = [];
  let currentKey = null;

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "[" || trimmed === "]") continue;

    const keyMatch = trimmed.match(/^(\w[\w-]*):\s*(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const rest = keyMatch[2].trim();
      if (rest.startsWith("[") && rest.endsWith("]")) {
        const items = rest
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (currentKey === "tags") tags.push(...items);
        if (currentKey === "refs") refs.push(...items);
        continue;
      }
      if (rest.startsWith("[")) {
        const items = rest
          .slice(1)
          .replace(/]$/, "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (currentKey === "tags") tags.push(...items);
        if (currentKey === "refs") refs.push(...items);
        continue;
      }
      continue;
    }

    const itemMatch = trimmed.match(/^-\s+(.+)$/);
    if (itemMatch && currentKey) {
      const val = itemMatch[1].trim().replace(/,\s*$/, "");
      if (currentKey === "tags") tags.push(val);
      if (currentKey === "refs") refs.push(val);
      continue;
    }

    if (currentKey && trimmed.endsWith(",")) {
      const val = trimmed.replace(/,\s*$/, "").trim();
      if (val && currentKey === "tags") tags.push(val);
      if (val && currentKey === "refs") refs.push(val);
    }
  }

  return { tags, refs };
};

export const loadAll = (dir = ZETTELS_DIR) =>
  readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => parseZettel(join(dir, f)))
    .filter(Boolean);

export const bySlug = (zettels) =>
  Object.fromEntries(zettels.map((z) => [z.slug, z]));

export const byTag = (zettels, ...tags) => {
  const set = new Set(tags);
  return zettels.filter((z) => z.tags.some((t) => set.has(t)));
};

// --- Connections parsing ---

const EDGE_RE =
  /^\[\[(?<source>[^\]]+)\]\]\s+--\[:(?<label>[A-Z_]+)\]--(?<arrow>>?)\s+\[\[(?<target>[^\]]+)\]\](?:\s+--\s+(?<note>[^@]*?))?(?:\s+@(?<date>\d{4}-\d{2}-\d{2}))?\s*$/;

export const parseConnections = (filepath = CONNECTIONS_FILE) => {
  const text = readFileSync(filepath, "utf-8");
  return text
    .split("\n")
    .map((line) => {
      const m = line.trim().match(EDGE_RE);
      if (!m) return null;
      return {
        source: m.groups.source,
        label: m.groups.label,
        target: m.groups.target,
        note: m.groups.note?.trim() || null,
        date: m.groups.date || null,
        directed: m.groups.arrow === ">",
      };
    })
    .filter(Boolean);
};

export const edgesFor = (slug, edges) => {
  const expanded = edges.flatMap((e) => [
    { ...e, directed: true },
    ...(e.directed ? [] : [{ ...e, source: e.target, target: e.source, directed: true }]),
  ]);
  return {
    outgoing: expanded.filter((e) => e.source === slug),
    incoming: expanded.filter((e) => e.target === slug),
  };
};

// --- Checkbox parsing (for queue zettels) ---

const CHECKBOX_RE = /^- \[( |x|~)\] (.+)$/;

export const parseCheckboxes = (body) =>
  body
    .split("\n")
    .map((line) => {
      const m = line.trim().match(CHECKBOX_RE);
      if (!m) return null;
      const status = { x: "resolved", "~": "dropped", " ": "open" }[m[1]];
      return { status, text: m[2].trim() };
    })
    .filter(Boolean);
