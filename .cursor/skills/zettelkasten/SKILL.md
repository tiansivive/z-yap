---
name: zettelkasten
description: >-
  Canonical procedure for all z-yap knowledge-base writes — creating, updating, and
  connecting zettels; hubs and threads; ADRs; the paper trail (thread.md); the queue; the
  session/interaction workflow; and the quality theory that governs zettel content. Use when
  creating or editing any zettel, recording work in thread.md, managing queue items, writing an
  ADR, or closing out a session. This skill is the single source of truth for the procedure and
  for quality theory; reference vocabulary lives in REGISTRY.md and README.md.
---

# z-yap zettelkasten (knowledge-base writes)

Single source of truth for the procedure and the quality theory. Reference material is not duplicated here:

- `z-yap/README.md` — federation model, zettel format, connection format, federation URIs
- `z-yap/REGISTRY.md` — tag and edge-label registry (descriptive vocabulary)
- `z-yap/manifest.yaml` — federation metadata, entry points, script index
- `z-yap/connections.md` — **source of truth for all edges**

z-yap is a nested git repository (z-loom federation). Its commits are separate from the yap implementation repo.

## Principles

- **Free-form, liberal use.** Zettels, tags, axes, and edges are tools for noting down, not structures for constraining. Add tags as they apply; coin new edge labels when no existing label fits, then register them in `REGISTRY.md`.
- **Semantic connections.** Discover edges by meaning, not by grepping for `[[backlinks]]`. When you touch a zettel, consider what else it genuinely relates to.
- **Don't re-litigate.** Check `deprecated`/`rejected` tags and `SUPERSEDES`/`REJECTS` edges before proposing; don't revive a dropped idea without acknowledging why it was dropped.
- **Hubs outlive plans.** A hub captures the full design landscape; a plan scopes one phase.
- **Scripts over file browsing.** Navigate with `catalog.js`, `neighborhood.js`, `threads.js` — not by reading the `zettels/` directory.

## Creating a zettel

1. **Check for an existing zettel first**: `node z-yap/scripts/catalog.js --search <keyword>`. Update the existing one rather than creating a near-duplicate.
2. **Name the file** `<concept>.md`, or `<concept>.<qualifier>.md` where the qualifier is a visual grouping hint only (`.thread`, `.adr`, `.session`). Tags classify; qualifiers don't.
3. **Write frontmatter** — `tags` (required) and `refs` (optional, prefixed: `adr:`, `session:`, `code:`, `thread:`, etc.):
   - **Minimum 8 tags.** Tags are atomic facets, not categories — more is better.
   - Include one **epistemic status** tag (`implemented`, `in-progress`, `planned`, `speculative`, `deprecated`, `rejected`, `deferred`, `incomplete`). These are orthogonal to readiness tags (`ready`, `blocked`, `needs-design`).
   - If you draft a tag not in `REGISTRY.md`, coin it and add it — don't swap for a "close enough" existing tag; that's a nuance loss.
4. **Write the body** — title, one atomic idea, self-contained prose. Apply the **Quality theory** below.
5. **Add edges to `connections.md`** (not the zettel body — embedded `## Connections` sections are derived and regenerate on commit). Format: `[[source]] --[:LABEL]--> [[target]]  -- optional note  @date`.
6. **Connect both ways where it matters** — adjust edges on related zettels, add to the relevant hub (`INCLUDES`) and thread (`INCLUDES`). An isolated zettel is invisible to traversal.
7. **In plan/session close-outs**: propose new zettels and **confirm with the user** before creating them — no bulk creation without agreement. Mid-discussion, creating a zettel for a newly surfaced concept is fine — tell the user what you created.

## Updating a zettel

- **Status changes** — update the epistemic status tag. When superseding, follow **Deprecation** below.
- **Session trace** — add `session:<id>` to `refs` when a session substantially discusses the zettel.
- **ADR refs** — when a decision lands, add `adr:D-NNN` to related zettels (surfaced by `scripts/adrs.js`).
- **Readiness tags** (`ready`/`blocked`/`needs-design`) — keep current; remove when no longer true.
- **Never delete content for tidiness** — zettels are the durable knowledge layer. Merge duplicates and archive rather than delete.

### Deprecation

When a design decision is superseded, mark — don't delete:

1. Add the `deprecated` tag.
2. Add a banner at the top of the body: `**Superseded by [new approach] — see [[decision-zettel]].** Original content preserved below for reference.`
3. Add a `SUPERSEDES` edge from the new zettel to the deprecated one in `connections.md`.

When only some concerns in a multi-topic zettel are obsolete, use a partial-deprecation header note pointing to the current zettel(s) for the obsolete sections, without retiring the whole file.

## Hubs and threads

- **Hubs** (tag `hub`) aggregate a domain. Thin by design: a framing sentence plus `Hub: [[child-1]], [[child-2]], …` and `INCLUDES` edges to members. The hub is the full design picture, not one phase.
- **Threads** (tag `thread` + a lifecycle tag: `active`, `dormant`, `on-hold`, `spike`, `archived`) are parallel work concerns — an ordered item sequence with dependency and readiness annotations. List members with `Thread: [[item-1]], …`; members point back via `thread:<slug>` refs.
- After implementing or re-prioritizing, update the thread sequence and member tags; verify with `node z-yap/scripts/threads.js --thread <slug>`.

