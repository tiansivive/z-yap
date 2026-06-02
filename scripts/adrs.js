#!/usr/bin/env node
/**
 * ADR index + consistency report.
 *
 * Usage:
 *   node scripts/adrs.js                       # ANSI: index + consistency
 *   node scripts/adrs.js --markdown            # plain markdown
 *   node scripts/adrs.js --consistency-only    # just the report
 *   node scripts/adrs.js --status accepted     # filter by lifecycle status
 *   node scripts/adrs.js --decisions-md        # write dist/decisions.md
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { loadAdrs, consistencyChecks, renderDecisionsMd } from "./lib/adrs.js";
import { c } from "./lib/colors.js";

const args = process.argv.slice(2);
const markdown = args.includes("--markdown");
const consistencyOnly = args.includes("--consistency-only");
const decisionsMd = args.includes("--decisions-md");
const statusIdx = args.indexOf("--status");
const statusFilter = statusIdx >= 0 ? args[statusIdx + 1] : null;

const allAdrs = loadAdrs();
const filtered = statusFilter ? allAdrs.filter((a) => a.lifecycle === statusFilter) : allAdrs;
const issues = consistencyChecks(allAdrs);

if (decisionsMd) {
  const ROOT = join(import.meta.dirname, "..");
  const distDir = join(ROOT, "dist");
  mkdirSync(distDir, { recursive: true });
  const outPath = join(distDir, "decisions.md");
  writeFileSync(outPath, renderDecisionsMd(allAdrs));
  console.log(`  Wrote ${outPath}`);
} else if (markdown) {
  printMarkdown(filtered, issues);
} else {
  printAnsi(filtered, issues);
}

function statusCounts(adrs) {
  const counts = {};
  for (const a of adrs) {
    const k = a.lifecycle ?? "(none)";
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return counts;
}

function printMarkdown(adrs, issues) {
  const all = loadAdrs();
  console.log(`# ADR Index (${all.length} decisions)\n`);

  if (!consistencyOnly) {
    console.log("## Status summary\n");
    console.log("| Lifecycle | Count |");
    console.log("|-----------|-------|");
    for (const [k, n] of Object.entries(statusCounts(all))) {
      console.log(`| ${k} | ${n} |`);
    }
    console.log();

    console.log("## Full index\n");
    console.log("| ID | Title | Lifecycle | Impl | Threads | Tracked | Inbound refs |");
    console.log("|----|-------|-----------|------|---------|---------|--------------|");
    for (const a of adrs) {
      const threads = a.threads.map((t) => `\`${t.slug}\``).join(", ") || "—";
      const tracked = a.trackedOut.length + a.trackedIn.length;
      console.log(`| ${a.id ?? "?"} | ${a.title} | ${a.lifecycle ?? "—"} | ${a.epistemic ?? "—"} | ${threads} | ${tracked} | ${a.inboundRefs.length} |`);
    }
    console.log();
  }

  console.log("## Consistency\n");
  printIssuesMarkdown(issues);
}

function printIssuesMarkdown({ missingId, missingLifecycle, duplicateIds, noTracked, orphanedRefs, supersededRefs }) {
  const line = (label, items, fmt) =>
    items.length
      ? console.log(`- **${label}** (${items.length}):\n${items.map(fmt).join("\n")}`)
      : console.log(`- ${label}: (none)`);

  line("ADRs missing `adr-id`", missingId, (a) => `  - \`${a.slug}\``);
  line("ADRs missing lifecycle tag", missingLifecycle, (a) => `  - ${a.id ?? a.slug}`);
  line("Duplicate `adr-id` values", duplicateIds, (id) => `  - ${id}`);
  line("ADRs with no tracked edges", noTracked, (a) => `  - ${a.id ?? a.slug}`);
  line("Orphaned `adr:` refs", orphanedRefs, ({ zettel, ref }) => `  - \`${zettel.slug}\` references \`${ref}\` (no such ADR)`);
  line("Refs pointing to superseded/subsumed ADRs", supersededRefs, ({ zettel, id, lifecycle }) => `  - \`${zettel.slug}\` references ${id} (${lifecycle})`);
}

function printAnsi(adrs, issues) {
  const all = loadAdrs();

  if (!consistencyOnly) {
    console.log(`\n${c.bold}ADR Index${c.reset} — ${all.length} decisions${statusFilter ? `  ${c.gray}[lifecycle=${statusFilter}]${c.reset}` : ""}\n`);

    const counts = statusCounts(all);
    const summary = Object.entries(counts).map(([k, n]) => `${lifecycleColor(k)}${k}${c.reset} ${c.gray}${n}${c.reset}`).join("   ");
    console.log(`  ${summary}\n`);

    const idW = 6;
    const titleW = Math.max(5, ...adrs.map((a) => a.title.length));
    const lifeW = 11;
    const implW = 12;

    console.log(`  ${pad("ID", idW)}  ${pad("Title", titleW)}  ${pad("Lifecycle", lifeW)}  ${pad("Impl", implW)}  Threads  Tracked  Refs`);
    console.log(`  ${"─".repeat(idW)}  ${"─".repeat(titleW)}  ${"─".repeat(lifeW)}  ${"─".repeat(implW)}  ───────  ───────  ────`);

    for (const a of adrs) {
      const threads = a.threads.length;
      const tracked = a.trackedOut.length + a.trackedIn.length;
      const refs = a.inboundRefs.length;
      const life = a.lifecycle ?? "—";
      const impl = a.epistemic ?? "—";
      console.log(
        `  ${c.cyan}${pad(a.id ?? "—", idW)}${c.reset}  ` +
        `${pad(a.title, titleW)}  ` +
        `${lifecycleColor(life)}${pad(life, lifeW)}${c.reset}  ` +
        `${implColor(impl)}${pad(impl, implW)}${c.reset}  ` +
        `${rpad(threads, 7)}  ` +
        `${rpad(tracked, 7)}  ` +
        `${rpad(refs, 4)}`
      );
    }
    console.log();
  }

  console.log(`${c.bold}Consistency${c.reset}\n`);
  printIssuesAnsi(issues);
  console.log();
}

function printIssuesAnsi({ missingId, missingLifecycle, duplicateIds, noTracked, orphanedRefs, supersededRefs }) {
  const block = (label, items, fmt) => {
    if (items.length === 0) {
      console.log(`  ${c.green}✓${c.reset} ${label}: ${c.gray}(none)${c.reset}`);
      return;
    }
    console.log(`  ${c.red}✗${c.reset} ${label} (${items.length}):`);
    for (const it of items) console.log(`      ${c.gray}${fmt(it)}${c.reset}`);
  };

  block("ADRs missing adr-id", missingId, (a) => a.slug);
  block("ADRs missing lifecycle tag", missingLifecycle, (a) => a.id ?? a.slug);
  block("Duplicate adr-id values", duplicateIds, (id) => id);
  block("ADRs with no tracked edges", noTracked, (a) => a.id ?? a.slug);
  block("Orphaned adr: refs", orphanedRefs, ({ zettel, ref }) => `${zettel.slug} → ${ref} (missing)`);
  block("Refs to superseded/subsumed ADRs", supersededRefs, ({ zettel, id, lifecycle }) => `${zettel.slug} → ${id} (${lifecycle})`);
}

function pad(s, n) { return String(s).padEnd(n); }
function rpad(s, n) { return String(s).padStart(n); }

function lifecycleColor(life) {
  if (life === "accepted") return c.green;
  if (life === "proposed") return c.yellow;
  if (life === "superseded" || life === "subsumed") return c.gray;
  return c.reset;
}

function implColor(impl) {
  if (impl === "implemented") return c.green;
  if (impl === "deprecated" || impl === "rejected") return c.red;
  if (impl === "in-progress" || impl === "incomplete") return c.cyan;
  if (impl === "speculative") return c.yellow;
  return c.reset;
}
