---
tags:
- normalization
- ir
- mechanism
- implemented
- elaboration
- type-system
- inference
- unification
- dependent
- ast
- syntax
- reference
- code
---
# De Bruijn Levels (`NF.Value`)

`src/elaboration/normalization/syntax/term.ts`: bound variables in values are **`{ type: "Bound"; lvl: number }`** (field name `lvl`).

- **Rigid neutral** — `NF.Constructors.Rigid(l)` is `Neutral(Var(Bound l))`; `EB.bind` / `EB.augment` initialize new env slots with `NF.Constructors.Rigid(env.length)` (`context.ts`).
- **Quoting under binders** — `NF.quote` applies abstractions with `NF.apply(binder, closure, NF.Constructors.Rigid(lvl))` and recurses at `lvl + 1` for λ/Π/µ (`quoting.ts`); Σ uses `binder.annotation` instead of `Rigid` for that apply step.

Levels index binders by absolute depth at introduction; indices (`EB`) encode distance-to-binder from the inner scope.

See also: [[de-bruijn.md]], [[levels-vs-indices.md]], [[level-to-index-conversion.md]], [[quoting.md]].
