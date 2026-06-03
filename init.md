# z-yap — Agent Session Init

You are working with z-yap, the design-space zettelkasten for the Yap programming
language. This file tells you how to orient yourself at the start of a session.

## Quick orientation

Run these to get the current state:

```bash
node scripts/current-state.js    # composite: pulse + baseline + ADRs + hubs (start here)
node scripts/status.js           # threads + queue summary
node scripts/threads.js           # detailed thread status with members
node scripts/queue.js             # pending queue items
node scripts/adrs.js              # ADR index + consistency
node scripts/catalog.js --compact     # one-liner-per-zettel inventory
```

## What is z-yap?

A federated zettelkasten (part of [z-loom](https://github.com/tiansivive/z-loom))
containing ~250 atomic design notes about Yap's type system, elaboration pipeline,
compiler architecture, and verification backend.

Key files:
- `REGISTRY.md` — tag and label registry
- `connections.md` — all edges in pseudo-Cypher format
- `thread.md` — append-only paper trail of work sessions
- `manifest.yaml` — federation metadata

## Work layer

z-yap uses a thread/queue system for tracking work:

- **Threads** are hub zettels (tagged `thread`) with ordered sequences of work items,
  dependency annotations, and readiness markers. Each thread is a parallel concern.
- **Queue** (`global-pending-queue.md`) holds unassigned items.
- **Paper trail** (`thread.md`) is append-only; each session appends a block with
  edge lines, SPAWN/ENQUEUE/RESOLVED actions, and a narrative summary.

### Active threads

| Thread | Concern |
|--------|---------|
| `delimited-continuations.thread` | shift/reset, answer types, multishot |
| `row-types.thread` | structural data, unification, verification gap |
| `usage-semantics.thread` | QTT, modalities, enforcement |
| `recursion.thread` | mu types, mutual recursion, loop sugar |
| `pattern-matching.thread` | compilation, exhaustiveness |
| `verification-backend.thread` | VC IR, in-house solver, theory support |
| `gram-evolution.thread` | graph IR, MIR bridge, future passes |
| `elaboration-v2.thread` | monad, pipeline, doc alignment |
| `parser-migration.thread` | tree-sitter, grammar alignment |

### Readiness tags

- `ready` — unblocked, can start
- `blocked` — waiting on a dependency
- `needs-design` — requires design exploration first

## Session protocol

1. **Read this file** (you're doing it)
2. **Run `node scripts/status.js`** to see current thread/queue state
3. **Read `thread.md`** (latest session block) to see what happened last
4. **Read relevant thread hubs** for the area you're working in
5. **When done**, append a session block to `thread.md` with:
   - Session ID, date, tags
   - Edge lines for graph traversal
   - SPAWN/ENQUEUE/RESOLVED actions
   - Brief narrative summary
6. **If the session produced significant design discussion**, create a session zettel:
   - File: `zettels/<topic>.session.md`
   - Tag with `ai-session` + relevant domain tags
   - Add `session:<UUID>` to `refs` in frontmatter
   - Body: one-paragraph summary of what was discussed, decided, and produced
   - Connections: `produced`, `informed-by`, `resolved` edges to affected zettels
   - Copy the transcript JSONL to `sessions/<UUID>.jsonl`
   - Add an `includes` edge from `[[sessions.hub]]`

## Zettel conventions

- One atomic idea per zettel
- Tags in YAML frontmatter (see `REGISTRY.md`)
- If you draft a tag not in `REGISTRY.md`, coin it and add it — don't swap for a "close enough" existing tag, that's a nuance loss
- Connections live in `connections.md`, not in zettel bodies
- `[[backlinks]]` in bodies are fine for Obsidian navigation
- Format: `[[source]] --[:LABEL]--> [[target]]  -- optional note  @date`

## Content quality

### Bodies
- **Self-contained** — a zettel body must be meaningful on its own, without knowing why it was created or what surrounds it
- **Prose economy** — every clause must carry design knowledge. Drop clauses that add nothing once the positive statement covers it ("Container types encode as App+Row, ~~no dedicated constructors~~" — the second clause is redundant). The test: remove the clause; does the sentence lose information? If not, cut it.
- **Negative framing — context-dependent** — negative language is sometimes the point:
  - **Legitimate**: design contrasts ("Annotations erase before EB.Term"), positioning ("not a proof assistant"), domain boundaries ("Reset/Shift exist only in EB.Term"). The negation IS the knowledge.
  - **Status reports**: "not yet implemented", "currently throws", "TODO", "FIXME" — ephemeral, will become false. Status belongs in tags (`incomplete`, `planned`), not prose.
  - **Redundant negation**: "not inherited from JavaScript" after already stating the positive mechanism — adds nothing, cut it.
  - **Confusing "what this isn't"**: "There is no WHNF mode flag" — a future reader asks "why are you telling me about something that doesn't exist?" Lead with the positive design instead.
  - **The test**: would a reader with no context about this conversation find the sentence informative, or puzzling?
- **No internal doc links** — don't reference `docs/`, `brainstorming/`, `ARCHITECTURE.md`, `.cursor/plans/`, `.github/`. Those files are ephemeral. External URLs and `src/` code paths are fine
- **No prescriptive tone** — "one approach would be X" not "Yap should add X"
- **No narrating old docs** — "the design docs say X" → just state X as knowledge
- **Classification lives in graph structure** — tags give facets, edges give position. Don't embed "this is a project management tool" in prose; express it as tag combinations + relationships

### Tags
- **Minimum 8 tags per zettel** — more is better; tags are atomic facets, not categories
- **Epistemic status tags** — apply to design/implementation zettels (not pure reference/paper zettels). Use one of: `implemented`, `in-progress`, `planned`, `speculative`, `deprecated`, `rejected`, `deferred`, `incomplete`. These are orthogonal to readiness tags (`ready`, `blocked`, `needs-design`)
- **Hub zettels** — overview zettels that aggregate a domain. Tag with `hub` and list children in the body with `Hub: [[child-1]], [[child-2]], …`
- **Thread zettels** — parallel work concerns. Tag with `thread` and a lifecycle tag (`active`, `dormant`, `on-hold`, `spike`, `archived`). List members with `Thread: [[item-1]], …`

### Deprecated content
When a design decision is superseded, don't delete the old zettel — mark it:
1. Add `deprecated` tag to frontmatter
2. Add a banner at the top of the body: `**Superseded by [new approach] — see [[decision-zettel]].** Original content preserved below for reference.`
3. Create a `SUPERSEDES` edge from the new zettel to the deprecated one

When a zettel covers multiple concerns and only some are obsolete, use a partial-deprecation note instead — a header note pointing readers to the current zettel(s) for the obsolete sections, without retiring the whole file.

### Connections
Edges encode position in the graph; tags encode facets. Both compose.

- **Multiple labels when distinct meanings apply** — if `LABEL_A` and `LABEL_B` both fit a relationship and carry different navigational semantics, emit both edges. The graph is denser, not noisier; each label opens a different traversal path.
- **Multiple tags for the same facet axis** — when a zettel sits on multiple lifecycle states or epistemic statuses simultaneously, tag all of them. Composition is the norm.
- **Coin vocabulary when needed** — the threshold for a new tag or edge label is "captures something existing vocabulary doesn't", not "absolutely necessary". A graph with 50 precise labels is more useful than one with 10 overloaded ones. Add to `REGISTRY.md` when you coin one.
- **Active voice, source → target** — labels are canonical active-voice verbs. The graph does not need both `X` and `X_BY` — direction handles the inverse. Read every planned edge as `[Source title] [LABEL] [Target title]`; if it does not parse as grammatical active voice, fix the label or the direction. Labels ending in `_BY`, `_WITH`, or `_FROM` are passive-voice red flags.
- **Prefer specific over generic** — generic labels (`USES`, `RELATES_TO`) are valid when the relationship genuinely is generic; reusing them to avoid creating vocabulary is a precision loss. When in doubt, coin the specific label.

### Architecture Decision Records (ADRs)
Significant design shifts (e.g., replacing Z3 with IVL) get a dedicated ADR zettel:
- Filename convention: `<slug>.adr.md`
- Tag with `adr` + one or more lifecycle tags (see REGISTRY.md ADR lifecycle table) + relevant domain tags + epistemic status (`implemented`, `in-progress`, etc.). Lifecycle tags compose — `accepted` + `amended` and `accepted` + `reframed` are common combinations.
- Frontmatter scalar `adr-id: D-NNN` for the stable identifier (next free number; see `node scripts/adrs.js`)
- Optional frontmatter scalars `amended-by: [adr:D-NNN]` / `reframed-by: [adr:D-NNN]` for inbound lifecycle relationships from later ADRs
- Body covers: the decision, scope, rationale, consequences. Self-contained — no references to external planning docs.
- Connected via `SUPERSEDES`/`AMENDS`/`REFRAMES`/`MOTIVATES`/`IMPLEMENTS`/`REJECTS` (and any other applicable) edges to affected zettels. Use all that fit — see the Connections subsection above.
- When recording a rejection of an alternative, split: a positive ADR (`accepted`) plus a companion zettel for the rejected alternative (tagged `rejected`/`speculative`), connected via `REJECTS`
- Other zettels reference an ADR via `refs: [adr:D-NNN]` (these inbound refs are surfaced by `scripts/adrs.js`)
- Log the decision in `thread.md` paper trail
- Run `node scripts/adrs.js` for the index and consistency check; `--decisions-md` produces a piescript-style log

## Scripts

All scripts live in `scripts/`. Run from anywhere — paths are resolved relative to the script.

| Script | Usage | Purpose |
|--------|-------|---------|
| `status.js` | `node scripts/status.js` | Cold-start: thread + queue overview |
| `threads.js` | `node scripts/threads.js [--thread slug]` | Per-thread member listing |
| | `node scripts/threads.js --html [--open]` | Kanban board → `dist/threads.html` (with flyout) |
| | `node scripts/threads.js --obsidian` | Obsidian kanban → `dist/threads.kanban.md` |
| | `node scripts/threads.js --markdown` | Plain markdown table output |
| | `node scripts/threads.js --pending` | Only non-implemented items |
| `queue.js` | `node scripts/queue.js` | Pending queue items |
| `catalog.js` | `node scripts/catalog.js [--tag\|--status\|--search val\|--markdown]` | Zettel inventory with filtering |
| `neighborhood.js` | `node scripts/neighborhood.js <slug>` | All connections to/from a zettel (fuzzy match) |
| `glossary.js` | `node scripts/glossary.js [search]` | Browse glossary terms |
| `adrs.js` | `node scripts/adrs.js` | ADR index + consistency report |
| | `node scripts/adrs.js --markdown` | Plain markdown index |
| | `node scripts/adrs.js --consistency-only` | Just the consistency report |
| | `node scripts/adrs.js --status accepted` | Filter by lifecycle tag |
| | `node scripts/adrs.js --decisions-md` | Write piescript-style `dist/decisions.md` |
| `current-state.js` | `node scripts/current-state.js` | Composite: pulse + baseline + ADR roll-up + hub snapshot |
| | `node scripts/current-state.js --markdown` | Write `dist/CURRENT-STATE.md` |
| | `node scripts/current-state.js --detail` | Expanded per-hub member listing |

Shared utilities: `scripts/lib/parse.js` (parsing), `scripts/lib/adrs.js` (ADR data layer), `scripts/lib/colors.js` (ANSI).
Kanban rendering: `scripts/kanban/render.js` (HTML), `scripts/kanban/obsidian.js` (Obsidian).

### Generated artifacts

Markdown versions are auto-generated to `dist/` on push (GitHub Actions):
`STATUS.md`, `THREADS.md`, `QUEUE.md`, `CATALOG.md`, `GLOSSARY.md`, `ADRS.md`, `decisions.md`, `CURRENT-STATE.md`.

Kanban boards are generated to `dist/` on commit (pre-commit hook):
`threads.html` (interactive, with zettel flyout), `threads.kanban.md` (Obsidian Kanban plugin).

### Pre-commit hook

To activate the hook that regenerates kanban artifacts on each commit:

```bash
git config --local core.hooksPath scripts/hooks
```