## Architecture Decision Records (ADRs)

Significant design shifts (e.g. replacing Z3 with IVL) get a dedicated ADR zettel:

- **Filename**: `<slug>.adr.md`.
- **Tags**: `adr` + one or more lifecycle tags (`proposed`, `accepted`, `amended`, `reframed`, `superseded` — see REGISTRY.md; lifecycle tags compose, e.g. `accepted` + `amended`) + relevant domain tags + an epistemic status (`implemented`, `in-progress`, …).
- **Frontmatter scalar** `adr-id: D-NNN` — next free number; see `node z-yap/scripts/adrs.js`.
- Optional scalars `amended-by: [adr:D-NNN]` / `reframed-by: [adr:D-NNN]` for inbound lifecycle relationships from later ADRs.
- **Body** covers: the decision, scope, rationale, consequences. Self-contained.
- **Edges**: `SUPERSEDES` / `AMENDS` / `REFRAMES` / `MOTIVATES` / `IMPLEMENTS` / `REJECTS` to affected zettels — use all that fit.
- **Rejections**: split into a positive ADR (`accepted`) plus a companion zettel for the rejected alternative (tagged `rejected`/`speculative`), connected via `REJECTS`.
- Other zettels reference an ADR via `refs: [adr:D-NNN]` (inbound refs surfaced by `scripts/adrs.js`).
- **Log** the decision in `thread.md`. Run `node z-yap/scripts/adrs.js` for the index and consistency check; `--decisions-md` writes `dist/decisions.md`.

## Paper trail — thread.md

Append (never rewrite or reorder) a session block to `z-yap/thread.md` for every session that does design or implementation work:

```
## Session: <title> — @YYYY-MM-DD [tag, tag, …]

One-paragraph narrative of what was explored, decided, and produced.

### Spawned / Resolved / Updates / Edges

SPAWN [[new-zettel]] — why it now exists
ENQUEUE [[zettel]] — deferred work, one line
RESOLVED [[zettel-or-item]] — what closed it

[[source]] --[:LABEL]--> [[target]]  -- note   # edges created or traversed
```

## Queue

- **Defer work**: ensure the zettel exists → `ENQUEUE` line in `thread.md` → `- [ ]` item in `global-pending-queue` (or a scoped queue zettel). Proactively enqueue when discussion surfaces future work — tell the user.
- **Resolve**: mark `[x]` (or `[~]` dropped) → `RESOLVED` line in `thread.md`.
- Verify with `node z-yap/scripts/queue.js`.

## Session / interaction workflow

This is the ZK-interaction protocol — apply it across a working session, not the project-load step.

**At session end**, if the session did design or implementation work:

1. Append a session block to `thread.md` (see **Paper trail** above) with edge lines and SPAWN/ENQUEUE/RESOLVED actions.
2. Check `[[pulse]]`: if the session materially moved a thread's status, current frontier, or next step, update that thread's pulse paragraph so the curated current-state view stays accurate.

**If the session produced significant design discussion**, also create a session zettel:

3. File: `z-yap/zettels/<topic>.session.md`.
4. Tag with `ai-session` + relevant domain tags.
5. Add `session:<UUID>` to `refs` in frontmatter.
6. Body: one-paragraph summary of what was discussed, decided, and produced.
7. Connections: `PRODUCED`, `INFORMED_BY`, `RESOLVED` edges to affected zettels; an `INCLUDES` edge from `[[sessions.hub]]`.
8. Copy the transcript JSONL to `z-yap/sessions/<UUID>.jsonl`.

## Connections

Edges encode position in the graph; tags encode facets. Both compose. `connections.md` is the source of truth; embedded `## Connections` sections in zettels regenerate on commit (`scripts/embed-connections.js`, pre-commit hook).

- **Active voice, source → target.** Labels are canonical active-voice verbs. Read every edge as `[Source title] [LABEL] [Target title]`; if it doesn't parse as grammatical active voice, fix the label or the direction. Labels ending in `_BY`, `_WITH`, `_FROM` are passive-voice red flags — direction handles the inverse.
- **Multiple labels when distinct meanings apply.** If two labels both fit and carry different navigational semantics, emit both edges. The graph is denser, not noisier.
- **Prefer specific over generic.** Generic labels (`USES`, `RELATES_TO`) are valid when the relationship genuinely is generic; reusing them to avoid coining vocabulary is a precision loss.
- **Overconnecting beats sparsity.** A missed connection is a failed search query. Connect to every relevant zettel in the neighborhood — cross-domain connections especially.
- When redirecting edges from deleted zettels, preserve the *semantic relationship*, not just the syntactic edge.

## Vocabulary maintenance

New tags, edge labels, ref prefixes, or lifecycle states go into `REGISTRY.md` when first used. Check `REGISTRY.md` before coining — not to constrain, but to avoid synonyms. Tags are atomic facets (`type-system`, `concept`), not compound categories.

---

