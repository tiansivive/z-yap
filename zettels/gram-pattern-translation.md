---
tags:
- lowering
- graph
- ir
- mechanism
- implemented
- ast
---

# Pattern graph translation (GRAM)

**Code:** `walkPattern` / `walkPatternRow` in `src/GRAM/translate.ts`.

Phase 1 of pattern matching in GRAM. Converts opaque `EB.Pattern` AST blobs into explicit graph nodes during translation:

- **`pat:variant`** — `{ label }` with `:payload` edge to inner pattern
- **`pat:struct`** — with `:field` edges (labeled) to field patterns
- **`pat:lit`** — `{ value }` (the literal object, e.g. `{ type: "Num", value: 0 }`)
- **`pat:binder`** — `{ name, level }`, pushes onto the de Bruijn binder stack
- **`pat:wildcard`** — empty payload

Case nodes link to their pattern root via `:pattern`. The translation makes pattern structure *graph-queryable* — no longer opaque blobs hidden inside node payloads.

Key design: `pat:binder` nodes participate in the binder stack (same stack as lambdas and let bindings). This means closure conversion downstream automatically captures variables bound by patterns, with no special handling needed.
