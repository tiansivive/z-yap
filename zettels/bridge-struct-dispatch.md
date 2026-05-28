---
tags:
  - planned
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - pattern
  - row-types
---

# Bridge struct dispatch

`match { x: 1 } | { x: a } -> a` — the bridge emits `String(v1) === ""` for the struct `SWITCH` node, treating it as a variant-style scalar dispatch (tag comparison). Struct patterns require field projection and sub-pattern dispatch, not string equality.

**Multi-alt struct patterns** (e.g. `| { x: 0 } -> "zero" | { x: a } -> a`) require real dispatch: project the field, test sub-patterns, branch. Single-alt struct patterns can skip dispatch and go straight to destructuring, but the bridge must distinguish these cases.

**Architecture gap:** `decisions.ts` handles variant `SWITCH` correctly (match on injected tag) but doesn't have a struct-specific path. Struct match needs:

1. For each field pattern: project, compare/bind.
2. Ordering of field tests (Maranget-style or left-to-right).
3. Single-alt short-circuit (project fields, bind, skip branching).

**Snippet:** `match { x: 1 } | { x: a } -> a` — MIR output shows string comparison branch.

**Status:** Needs design — intersects with pattern matching compilation in GRAM passes.
