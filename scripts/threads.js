#!/usr/bin/env node
/**
 * Detailed thread status — per-thread member listing with maturity and readiness.
 *
 * Usage:
 *   node scripts/threads.mjs                    # all threads
 *   node scripts/threads.mjs --thread row       # filter by thread name substring
 *   node scripts/threads.mjs --markdown         # plain markdown output
 *   node scripts/threads.mjs --pending          # only show non-implemented items
 *   node scripts/threads.mjs --html             # kanban board → dist/threads.html
 *   node scripts/threads.mjs --html --open      # kanban board + open in browser
 *   node scripts/threads.mjs --obsidian         # swimlane kanban → dist/threads.kanban.md
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { loadAll, byTag, parseConnections, edgesFor } from "./lib/parse.js";
import { renderKanban, classifyColumn } from "./kanban/render.js";
import { renderObsidian } from "./kanban/obsidian.js";

const args = process.argv.slice(2);
const markdown = args.includes("--markdown");
const html = args.includes("--html");
const obsidian = args.includes("--obsidian");
const autoOpen = args.includes("--open");
const pendingOnly = args.includes("--pending");
const threadFilterIdx = args.indexOf("--thread");
const threadFilter = threadFilterIdx >= 0 ? args[threadFilterIdx + 1] : null;

const zettels = loadAll();
const edges = parseConnections();
const slugIndex = Object.fromEntries(zettels.map((z) => [z.slug, z]));

const MATURITY_TAGS = new Set(["implemented", "in-progress", "planned", "speculative", "deprecated", "rejected", "deferred", "incomplete"]);
const READINESS_TAGS = new Set(["ready", "blocked", "needs-design"]);
const READINESS_ORDER = ["ready", "blocked", "needs-design", ""];
const MATURITY_SYMBOLS = {
  implemented: "✓",
  "in-progress": "◐",
  incomplete: "◔",
  planned: "○",
  speculative: "?",
  deferred: "⏸",
  deprecated: "✗",
  rejected: "✗",
  "~": " ",
};

const maturityOf = (z) => z.tags.find((t) => MATURITY_TAGS.has(t)) ?? "~";
const readinessOf = (z) => z.tags.find((t) => READINESS_TAGS.has(t)) ?? "";

let threads = byTag(zettels, "thread");
if (threadFilter) {
  threads = threads.filter((t) => t.slug.includes(threadFilter) || t.title.toLowerCase().includes(threadFilter.toLowerCase()));
}
threads.sort((a, b) => a.title.localeCompare(b.title));

const sharedEdges = edges.filter((e) => e.label === "SHARED_WITH");

const threadData = threads.map((thread) => {
  const { outgoing } = edgesFor(thread.slug, edges);
  let members = outgoing
    .filter((e) => e.label === "INCLUDES")
    .map((e) => slugIndex[e.target])
    .filter(Boolean);

  if (pendingOnly) {
    members = members.filter((m) => maturityOf(m) !== "implemented");
  }

  members.sort((a, b) => {
    const ra = READINESS_ORDER.indexOf(readinessOf(a));
    const rb = READINESS_ORDER.indexOf(readinessOf(b));
    if (ra !== rb) return ra - rb;
    const implemented = (m) => (maturityOf(m) === "implemented" ? 1 : 0);
    return implemented(a) - implemented(b);
  });

  const shared = sharedEdges
    .filter((e) => e.source === thread.slug || e.target === thread.slug)
    .map((e) => ({
      other: e.source === thread.slug ? e.target : e.source,
      note: e.note,
    }));

  const enriched = members.map((m) => {
    const maturity = maturityOf(m);
    const readiness = readinessOf(m);
    return {
      title: m.title,
      slug: m.slug,
      maturity,
      readiness,
      symbol: MATURITY_SYMBOLS[maturity] ?? " ",
    };
  });

  const done = enriched.filter((m) => m.maturity === "implemented").length;

  const columns = Object.groupBy(enriched, (m) => classifyColumn(m));

  return { title: thread.title, slug: thread.slug, done, total: enriched.length, shared, members: enriched, columns };
});

const ROOT = join(import.meta.dirname, "..");
const distDir = join(ROOT, "dist");

if (html) {
  mkdirSync(distDir, { recursive: true });
  const zettelMap = Object.fromEntries(zettels.map(z => [z.slug, { title: z.title, body: z.body, tags: z.tags }]));
  const connData = edges.map(({ source, label, target, note }) => ({ source, label, target, note }));
  const outPath = join(distDir, "threads.html");
  writeFileSync(outPath, renderKanban(threadData, { zettels: zettelMap, connections: connData }));
  console.log(`  Wrote ${outPath}`);
  if (autoOpen) {
    try { execSync(`open "${outPath}"`); } catch { /* ignore */ }
  }
} else if (obsidian) {
  mkdirSync(distDir, { recursive: true });
  const outPath = join(distDir, "threads.kanban.md");
  writeFileSync(outPath, renderObsidian(threadData));
  console.log(`  Wrote ${outPath}`);
} else if (markdown) {
  for (const t of threadData) {
    console.log(`## ${t.title} (${t.done}/${t.total} done)\n`);
    if (t.shared.length) {
      console.log(`Shared with: ${t.shared.map((s) => `[[${s.other}]]${s.note ? ` (${s.note})` : ""}`).join(", ")}\n`);
    }
    console.log("| Readiness | Status | Item |");
    console.log("|-----------|--------|------|");
    for (const m of t.members) {
      console.log(`| ${m.readiness || "—"} | ${m.symbol} ${m.maturity} | ${m.title} |`);
    }
    console.log();
  }
} else {
  for (const t of threadData) {
    console.log(`\n  ${t.title} (${t.done}/${t.total} done)`);
    if (t.shared.length) {
      console.log(`  Shared: ${t.shared.map((s) => s.other.replace(".thread", "")).join(", ")}`);
    }
    console.log();
    const maxTitle = Math.max(...t.members.map((m) => m.title.length), 4);
    for (const m of t.members) {
      const rdyStr = m.readiness ? ` [${m.readiness}]` : "";
      console.log(`    ${m.symbol} ${m.title.padEnd(maxTitle)}  ${m.maturity}${rdyStr}`);
    }
  }
  console.log();
}
