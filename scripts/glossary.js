#!/usr/bin/env node
/**
 * Generate combined glossary from all glossary zettels.
 *
 * Usage:
 *   node scripts/glossary.js             # terminal output
 *   node scripts/glossary.js --markdown  # plain markdown (for dist/)
 */

import { loadAll } from "./lib/parse.js";

const markdown = process.argv.includes("--markdown");

const zettels = loadAll();
const glossaries = zettels
  .filter((z) => z.slug.includes("glossary"))
  .sort((a, b) => {
    if (a.slug === "glossary") return -1;
    if (b.slug === "glossary") return 1;
    return a.title.localeCompare(b.title);
  });

if (markdown) {
  console.log(`# z-yap Glossary (${glossaries.length} sources)\n`);
  console.log(`Generated from glossary zettels. See \`zettels/glossary.md\` for the global glossary.\n`);
  for (const g of glossaries) {
    const bodyWithoutTitle = g.body.replace(/^#\s+.+\n*/, "").trim();
    console.log(`---\n`);
    console.log(`## ${g.title}\n`);
    console.log(`*Source: \`zettels/${g.slug}.md\`*\n`);
    console.log(bodyWithoutTitle);
    console.log();
  }
} else {
  console.log(`\n  z-yap Glossary — ${glossaries.length} sources\n`);
  for (const g of glossaries) {
    console.log(`  ${g.title} (${g.slug}.md)`);
  }
  console.log(`\n  Run with --markdown for full output.\n`);
}
