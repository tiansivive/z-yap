#!/usr/bin/env node
/**
 * Show all connections to/from a zettel.
 *
 * Usage:
 *   node scripts/neighborhood.js <slug-or-partial>
 *   node scripts/neighborhood.js nbe
 *   node scripts/neighborhood.js cdcl-t
 */

import { loadAll, bySlug as buildSlugMap, parseConnections, edgesFor } from "./lib/parse.js";
import { c } from "./lib/colors.js";

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node scripts/neighborhood.js <slug-or-partial>");
  process.exit(1);
}

const zettels = loadAll();
const slugMap = buildSlugMap(zettels);

const match = slugMap[arg] || zettels.find((z) => z.slug.includes(arg));
if (!match) {
  console.error(`No zettel matching "${arg}"\n\nAll slugs:\n` + Object.keys(slugMap).map((s) => `  ${s}`).join("\n"));
  process.exit(1);
}

const edges = parseConnections();
const { outgoing, incoming } = edgesFor(match.slug, edges);

console.log(`\n${c.bold}${match.title}${c.reset}`);
console.log(`${c.gray}${match.slug}${c.reset}`);
console.log("─".repeat(54));

function printEdge(edge, dir) {
  const otherSlug = dir === "out" ? edge.target : edge.source;
  const other = slugMap[otherSlug];
  const titleHint = other ? `  ${c.dim}${other.title.slice(0, 44)}${c.reset}` : "";
  const arrow = dir === "out"
    ? `${c.gray}──[:${edge.label}]──▶${c.reset}`
    : `${c.gray}◀──[:${edge.label}]──${c.reset}`;
  console.log(`  ${arrow} ${c.cyan}${otherSlug}${c.reset}${titleHint}`);
  if (edge.note) console.log(`       ${c.gray}↳ ${edge.note}${c.reset}`);
}

if (outgoing.length) {
  console.log(`\n${c.bold}OUTGOING${c.reset} (${outgoing.length})`);
  for (const e of outgoing) printEdge(e, "out");
}

if (incoming.length) {
  console.log(`\n${c.bold}INCOMING${c.reset} (${incoming.length})`);
  for (const e of incoming) printEdge(e, "in");
}

if (!outgoing.length && !incoming.length) {
  console.log(`\n${c.gray}No connections recorded for this zettel.${c.reset}`);
}

const STRUCTURAL = new Set([
  "thread", "queue", "hub", "adr",
  "implemented", "in-progress", "planned", "speculative",
  "deprecated", "rejected", "deferred", "incomplete",
  "ready", "blocked", "needs-design",
  "active", "dormant", "on-hold", "spike", "archived",
  "proposed", "accepted", "superseded", "subsumed", "amended", "reframed",
  "frozen",
]);
const domain = match.tags.filter((t) => !STRUCTURAL.has(t));
if (domain.length) {
  console.log(`\n${c.bold}TAGS${c.reset}: ${c.gray}${domain.join(" · ")}${c.reset}`);
}

console.log("");
