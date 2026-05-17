---
tags:
- elaboration
- normalization
- decision
- implemented
- type-system
- inference
- dependent
- syntax
- ast
- ir
- mechanism
- migration
- reference
---
# Levels vs Indices

**Indices** live on **`EB.Term`** (`src/elaboration/syntax/term.ts`): `{ type: "Bound", index }` matches how `lookup` walks `ctx.env` from the hole outward.

**Levels** live on **`NF.Value`** (`src/elaboration/normalization/syntax/term.ts`): `{ type: "Bound", lvl }` pairs with env length and `Rigid` placeholders in `bind` / `augment` (`context.ts`).

Conversion at the NbE boundary is **`NF.quote`** (and `lvl2idx` for index-oriented context code). Same physical context length links the two formulas: `index = envLength - 1 - lvl` at a fixed boundary, or `lvl_quote - v.lvl - 1` under nested quoting (`quoting.ts`).

See also: [[de-bruijn.md]], [[de-bruijn-indices.md]], [[de-bruijn-levels.md]], [[level-to-index-conversion.md]].
