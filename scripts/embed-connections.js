#!/usr/bin/env node
/**
 * Embed connections from connections.md into each zettel.
 *
 * Adds/replaces a `## Connections` section at the end of each zettel
 * with outgoing and incoming edges, making the graph navigable without
 * cross-referencing connections.md.
 *
 * Usage:
 *   node scripts/embed-connections.js          # update all zettels
 *   node scripts/embed-connections.js --dry    # preview without writing
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { loadAll, bySlug, parseConnections, edgesFor, ZETTELS_DIR } from "./lib/parse.js";

const START_MARKER = "<!-- connections:start -->";
const END_MARKER = "<!-- connections:end -->";
const SECTION_HEADER = "## Connections";

const dry = process.argv.includes("--dry");

const zettels = loadAll();
const slugMap = bySlug(zettels);
const edges = parseConnections();

let updated = 0;
let unchanged = 0;

for (const zettel of zettels) {
  const { outgoing, incoming } = edgesFor(zettel.slug, edges);

  if (!outgoing.length && !incoming.length) {
    unchanged++;
    continue;
  }

  const section = buildSection(outgoing, incoming, slugMap);
  const originalContent = readFileSync(zettel.path, "utf-8");
  const newContent = replaceOrAppendSection(originalContent, section);

  if (originalContent === newContent) {
    unchanged++;
    continue;
  }

  if (dry) {
    console.log(`[dry] Would update: ${zettel.slug}`);
    updated++;
    continue;
  }

  writeFileSync(zettel.path, newContent);
  updated++;
}

console.log(`\nEmbed connections: ${updated} updated, ${unchanged} unchanged`);

function buildSection(outgoing, incoming, slugMap) {
  const lines = [START_MARKER, "", SECTION_HEADER, ""];

  if (outgoing.length) {
    lines.push("**Outgoing**");
    for (const e of outgoing) {
      const note = e.note ? ` — ${e.note}` : "";
      lines.push(`- ${e.label} → [[${e.target}]]${note}`);
    }
    lines.push("");
  }

  if (incoming.length) {
    lines.push("**Incoming**");
    for (const e of incoming) {
      const note = e.note ? ` — ${e.note}` : "";
      lines.push(`- [[${e.source}]] ← ${e.label}${note}`);
    }
    lines.push("");
  }

  lines.push(END_MARKER);
  return lines.join("\n");
}

function replaceOrAppendSection(content, section) {
  const startIdx = content.indexOf(START_MARKER);
  const endIdx = content.indexOf(END_MARKER);

  if (startIdx !== -1 && endIdx !== -1) {
    const before = content.slice(0, startIdx).trimEnd();
    const after = content.slice(endIdx + END_MARKER.length).trimStart();
    return before + "\n\n" + section + (after ? "\n\n" + after : "\n");
  }

  return content.trimEnd() + "\n\n" + section + "\n";
}
