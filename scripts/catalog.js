#!/usr/bin/env node
/**
 * Zettel inventory with optional filtering.
 *
 * Usage:
 *   node scripts/catalog.js                   # full catalog
 *   node scripts/catalog.js --tag solver      # filter by tag
 *   node scripts/catalog.js --status planned  # filter by epistemic status
 *   node scripts/catalog.js --search fuzzy    # text search on slug + title
 */

import { loadAll, parseConnections, edgesFor } from "./lib/parse.js";
import { c } from "./lib/colors.js";

const EPISTEMIC = new Set([
  "implemented", "in-progress", "planned", "speculative",
  "deprecated", "rejected", "deferred", "incomplete",
]);
const READINESS = new Set(["ready", "blocked", "needs-design"]);
const STRUCTURAL = new Set(["thread", "queue", "hub", "adr"]);

const args = process.argv.slice(2);
const filters = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--") && args[i + 1] && !args[i + 1].startsWith("--")) {
    filters[args[i].slice(2)] = args[++i];
  }
}

let zettels = loadAll();
if (filters.tag)    zettels = zettels.filter((z) => z.tags.includes(filters.tag));
if (filters.status) zettels = zettels.filter((z) => z.tags.includes(filters.status));
if (filters.search) {
  const q = filters.search.toLowerCase();
  zettels = zettels.filter((z) => z.slug.toLowerCase().includes(q) || z.title.toLowerCase().includes(q));
}

const slugW = Math.max(4, ...zettels.map((z) => z.slug.length));
const titleW = 40;
const pad = (s, w) => (s.length >= w ? s : s + " ".repeat(w - s.length));

function statusColor(s) {
  if (s === "implemented") return c.green;
  if (["deprecated", "rejected"].includes(s)) return c.red;
  if (["blocked", "needs-design"].includes(s)) return c.yellow;
  if (["in-progress", "incomplete"].includes(s)) return c.cyan;
  return c.reset;
}

console.log(`\n${c.bold}CATALOG${c.reset} — ${zettels.length} zettels`);
if (Object.keys(filters).length) {
  console.log(c.gray + Object.entries(filters).map(([k, v]) => `${k}=${v}`).join("  ") + c.reset);
}
console.log("─".repeat(slugW + titleW + 30));

for (const z of zettels) {
  const structural = z.tags.find((t) => STRUCTURAL.has(t)) || "";
  const epistemic = z.tags.find((t) => EPISTEMIC.has(t)) || "—";
  const readiness = z.tags.find((t) => READINESS.has(t));
  const stStr = readiness ? `${epistemic} [${readiness}]` : epistemic;

  console.log(
    `${c.cyan}${pad(z.slug, slugW)}${c.reset}  ` +
    `${pad(z.title.slice(0, titleW), titleW)}  ` +
    `${structural ? c.magenta + pad(structural, 8) + c.reset + "  " : "          "}` +
    `${statusColor(epistemic)}${stStr}${c.reset}`
  );
}

console.log("");
