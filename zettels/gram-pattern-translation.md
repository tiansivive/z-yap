---
tags:
  - lowering
  - graph
  - ir
  - mechanism
  - implemented
  - pattern
  - compiler
---
# Pattern graph translation (GRAM)

Phase 1 of pattern matching in GRAM. Converts opaque `EB.Pattern` AST blobs into explicit graph nodes during translation, making pattern structure graph-queryable rather than hidden inside node payloads.

## Node types

- **`pat:variant`** — `{ label }` with `:payload` edge to inner pattern
- **`pat:struct`** — with `:field` edges (labeled) to field patterns
- **`pat:lit`** — `{ value }` (the literal object)
- **`pat:binder`** — `{ name, level }`, pushes onto the de Bruijn binder stack
- **`pat:wildcard`** — empty payload

Case nodes link to their pattern root via `:pattern`.

## Key design

`pat:binder` nodes participate in the binder stack — the same stack as lambdas and let bindings. This means closure conversion downstream automatically captures variables bound by patterns, with no special handling needed. Pattern binders and lambda binders are structurally identical from the graph's perspective.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[gram]] — Part of translate.ts
- TRANSLATES_TO → [[match]] — EB.Pattern → pat:* graph nodes
- ENABLES → [[gram-pattern-pass]] — Makes patterns graph-queryable
- COMPOSES_WITH → [[closure-conversion]] — pat:binder pushes onto binder stack

**Incoming**
- [[pattern-matching-compilation]] ← INCLUDES — Representation phase
- [[gram-pattern-pass]] ← RELIES_ON — Reads pat:* nodes as input
- [[gram]] ← INCLUDES — Translation phase
- [[stg-analogy]] ← DISTINGUISHES — Translation = STG-level (semantic)
- [[pattern-matching.thread]] ← INCLUDES
- [[gram-evolution.thread]] ← INCLUDES
- [[programmable-gram-passes]] ← RELIES_ON — Modal node emitted by EB→GRAM translation

<!-- connections:end -->
