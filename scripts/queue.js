#!/usr/bin/env node
/**
 * Pending queue items — open work not yet assigned to a thread.
 *
 * Usage:
 *   node scripts/queue.mjs             # open items
 *   node scripts/queue.mjs --all       # include resolved/dropped
 *   node scripts/queue.mjs --markdown  # plain markdown output
 */

import { loadAll, byTag, parseCheckboxes } from "./lib/parse.js";

const args = process.argv.slice(2);
const markdown = args.includes("--markdown");
const showAll = args.includes("--all");

const zettels = loadAll();
const queues = byTag(zettels, "queue");

for (const queue of queues) {
  let items = parseCheckboxes(queue.body);
  if (!showAll) items = items.filter((i) => i.status === "open");

  const open = items.filter((i) => i.status === "open").length;

  if (markdown) {
    console.log(`## ${queue.title} (${open} open)\n`);
    for (const item of items) {
      const check = { open: "[ ]", resolved: "[x]", dropped: "[~]" }[item.status];
      console.log(`- ${check} ${item.text}`);
    }
    console.log();
  } else {
    console.log(`\n  ${queue.title} (${open} open)\n`);
    for (const item of items) {
      const sym = { open: "○", resolved: "✓", dropped: "~" }[item.status];
      const dim = item.status !== "open" ? " (done)" : "";
      console.log(`    ${sym} ${item.text}${dim}`);
    }
    console.log();
  }
}
