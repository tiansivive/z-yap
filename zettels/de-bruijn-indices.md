---
tags:
- elaboration
- syntax
- ast
- mechanism
- implemented
- inference
- dependent
- normalization
- type-system
- migration
- parser
- reference
- code
---
# De Bruijn Indices (`EB.Term`)

In `src/elaboration/syntax/term.ts`, bound locals use `Variable` variants including **`{ type: "Bound"; index: number }`**. Elaboration resolves source names against `ctx.env`: `lookup` (`src/elaboration/shared/context.ts`) returns `EB.Constructors.Var({ type: "Bound", index: i })` where `i` counts outward from the innermost binding (first env entry at index `0`).

Metavariables carry **both** `val` and **`lvl`** (`Meta`): `{ type: "Meta"; val: number; lvl: number }` — `lvl` is shared with the levels story for binding discipline (see comment referencing unification).

Normal forms use levels instead; bridging is **`NF.quote`** and call sites that pass `ctx.env.length` as quoting depth (`check.ts`, `implicits.ts`, `inference/*`, etc.).

See also: [[de-bruijn.md]], [[de-bruijn-levels.md]], [[level-to-index-conversion.md]].
