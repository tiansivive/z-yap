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

Qualitative improvement of z-yap zettels — extracting design rationale from implementation maps, creating atomic knowledge zettels, and updating the graph structure.

## ZK philosophy

The ZK encodes knowledge ABOUT the project — design rationale, tradeoffs, tensions, decisions, concept models, reference material, process workflows, current state, roadmap, ADRs. It is NOT implementation documentation. The code is the ultimate source of truth; the ZK is supporting knowledge.

**The quality test:** Does each zettel successfully teach its one idea to a reader who has access to the code but doesn't know the design context?

**Facts are independent of implementation.** "Yap needs row theory for verification" is true whether Z3 or IVL implements it. Knowledge survives migrations; status is ephemeral. Decouple knowledge from implementation state — a concept or decision should read the same regardless of whether the feature is shipped, half-built, or deferred.

**Status belongs in tags, not prose.** Use `deprecated`, `deferred`, `incomplete`, `planned` as tags. Never write "this doesn't exist yet" or "these are commented out" into the body. Comments on current code state are a no-no — simply stating and describing what something is and what it's for is fine.

**Implementation details serve understanding, not documentation.** "We chose X because Y, and it lives here" is knowledge. "File X has method F and H which use Types T and U" is not. The former teaches design context; the latter mirrors the codebase, which is already the source of truth.

**Don't over-commit on open design.** If the principle is settled but the specifics are open (e.g. "row reasoning must be structural" but the solver plugin shape is TBD), say exactly that. Don't invent details or commit to an approach that hasn't been decided.

## Backlog

The current backlog is at `tmp/zettel-quality-backlog.md` (relative to z-yap root). Read it to see completed clusters and remaining work grouped by domain.

## Process

The rework follows a strict 4-phase process. Do NOT skip phases or combine them.

### Phase 1: Read and assess

1. Read ALL zettels in the cluster
2. Read their connections in `z-yap/connections.md`
3. Read adjacent/related zettels referenced in those connections
4. Check `z-yap/REGISTRY.md` for relevant tags and labels

For each zettel, identify:
- **Current state** — what it says now, what's stale, what's accurate
- **Buried design content** — rationale, decisions, principles, tradeoffs hidden in code walkthrough
- **Overlap** — which zettels say the same thing from different angles

### Phase 2: Propose actions

Present each zettel to the user with:
- **Current state** — 2-3 sentence summary
- **Buried design content** — what's worth extracting
- **Proposal** — one of: rewrite, remove, fold, split, keep, light rewrite

Also propose:
- **New zettels** — atomic ideas that don't have a home yet (concepts, decisions, ADRs)
- **Removals** — pure status reports or near-duplicates
- **Renames** — when a zettel's name no longer matches its content

End with a summary table: `| Zettel | Action | Atom |`

### Phase 3: User feedback

Wait for per-zettel feedback. The user may:
- Accept as proposed
- Redirect (different framing, different split, different scope)
- Expand scope (pull in adjacent zettels, add more new zettels)
- Correct factual claims (verify externally if uncertain)

Iterate until the user says to execute.

### Phase 4: Execute

1. Write/rewrite zettel files
2. Delete removed zettels
3. Update `z-yap/connections.md`:
   - Remove edges referencing deleted zettels
   - Redirect edges to replacement zettels where semantics are preserved
   - Add edges for new zettels
   - Deduplicate any resulting duplicate edges
   - Add new zettels to relevant thread INCLUDES
4. Register new tags/labels in `z-yap/REGISTRY.md` if needed
5. Check for dangling references: grep deleted zettel names across `z-yap/zettels/` and fix any found
6. Update `z-yap/tmp/zettel-quality-backlog.md` — move the cluster to "Completed"

## Zettel quality principles

These govern what "good" looks like. Apply them during assessment (Phase 1-2).

### What a zettel IS

- **One atomic idea** — concept, decision, principle, mechanism, or reference
- **Self-contained** — meaningful without knowing why it was created or what else connects to it
- **Context-free prose** — no "the code currently..." or "as of this writing..."
- **Durable** — true regardless of implementation status; survives refactors
- **Split generously** — if two ideas are in one zettel, split them. Each must be atomic and self-contained, not a skeleton.

### What a zettel is NOT

- A code walkthrough with src/ paths and function signatures
- A status report ("this is not implemented yet", "these are commented out")
- A dispatch table of modules and their locations
- A plan with completion checkboxes

### Prose economy and negative framing

Zettels are written for future agents and people with no context about why the zettel was created. Every sentence must carry design knowledge. Apply these per-sentence:

**Trim redundant clauses.** If removing a clause loses no information, cut it. "Container types encode as App+Row, no dedicated constructors" — the second clause is redundant; the first already states the design. The test: does the sentence lose knowledge without the clause?

**Negative framing is context-dependent.** Some negations are the point; others are noise. Classify before acting:

| Kind | Example | Action |
|------|---------|--------|
| **Legitimate contrast** | "Annotations erase before EB.Term", "not a proof assistant", "exist only in EB.Term" | **Keep** — the negation IS the design knowledge |
| **Status report** | "not yet implemented", "currently throws", "TODO", "FIXME", "future work" | **Remove** — ephemeral; use tags (`incomplete`, `planned`) |
| **Redundant negation** | "not inherited from JavaScript" after stating the positive mechanism | **Remove** — positive statement already covers it |
| **Confusing "what this isn't"** | "There is no WHNF mode flag" | **Rewrite** — lead with positive design; future reader would ask "why tell me about something that doesn't exist?" |

