# z-yap — Agent Session Init

You are working with z-yap, the design-space zettelkasten for the Yap programming
language. This file tells you how to orient yourself at the start of a session.

## Quick orientation

Run these to get the current state:

```bash
node scripts/status.js           # threads + queue summary (start here)
node scripts/threads.js           # detailed thread status with members
node scripts/queue.js             # pending queue items
python3 scripts/catalog.py --compact  # full zettel inventory (one-liner per zettel)
```

## What is z-yap?

A federated zettelkasten (part of [z-loom](https://github.com/tiansivive/z-loom))
containing ~250 atomic design notes about Yap's type system, elaboration pipeline,
compiler architecture, and verification backend.

Key files:
- `VOCABULARY.md` — tag and label vocabulary
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
2. **Run `node scripts/status.mjs`** to see current thread/queue state
3. **Read `thread.md`** (latest session block) to see what happened last
4. **Read relevant thread hubs** for the area you're working in
5. **When done**, append a session block to `thread.md` with:
   - Session ID, date, tags
   - Edge lines for graph traversal
   - SPAWN/ENQUEUE/RESOLVED actions
   - Brief narrative summary

## Zettel conventions

- One atomic idea per zettel
- Tags in YAML frontmatter (see `VOCABULARY.md` for allowed tags)
- Connections live in `connections.md`, not in zettel bodies
- Format: `[[source]] --[:LABEL]--> [[target]]  -- optional note  @date`

## Scripts

| Script | Language | Purpose |
|--------|----------|---------|
| `status.js` | Node.js | Combined thread + queue overview |
| `threads.js` | Node.js | Detailed per-thread status with members |
| `queue.js` | Node.js | Pending queue items |
| `catalog.py` | Python | Full zettel catalog with connections |
| `neighborhood.py` | Python | Single zettel's connection neighborhood |

Markdown versions are auto-generated to `dist/` on push (GitHub Actions):
`STATUS.md`, `THREADS.md`, `QUEUE.md`, `CATALOG.md`.
