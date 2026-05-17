---
tags:
- elaboration
- normalization
- concept
- implemented
- type-system
- inference
- dependent
- syntax
- ast
- ir
- mechanism
- reference
---
# De Bruijn Representation (hub)

Yap splits bound-variable representations across elaborated syntax and semantic values:

| Layer | File | Bound shape |
|-------|------|-------------|
| Core terms | `src/elaboration/syntax/term.ts` | `EB.Variable`: `{ type: "Bound"; index: number }` (**index**) |
| Normal forms | `src/elaboration/normalization/syntax/term.ts` | `NF.Variable`: `{ type: "Bound"; lvl: number }` (**level**) |
| Context helpers | `src/elaboration/shared/context.ts` | `lvl2idx(ctx, lvl) => ctx.env.length - 1 - lvl`; binder insertion uses `NF.Constructors.Rigid(env.length)` in `bind` / `augment` |

Readback `NF.quote(ctx, lvl, …)` (`quoting.ts`) maps `NF` bound levels to `EB` indices at the passed quoting depth with `index = lvl - v.lvl - 1` for bound vars (equivalent to `lvl2idx` when `lvl` matches that depth).

Detail notes: [[de-bruijn-indices.md]], [[de-bruijn-levels.md]], [[levels-vs-indices.md]], [[level-to-index-conversion.md]], [[quoting.md]].
