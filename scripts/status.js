#!/usr/bin/env node
/**
 * Quick overview of z-yap work state: thread summaries + queue counts.
 *
 * Usage:
 *   node scripts/status.mjs             # compact overview
 *   node scripts/status.mjs --markdown  # plain markdown
 */

import { loadAll, byTag, parseConnections, edgesFor, parseCheckboxes } from "./lib/parse.js";

const markdown = process.argv.includes("--markdown");

const zettels = loadAll();
const edges = parseConnections();
const threads = byTag(zettels, "thread");
const queues = byTag(zettels, "queue");

const MATURITY_TAGS = new Set(["implemented", "in-progress", "planned", "speculative", "deprecated", "rejected", "deferred", "incomplete"]);
const READINESS_TAGS = new Set(["ready", "blocked", "needs-design"]);

const maturityOf = (z) => z.tags.find((t) => MATURITY_TAGS.has(t)) ?? "open";
const readinessOf = (z) => z.tags.find((t) => READINESS_TAGS.has(t)) ?? "";

const slugIndex = Object.fromEntries(zettels.map((z) => [z.slug, z]));

const threadData = threads
  .map((t) => {
    const { outgoing } = edgesFor(t.slug, edges);
    const members = outgoing
      .filter((e) => e.label === "INCLUDES")
      .map((e) => slugIndex[e.target])
      .filter(Boolean);

    const counts = { done: 0, active: 0, pending: 0, total: members.length };
    for (const m of members) {
      const mat = maturityOf(m);
      if (mat === "implemented") counts.done++;
      else if (["in-progress", "incomplete"].includes(mat)) counts.active++;
      else counts.pending++;
    }

    const needsDesign = members.filter((m) => readinessOf(m) === "needs-design").length;
    const ready = members.filter((m) => readinessOf(m) === "ready").length;
    const blocked = members.filter((m) => readinessOf(m) === "blocked").length;

    return { thread: t, members, counts, needsDesign, ready, blocked };
  })
  .sort((a, b) => a.thread.title.localeCompare(b.thread.title));

const queueData = queues.map((q) => {
  const items = parseCheckboxes(q.body);
  const open = items.filter((i) => i.status === "open").length;
  const resolved = items.filter((i) => i.status === "resolved").length;
  return { queue: q, open, resolved, total: items.length };
});

// --- Output ---

const totalZettels = zettels.length;
const totalThreadItems = threadData.reduce((s, t) => s + t.counts.total, 0);

if (markdown) {
  console.log(`# z-yap Status (${totalZettels} zettels)\n`);
  console.log(`## Threads (${threads.length})\n`);
  console.log("| Thread | Done | Active | Pending | Ready | Needs Design |");
  console.log("|--------|------|--------|---------|-------|--------------|");
  for (const { thread, counts, ready, needsDesign } of threadData) {
    console.log(
      `| ${thread.title} | ${counts.done}/${counts.total} | ${counts.active} | ${counts.pending} | ${ready} | ${needsDesign} |`
    );
  }
  console.log();

  for (const { queue, open, resolved, total } of queueData) {
    console.log(`## Queue: ${queue.title} (${open} open, ${resolved} resolved)\n`);
  }
} else {
  console.log(`\n  z-yap Status — ${totalZettels} zettels, ${threads.length} threads, ${totalThreadItems} tracked items\n`);

  const pad = (s, n) => String(s).padStart(n);
  const rpad = (s, n) => String(s).padEnd(n);

  const maxTitle = Math.max(...threadData.map((t) => t.thread.title.length));

  console.log(
    `  ${rpad("Thread", maxTitle)}  Done  Active  Pending  Ready  Design  Blocked`
  );
  console.log(
    `  ${rpad("─".repeat(maxTitle), maxTitle)}  ────  ──────  ───────  ─────  ──────  ───────`
  );

  for (const { thread, counts, ready, needsDesign, blocked } of threadData) {
    const bar = "█".repeat(counts.done) + "░".repeat(counts.total - counts.done);
    console.log(
      `  ${rpad(thread.title, maxTitle)}  ${pad(counts.done + "/" + counts.total, 4)}  ${pad(counts.active, 6)}  ${pad(counts.pending, 7)}  ${pad(ready, 5)}  ${pad(needsDesign, 6)}  ${pad(blocked, 7)}`
    );
  }

  console.log();
  for (const { queue, open, resolved, total } of queueData) {
    console.log(`  Queue: ${queue.title} — ${open} open, ${resolved} resolved (${total} total)`);
  }
  console.log();
}
