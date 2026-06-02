# z-yap

Yap's design space zettelkasten — a structured knowledge base of the language's type system,
elaboration pipeline, and compiler architecture.

Part of the [z-loom](https://github.com/tiansivive/z-loom) federation.

## Quick start

```bash
node scripts/status.js                      # thread + queue overview (start here)
node scripts/threads.js                     # detailed per-thread member listing
node scripts/threads.js --pending           # only non-implemented items
node scripts/queue.js                       # pending queue items
node scripts/catalog.js --tag solver        # filter zettel inventory by tag
node scripts/catalog.js --status planned    # filter by epistemic status
node scripts/catalog.js --search fuzzy      # text search on slug + title
node scripts/neighborhood.js nbe            # connections to/from a zettel (fuzzy match)
```

For agent sessions, read `init.md` first.

## What is yap?

A small dependently typed language with structural types, implicits, and code verification
semantics via modalities (QTT-based multiplicities and liquid type refinements).

The implementation lives at [tiansivive/yap](https://github.com/tiansivive/yap).

## Structure

```
z-yap/
  manifest.yaml          # Federation metadata and entry points
  README.md              # This file
  REGISTRY.md            # Tags, labels (descriptive registry)
  connections.md         # All edges in pseudo-Cypher format
  thread.md              # Append-only paper trail of work sessions
  zettels/               # Atomic design notes (markdown + frontmatter)
  sessions/              # Transcript JSONLs (committed, one per significant session)
  scripts/               # CLI tools, kanban renderers, git hooks
    kanban/              # HTML + Obsidian kanban renderers
    hooks/               # Git hooks (pre-commit)
  dist/                  # Generated artifacts (CI + pre-commit hook)
```

## Work threads

Parallel work concerns tracked as thread hub zettels (tagged `thread`). Each hub
contains an ordered sequence of items with dependency and readiness annotations.
See `thread.md` for the session-by-session paper trail.

| Thread | Concern |
|--------|---------|
| `delimited-continuations.thread` | shift/reset, answer types, multishot, lowering |
| `row-types.thread` | Structural data, unification, verification gap |
| `usage-semantics.thread` | QTT, modalities, enforcement |
| `recursion.thread` | Mu types, mutual recursion, loop sugar |
| `pattern-matching.thread` | Compilation, exhaustiveness, surface features |
| `verification-backend.thread` | VC IR, in-house solver, theory support |
| `gram-evolution.thread` | Graph IR, MIR bridge, future passes |
| `elaboration-v2.thread` | Monad, pipeline, doc alignment |
| `parser-migration.thread` | Tree-sitter, grammar alignment |
| `explorer-evolution.thread` | Provenance viz, cross-highlighting, diff, snippets, timing, graph |

Unassigned items live in `global-pending-queue`.

## Zettel format

```markdown
---
tags: [type-system, concept]
---
# Title

Body text — one atomic idea per zettel.
```

Zettels are pure content. Connections live in `connections.md`.

## Connection format

Pseudo-Cypher with Obsidian-compatible `[[backlinks]]`:

```
[[source]] --[:LABEL]--> [[target]]  -- optional note  @2026-04-18
```

Bidirectional (desugars to two directed edges):
```
[[structural-typing]] --[:CONTRASTS_WITH]-- [[nominal-typing]]  -- note
```

Components:
- `[[slug]]` — zettel identifier (Obsidian-navigable)
- `--[:LABEL]-->` — directed edge (or `--[:LABEL]--` for bidirectional)
- `-- note` — optional freetext description
- `@ISO-date` — optional timestamp

## Federation

This zettelkasten is part of the z-loom federation. Cross-references use loom URIs:

```
loom://@yap/structural-typing       # from any federated context
[[structural-typing]]               # within this zettelkasten (local ref)
```

z-loom resolves `loom://@yap/...` to this repository via the yap Gateway node.

## Scripts

| Script | Lang | Purpose |
|--------|------|---------|
| `status.js` | Node.js | Thread + queue summary (quick overview) |
| `threads.js` | Node.js | Per-thread member listing (`--html` `--obsidian` `--markdown` `--pending`) |
| `queue.js` | Node.js | Pending queue items |
| `catalog.js` | Node.js | Zettel inventory with `--tag`/`--status`/`--search`/`--markdown` filtering |
| `neighborhood.js` | Node.js | All connections to/from a zettel (fuzzy slug match) |
| `glossary.js` | Node.js | Browse glossary terms |

Kanban rendering lives in `scripts/kanban/` — `render.js` (HTML with flyout), `obsidian.js` (Obsidian Kanban plugin).

Markdown versions auto-generated to `dist/` on push to main (GitHub Actions).
Kanban boards (`threads.html`, `threads.kanban.md`) auto-generated on commit via pre-commit hook.

```bash
git config --local core.hooksPath scripts/hooks   # activate the hook
```

## License

MIT
