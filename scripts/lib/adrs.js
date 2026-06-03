/**
 * Shared ADR data layer.
 *
 * An ADR is a zettel tagged `adr`. The `adr-id` frontmatter scalar carries the
 * stable identifier (D-NNN). Other zettels reference an ADR via `refs: [adr:D-NNN]`.
 *
 * The graph carries the semantics:
 *   - ADR → zettel via DOCUMENTS, MOTIVATES, REJECTS, RELIES_ON  (outbound)
 *   - ADR → ADR  via SUPERSEDES, AMENDS, REFRAMES, REVISES,
 *                    DEPRECATES                                  (outbound, lifecycle)
 *   - zettel → ADR via IMPLEMENTS, FOLLOWS                       (inbound)
 *   - ADR → ADR  inbound mirror of the lifecycle labels above
 *   - thread → ADR via INCLUDES                                  (membership)
 */

import { loadAll, parseConnections, edgesFor } from "./parse.js";

const LIFECYCLE_TAGS = ["proposed", "accepted", "superseded", "subsumed", "amended", "reframed"];
const EPISTEMIC_TAGS = ["implemented", "in-progress", "planned", "speculative", "deprecated", "rejected", "deferred", "incomplete"];
const LIFECYCLE_EDGE_LABELS = ["SUPERSEDES", "AMENDS", "REFRAMES", "REVISES", "DEPRECATES"];
const OUTBOUND_TRACKED_LABELS = new Set([
  "DOCUMENTS", "MOTIVATES", "REJECTS", "RELIES_ON", "PRODUCES", "PRESERVES", "GENERALIZES",
  ...LIFECYCLE_EDGE_LABELS,
]);
const INBOUND_TRACKED_LABELS = new Set([
  "IMPLEMENTS", "FOLLOWS",
  ...LIFECYCLE_EDGE_LABELS,
]);

const lifecycleOf = (z) => z.tags.find((t) => LIFECYCLE_TAGS.includes(t)) ?? null;
const epistemicOf = (z) => z.tags.find((t) => EPISTEMIC_TAGS.includes(t)) ?? null;

const adrIdRe = /^adr:(D-\d+)$/i;
const adrIdSortKey = (id) => {
  const m = id?.match(/D-(\d+)/i);
  return m ? parseInt(m[1], 10) : Infinity;
};

export const loadAdrs = (zettels = loadAll(), edges = parseConnections()) => {
  const adrZettels = zettels.filter((z) => z.tags.includes("adr"));
  const slugIndex = Object.fromEntries(zettels.map((z) => [z.slug, z]));

  const idIndex = {};
  for (const z of adrZettels) {
    const id = z.scalars["adr-id"];
    if (id) idIndex[id] = z;
  }

  const inboundRefIndex = {};
  for (const z of zettels) {
    for (const ref of z.refs) {
      const m = ref.match(adrIdRe);
      if (!m) continue;
      const id = m[1].toUpperCase();
      (inboundRefIndex[id] ??= []).push(z);
    }
  }

  const adrs = adrZettels.map((z) => {
    const id = z.scalars["adr-id"] ?? null;
    const { outgoing, incoming } = edgesFor(z.slug, edges);

    const trackedOut = outgoing
      .filter((e) => OUTBOUND_TRACKED_LABELS.has(e.label))
      .map((e) => ({ label: e.label, slug: e.target, zettel: slugIndex[e.target], note: e.note }));

    const trackedIn = incoming
      .filter((e) => INBOUND_TRACKED_LABELS.has(e.label))
      .map((e) => ({ label: e.label, slug: e.source, zettel: slugIndex[e.source], note: e.note }));

    const threads = incoming
      .filter((e) => e.label === "INCLUDES")
      .map((e) => slugIndex[e.source])
      .filter((s) => s && s.tags.includes("thread"));

    const inboundRefs = id ? (inboundRefIndex[id] ?? []) : [];

    return {
      id,
      slug: z.slug,
      title: z.title,
      lifecycle: lifecycleOf(z),
      epistemic: epistemicOf(z),
      body: z.body,
      tags: z.tags,
      refs: z.refs,
      threads,
      trackedOut,
      trackedIn,
      inboundRefs,
      zettel: z,
    };
  });

  adrs.sort((a, b) => adrIdSortKey(a.id) - adrIdSortKey(b.id));
  return adrs;
};