**The future-reader test.** Before keeping any sentence, ask: would someone reading this zettel with no knowledge of the conversation, backlog, or current implementation state find this sentence informative? If they'd find it confusing, redundant, or ephemeral — fix it.

### Structural patterns

**Milestones stay as milestone records** — paper trail of what was built. Design knowledge gets extracted into separate linked zettels. The milestone records what happened; the design zettels capture why.

**Hubs are graph infrastructure, not concept notes.** They're supposed to be thin — a framing sentence plus structured links to children. Don't penalize hubs for being thin.

**ADR-style for decisions.** "Decision: Y." Context: what problem. Rationale: why this choice. What would break otherwise. Provenance: prior art. One zettel per decision.

**Contrast zettels are valuable.** When a design choice has a clear alternative (eager vs deferred, structural vs nominal, closure conversion vs defunctionalization), create a zettel for the alternative and link via `CONTRASTS_WITH`. This makes the design space navigable.

**Reference zettels bridge external theory.** Papers, prior art, influences. Strip any impl-map content, keep the citation and the "relationship to Yap" section. Verify DOIs/URLs externally — training data recall is not verification.

### Classification guide

| Category | Description | Action |
|----------|-------------|--------|
| **DESIGN** | Has a "why" claim, tradeoff, decision, principle | Keep or light rewrite |
| **IMPL-MAP** | Primarily src/ paths, dispatch traces, module inventories | Rewrite, fold, or remove |
| **REFERENCE** | External theory/paper bridge | Keep; strip impl-map if present |
| **HUB** | Structural work-layer node | Keep; verify links are current |
| **EXPLORATION** | Speculative/open design sketch | Keep; strip impl-map if present |
| **MIXED** | Some rationale buried in implementation surface | Highest-value rewrite targets |

### Rewrite patterns

**Concept zettel**: What X is, why it exists, how it fits. No code paths. Connect to mechanisms and decisions.

**Decision zettel (ADR-style)**: "Decision: Y." Context: what problem. Rationale: why this choice. What would break otherwise. Provenance: prior art or influence.

**Hub zettel**: Domain entry point. Short prose framing, then a structured list of child zettels by role (concepts, decisions, mechanisms, extensions, references).

**Light rewrite**: Strip `Code:` lines, src/ paths, function signatures, "not implemented yet" language. Promote the design rationale that's already there.

### Connection principles

- Every new zettel needs connections. An isolated zettel is invisible to traversal.
- Connections explain how knowledge is applied across Yap. Every meaningful relationship not recorded is a traversal path agents can't take.
- When redirecting edges from deleted zettels, preserve the *semantic relationship*, not just the syntactic edge.
- Check thread INCLUDES — new zettels in a domain should be added to the relevant thread.
- Verify external references (paper DOIs, URLs) when adding or modifying them — training data recall is not verification.

### Tag and label hygiene

- Check `REGISTRY.md` before coining new tags/labels — not to constrain, but to avoid synonyms.
- New tags and labels need registration in `REGISTRY.md`.
- Tags are atomic facets: `:Project:Software`, not `:SoftwareProject`.
- `deprecated`, `deferred`, `incomplete`, `planned` handle status — don't write status into prose.

## Process lessons

Patterns learned from prior cluster rework sessions. Apply these during all phases.

- **Adjacent zettels are often in the same state.** When assessing a cluster, read the neighborhood. Zettels referenced in connections may be equally stale. Pulling them into scope during a cluster rework produces better results than treating the cluster in isolation.

- **User corrections reveal deeper principles.** When the user redirects a proposal, listen for the principle behind the correction, not just the surface fix. e.g. "that's an independent fact, not a Z3-era artifact" reveals the decouple-from-implementation principle.

- **Verify factual claims externally.** If a zettel asserts something about PL theory (e.g. "eager solving breaks let-polymorphism"), verify it via web search before writing it into the ZK. The ZK must be accurate, not just well-structured.

- **The user decides framing, not the agent.** Propose actions, but the user chooses the decomposition. The user may see splits, merges, or reframings that the agent's assessment missed. Iterate until the user says to execute.

- **Audit rewrites for prose quality after execution.** Bulk rewrites can introduce systematic prose issues (over-aggressive tag removal, blanket negative-framing cleanup, redundant clauses). After executing a cluster, re-read each file through the "future reader" lens and fix issues before moving on. Catching patterns early prevents compounding across clusters.

- **Negative framing requires judgment, not rules.** A blanket "remove all negative language" overcorrects — design contrasts, erasure facts, and domain boundaries are legitimate negations. A blanket "keep all negatives" under-corrects — status reports and redundant clauses survive. Classify each instance individually (see "Prose economy and negative framing" above).

- **Overconnecting beats sparsity.** A missed connection is a failed search query. When adding zettels or rewriting, connect to every relevant zettel in the neighborhood — not just the obvious parent/child links. Cross-domain connections are especially valuable.
