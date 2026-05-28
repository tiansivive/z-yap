#!/usr/bin/env node
/**
 * Bug worklist — tag-based catalog of `bug` zettels.
 *
 * Usage:
 *   node scripts/bugs.js             # ANSI table
 *   node scripts/bugs.js --markdown  # plain markdown
 */

import { loadAll, byTag, parseConnections, edgesFor } from "./lib/parse.js";
import { c } from "./lib/colors.js";

const args = process.argv.slice(2);
const markdown = args.includes("--markdown");

const zettels = byTag(loadAll(), "bug");
const edges = markdown ? [] : parseConnections();

if (markdown) {
  console.log(`# Known Bugs (${zettels.length} items)\n`);
  for (const z of zettels) {
    console.log(`- **${z.title}** \`${z.slug}\` [${z.tags.join(", ")}]`);
  }
} else {
  console.log(`\n${c.bold}KNOWN BUGS${c.reset} — ${zettels.length} items\n`);
  const pad = (s, w) => (s.length >= w ? s : s + " ".repeat(w - s.length));
  const slugW = Math.max(4, ...zettels.map((z) => z.slug.length));

  for (const z of zettels) {
    const { outgoing } = edgesFor(z.slug, edges);
    const threads = outgoing
      .filter((e) => e.label === "INCLUDED_IN" || e.label === "SHARED_WITH")
      .map((e) => e.target);
    const threadStr = threads.length ? ` ${c.dim}→ ${threads.join(", ")}${c.reset}` : "";
    console.log(`  ${c.cyan}${pad(z.slug, slugW)}${c.reset}  ${z.title}${threadStr}`);
  }
  console.log();
}