## Quality theory

The canonical rubric for what "good" looks like. The **zettel-quality-rework** skill references this section rather than restating it.

The ZK encodes knowledge ABOUT the project — design rationale, tradeoffs, tensions, decisions, concept models, reference material, process workflows, current state, roadmap, ADRs. It is **not** implementation documentation. The code is the ultimate source of truth; the ZK is supporting knowledge.

**The quality test:** does each zettel successfully teach its one idea to a reader who has access to the code but doesn't know the design context?

**Facts are independent of implementation.** "Yap needs row theory for verification" is true whether Z3 or IVL implements it. Knowledge survives migrations; status is ephemeral. A concept or decision should read the same regardless of whether the feature is shipped, half-built, or deferred.

**Status belongs in tags, not prose.** Use `deprecated`, `deferred`, `incomplete`, `planned` as tags. Never write "this doesn't exist yet" or "these are commented out" into the body. Stating what something is and what it's for is fine; commenting on current code state is not.

**Implementation details serve understanding, not documentation.** "We chose X because Y, and it lives here" is knowledge. "File X has methods F and H using types T and U" is not — it mirrors the codebase, which is already the source of truth.

**Don't over-commit on open design.** If the principle is settled but the specifics are open ("row reasoning must be structural" but the solver plugin shape is TBD), say exactly that. Don't invent details or commit to an undecided approach.

### What a zettel IS

- **One atomic idea** — concept, decision, principle, mechanism, or reference.
- **Self-contained** — meaningful without knowing why it was created or what connects to it.
- **Context-free prose** — no "the code currently…" or "as of this writing…".
- **Durable** — true regardless of implementation status; survives refactors.
- **Split generously** — if two ideas share a zettel, split them. Each must be atomic and self-contained, not a skeleton.

### What a zettel is NOT

- A code walkthrough with src/ paths and function signatures.
- A status report ("not implemented yet", "these are commented out").
- A dispatch table of modules and their locations.
- A plan with completion checkboxes.

### Prose economy and negative framing

Every sentence must carry design knowledge. Apply these per sentence:

**Trim redundant clauses.** If removing a clause loses no information, cut it. "Container types encode as App+Row, no dedicated constructors" — the second clause is redundant; the first already states the design. The test: does the sentence lose knowledge without the clause?

**Negative framing is context-dependent.** Some negations are the point; others are noise. Classify before acting:

| Kind | Example | Action |
|------|---------|--------|
| **Legitimate contrast** | "Annotations erase before EB.Term", "not a proof assistant", "exist only in EB.Term" | **Keep** — the negation IS the design knowledge |
| **Status report** | "not yet implemented", "currently throws", "TODO", "FIXME", "future work" | **Remove** — ephemeral; use tags (`incomplete`, `planned`) |
| **Redundant negation** | "not inherited from JavaScript" after stating the positive mechanism | **Remove** — positive statement already covers it |
| **Confusing "what this isn't"** | "There is no WHNF mode flag" | **Rewrite** — lead with the positive design; a future reader asks "why tell me about something that doesn't exist?" |

**The future-reader test.** Before keeping any sentence, ask: would someone reading this with no knowledge of the conversation, backlog, or implementation state find it informative? If they'd find it confusing, redundant, or ephemeral — fix it.

### Structural patterns

- **Concept zettel** — what X is, why it exists, how it fits. No code paths. Connect to mechanisms and decisions.
- **Decision zettel (ADR-style)** — "Decision: Y." Context: what problem. Rationale: why this choice. What would break otherwise. Provenance: prior art. One zettel per decision.
- **Hub zettel** — domain entry point. Short framing, then a structured list of children by role (concepts, decisions, mechanisms, extensions, references). Hubs are graph infrastructure; don't penalize them for being thin.
- **Contrast zettel** — when a design choice has a clear alternative (eager vs deferred, structural vs nominal, closure conversion vs defunctionalization), create a zettel for the alternative and link via `CONTRASTS_WITH`. Makes the design space navigable.
- **Reference zettel** — papers, prior art, influences. Keep the citation and the "relationship to Yap" section; strip any impl-map content. Verify DOIs/URLs externally — training-data recall is not verification.
- **Milestone record** — a paper trail of what was built. Design knowledge gets extracted into separate linked zettels; the milestone records what happened, the design zettels capture why.

### Classification (no internal doc links)

Classification lives in graph structure — tags give facets, edges give position. Don't embed "this is a project management tool" in prose; express it as tag combinations + relationships. Don't reference ephemeral files (`docs/`, `brainstorming/`, `.cursor/plans/`, `ARCHITECTURE.md`) in zettel bodies. External URLs and `src/` code paths are fine. Use a prescriptive-free tone — "one approach is X", not "Yap should add X".

## Do not

- Duplicate the reference tables (tags, edge labels, ref prefixes) from `REGISTRY.md`/`README.md` into zettels or other skills.
- Restate the quality theory in other skills — link here.
- Rewrite or reorder existing `thread.md` blocks — append only.
- Delete zettels for tidiness — deprecate, merge, or archive.
- Add edges anywhere but `connections.md` (embedded sections are derived).