export const allInboundAdrRefs = (zettels = loadAll()) => {
  const refs = [];
  for (const z of zettels) {
    for (const ref of z.refs) {
      const m = ref.match(adrIdRe);
      if (m) refs.push({ zettel: z, id: m[1].toUpperCase() });
    }
  }
  return refs;
};

export const consistencyChecks = (adrs, zettels = loadAll()) => {
  const missingId = adrs.filter((a) => !a.id);
  const missingLifecycle = adrs.filter((a) => !a.lifecycle);

  const idCounts = {};
  for (const a of adrs) {
    if (a.id) idCounts[a.id] = (idCounts[a.id] ?? 0) + 1;
  }
  const duplicateIds = Object.entries(idCounts).filter(([, n]) => n > 1).map(([id]) => id);

  const noTracked = adrs.filter((a) => a.trackedOut.length === 0 && a.trackedIn.length === 0);

  const knownIds = new Set(adrs.map((a) => a.id).filter(Boolean));
  const orphanedRefs = [];
  const supersededRefs = [];
  const adrById = Object.fromEntries(adrs.map((a) => [a.id, a]));
  for (const z of zettels) {
    for (const ref of z.refs) {
      const m = ref.match(adrIdRe);
      if (!m) continue;
      const id = m[1].toUpperCase();
      if (!knownIds.has(id)) {
        orphanedRefs.push({ zettel: z, ref });
        continue;
      }
      const target = adrById[id];
      if (target && (target.lifecycle === "superseded" || target.lifecycle === "subsumed")) {
        supersededRefs.push({ zettel: z, id, lifecycle: target.lifecycle });
      }
    }
  }

  return { missingId, missingLifecycle, duplicateIds, noTracked, orphanedRefs, supersededRefs };
};

export const renderDecisionsMd = (adrs) => {
  const lines = [];
  lines.push("# Architectural Decisions");
  lines.push("");
  lines.push("> Generated from z-yap ADR zettels (`scripts/adrs.js --decisions-md`).");
  lines.push("> Source of truth is the graph; this file is a derived log view.");
  lines.push("");
  lines.push(`Total: ${adrs.length} ADRs.`);
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const a of adrs) {
    const id = a.id ?? "(unassigned)";
    lines.push(`## ${id}: ${a.title}`);
    lines.push("");

    const meta = [];
    if (a.lifecycle) meta.push(`**Status**: ${a.lifecycle}`);
    if (a.epistemic) meta.push(`**Impl**: ${a.epistemic}`);
    if (a.threads.length) {
      meta.push(`**Threads**: ${a.threads.map((t) => `[[${t.slug}]]`).join(", ")}`);
    }
    lines.push(meta.join(" | "));
    lines.push("");

    const bodyWithoutTitle = a.body.replace(/^#\s+.+\n+/, "");
    lines.push(bodyWithoutTitle.trim());
    lines.push("");

    if (a.trackedOut.length) {
      lines.push("**Outbound**:");
      for (const e of a.trackedOut) {
        const title = e.zettel ? e.zettel.title : e.slug;
        const note = e.note ? ` — ${e.note}` : "";
        lines.push(`- \`${e.label}\` → [[${e.slug}]] (${title})${note}`);
      }
      lines.push("");
    }

    if (a.trackedIn.length) {
      lines.push("**Inbound**:");
      for (const e of a.trackedIn) {
        const title = e.zettel ? e.zettel.title : e.slug;
        const note = e.note ? ` — ${e.note}` : "";
        lines.push(`- \`${e.label}\` ← [[${e.slug}]] (${title})${note}`);
      }
      lines.push("");
    }

    if (a.inboundRefs.length) {
      lines.push(`**Referenced by** (\`refs: [adr:${a.id}]\`):`);
      for (const z of a.inboundRefs) {
        lines.push(`- [[${z.slug}]] — ${z.title}`);
      }
      lines.push("");
    }

    lines.push("---");
    lines.push("");
  }

  return lines.join("\n");
};

export const LIFECYCLE_TAGS_LIST = LIFECYCLE_TAGS;
export const EPISTEMIC_TAGS_LIST = EPISTEMIC_TAGS;
