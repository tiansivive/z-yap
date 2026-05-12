# z-yap

Yap's design space zettelkasten — a structured knowledge base of the language's type system,
elaboration pipeline, and compiler architecture.

Part of the [z-loom](https://github.com/tiansivive/z-loom) federation.

## Quick start

```bash
python3 scripts/catalog.py           # full catalog
python3 scripts/catalog.py --compact # one-line-per-zettel
python3 scripts/catalog.py types     # filter by keyword
python3 scripts/neighborhood.py yap  # show a zettel's connections
```

## What is yap?

A small dependently typed language with structural types, implicits, and code verification
semantics via modalities (QTT-based multiplicities and liquid type refinements).

The implementation lives at [tiansivive/yap](https://github.com/tiansivive/yap).

## Structure

```
z-yap/
  manifest.yaml          # Federation metadata and entry points
  README.md              # This file
  VOCABULARY.md          # Tags, labels, groups
  connections.md     # All edges in pseudo-Cypher format
  zettels/               # Atomic design notes (markdown + frontmatter)
  scripts/               # Catalog generation, neighborhood view
  dist/                  # CI-generated indexes
```

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

| Script | Purpose |
|--------|---------|
| `catalog.py` | Generate catalog from zettels + connections |
| `neighborhood.py` | Show a zettel's incoming/outgoing edges |

## License

MIT
