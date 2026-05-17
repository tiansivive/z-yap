---
tags:
- normalization
- elaboration
- mechanism
- implemented
- syntax
- ast
- ir
- inference
- dependent
- type-system
- migration
- reference
- code
---
# Level-to-Index Conversion

**Context telescope:** `lvl2idx(ctx, lvl)` is `ctx.env.length - 1 - lvl` (`src/elaboration/shared/context.ts`).

**Readback:** `NF.quote(ctx, lvl, val)` threads an explicit quoting depth `lvl` so binders under λ/Π/µ increment depth without reshaping `ctx` (`quoting.ts` doccomment). For `NF.Var` with bound variable `v`, emitted index is **`lvl - v.lvl - 1`**. Row variables repeat the same mapping for `{ type: "Bound" }`.

**Rigid scaffolding:** quoting λ/Π/µ bodies uses `NF.apply(..., NF.Constructors.Rigid(lvl))` then `quote(..., lvl + 1, ...)`.

Call sites commonly pass **`ctx.env.length`** where quoting aligns with the live env (`check.ts`, `implicits.ts`, `inference/rows.ts`, zonked-meta paths in `evaluation.v2.ts`, etc.).

See also: [[de-bruijn.md]], [[levels-vs-indices.md]], [[quoting.md]].
