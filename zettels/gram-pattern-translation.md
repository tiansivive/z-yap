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
