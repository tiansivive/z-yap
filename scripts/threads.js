#!/usr/bin/env node
/**
 * Detailed thread status — per-thread member listing with maturity and readiness.
 *
 * Usage:
 *   node scripts/threads.mjs                    # all threads
 *   node scripts/threads.mjs --thread row       # filter by thread name substring
 *   node scripts/threads.mjs --markdown         # plain markdown output
 *   node scripts/threads.mjs --pending          # only show non-implemented items
 */

import { loadAll, byTag, parseConnections, edgesFor } from "./lib/parse.js";

const args = process.argv.slice(2);
const markdown = args.includes("--markdown");
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
  open: "○",
};

const maturityOf = (z) => z.tags.find((t) => MATURITY_TAGS.has(t)) ?? "open";
const readinessOf = (z) => z.tags.find((t) => READINESS_TAGS.has(t)) ?? "";

let threads = byTag(zettels, "thread");
if (threadFilter) {
  threads = threads.filter((t) => t.slug.includes(threadFilter) || t.title.toLowerCase().includes(threadFilter.toLowerCase()));
}
threads.sort((a, b) => a.title.localeCompare(b.title));

const sharedEdges = edges.filter((e) => e.label === "SHARED_WITH");

for (const thread of threads) {
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

  if (markdown) {
    const done = members.filter((m) => maturityOf(m) === "implemented").length;
    console.log(`## ${thread.title} (${done}/${members.length} done)\n`);

    if (shared.length) {
      console.log(`Shared with: ${shared.map((s) => `[[${s.other}]]${s.note ? ` (${s.note})` : ""}`).join(", ")}\n`);
    }

    console.log("| Readiness | Status | Item |");
    console.log("|-----------|--------|------|");
    for (const m of members) {
      const mat = maturityOf(m);
      const sym = MATURITY_SYMBOLS[mat];
      const rdy = readinessOf(m);
      console.log(`| ${rdy || "—"} | ${sym} ${mat} | ${m.title} |`);
    }
    console.log();
  } else {
    const done = members.filter((m) => maturityOf(m) === "implemented").length;
    console.log(`\n  ${thread.title} (${done}/${members.length} done)`);

    if (shared.length) {
      console.log(`  Shared: ${shared.map((s) => s.other.replace(".thread", "")).join(", ")}`);
    }

    console.log();
    const maxTitle = Math.max(...members.map((m) => m.title.length), 4);

    for (const m of members) {
      const mat = maturityOf(m);
      const sym = MATURITY_SYMBOLS[mat];
      const rdy = readinessOf(m);
      const rdyStr = rdy ? ` [${rdy}]` : "";
      console.log(`    ${sym} ${m.title.padEnd(maxTitle)}  ${mat}${rdyStr}`);
    }
  }
}

if (!markdown) console.log();
