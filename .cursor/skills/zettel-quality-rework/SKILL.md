---
name: zettel-quality-rework
description: >-
  Qualitative rework of z-yap zettels classified as IMPL-MAP or MIXED.
  Reads zettels, assesses design content, proposes per-zettel actions,
  gets user feedback, then executes rewrites, removals, and new zettels.
  Use when the user asks to improve zettel quality, rework a cluster,
  or tackle items from the zettel quality backlog.
disable-model-invocation: true
---

# Zettel Quality Rework

A phased campaign for turning implementation-map and mixed-quality zettels into durable design knowledge — extracting rationale, creating atomic concept/decision zettels, and updating the graph.

**Quality theory is canonical in the `zettelkasten` skill** (`z-yap/.cursor/skills/zettelkasten/SKILL.md` § *Quality theory*): the future-reader test, what a zettel is / is not, prose economy and the negative-framing table, structural patterns, connection principles, and tag hygiene. Read that section before assessing — this skill does not restate it. What follows is the rework *process* plus the assessment-specific classification guide and lessons learned.

## Backlog

The current backlog is at `z-yap/tmp/zettel-quality-backlog.md`. Read it to see completed clusters and remaining work grouped by domain.

## Process

A strict 4-phase process. Do NOT skip phases or combine them.

### Phase 1: Read and assess

1. Read ALL zettels in the cluster.
2. Read their connections in `z-yap/connections.md`.
3. Read adjacent/related zettels referenced in those connections — adjacent zettels are often in the same state.
4. Check `z-yap/REGISTRY.md` for relevant tags and labels.

For each zettel, identify:
- **Current state** — what it says now, what's stale, what's accurate.
- **Buried design content** — rationale, decisions, principles, tradeoffs hidden in a code walkthrough.
- **Overlap** — which zettels say the same thing from different angles.

Classify each zettel to decide its action:

| Category | Description | Action |
|----------|-------------|--------|
| **DESIGN** | Has a "why" claim, tradeoff, decision, principle | Keep or light rewrite |
| **IMPL-MAP** | Primarily src/ paths, dispatch traces, module inventories | Rewrite, fold, or remove |
| **REFERENCE** | External theory/paper bridge | Keep; strip impl-map if present |
| **HUB** | Structural work-layer node | Keep; verify links are current |
| **EXPLORATION** | Speculative/open design sketch | Keep; strip impl-map if present |
| **MIXED** | Some rationale buried in implementation surface | Highest-value rewrite targets |

### Phase 2: Propose actions

Present each zettel to the user with:
- **Current state** — 2-3 sentence summary.
- **Buried design content** — what's worth extracting.
- **Proposal** — one of: rewrite, remove, fold, split, keep, light rewrite.

Also propose:
- **New zettels** — atomic ideas without a home yet (concepts, decisions, ADRs).
- **Removals** — pure status reports or near-duplicates.
- **Renames** — when a zettel's name no longer matches its content.

End with a summary table: `| Zettel | Action | Atom |`.

### Phase 3: User feedback

Wait for per-zettel feedback. The user may accept, redirect (different framing/split/scope), expand scope (pull in adjacent zettels), or correct factual claims (verify externally if uncertain). Iterate until the user says to execute.

### Phase 4: Execute

1. Write/rewrite zettel files (apply the `zettelkasten` skill's creation and rewrite procedure).
2. Delete removed zettels.
3. Update `z-yap/connections.md`: remove edges referencing deleted zettels; redirect edges to replacements where semantics are preserved; add edges for new zettels; deduplicate; add new zettels to relevant thread `INCLUDES`.
4. Register new tags/labels in `z-yap/REGISTRY.md` if needed.
5. Check for dangling references: grep deleted zettel names across `z-yap/zettels/` and fix any found.
6. Update `z-yap/tmp/zettel-quality-backlog.md` — move the cluster to "Completed".

## Process lessons

Patterns learned from prior cluster rework sessions. Apply across all phases.

- **Adjacent zettels are often in the same state.** Pulling them into scope during a cluster rework produces better results than treating the cluster in isolation.
- **User corrections reveal deeper principles.** When the user redirects a proposal, listen for the principle behind the correction, not just the surface fix. "That's an independent fact, not a Z3-era artifact" reveals the decouple-from-implementation principle.
- **Verify factual claims externally.** If a zettel asserts something about PL theory ("eager solving breaks let-polymorphism"), verify via web search before writing it. The ZK must be accurate, not just well-structured.
- **The user decides framing, not the agent.** Propose actions, but the user chooses the decomposition — splits, merges, reframings the assessment missed. Iterate until told to execute.
- **Audit rewrites for prose quality after execution.** Bulk rewrites introduce systematic issues (over-aggressive tag removal, blanket negative-framing cleanup, redundant clauses). Re-read each file through the future-reader lens and fix before moving on — catching patterns early prevents compounding across clusters.
- **Negative framing requires judgment, not rules.** Blanket removal overcorrects (contrasts, erasure facts, domain boundaries are legitimate); blanket keeping under-corrects (status reports survive). Classify each instance individually (see the zettelkasten skill's negative-framing table).
- **Overconnecting beats sparsity.** A missed connection is a failed search query. Connect to every relevant zettel in the neighborhood, cross-domain especially.
