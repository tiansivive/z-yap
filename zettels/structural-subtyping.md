---
tags:
- concept
- type-system
- mechanism
- rejected
- elaboration
- unification
- row-types
- reference
- principle
- decision
- inference
- normalization
- parser
- migration
- ffi
---
# Structural subtyping

**Definition (general PL literature):** a directional judgment **A <: B** justified by shape (extra fields allowed, required fields satisfied), independent of type aliases/names.

**Yap:** there is **no** structural subtyping judgment or width subsumption pass in `src/elaboration/check.ts`, `infer`, or `unification/unification.ts`. Compatibility is **equality-oriented**: unify `NF.Value`/`NF.Row`, possibly instantiating **row metavariables** (`src/elaboration/unification/rows.ts`), not silently forgetting fields via <:.

**Flexibility mechanism (verified):** parametric row variables and extension unification (`Row.unify`, `bind` on row metas) give “open row” behaviour without subtyping—see [[row-polymorphism.md]], [[row-unification.md]].

**Contrast:** [[nominal-subtyping.md]] (name-driven) vs this zettel (subtyping-as-lattice). Yap’s nominal story, if any, is elsewhere; absence of <: is the verified claim here.
