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

**Yap:** elaboration uses **equality and unification** only — `src/elaboration/check.ts`, `infer`, and `unification/unification.ts` compare types by unifying `NF.Value` / `NF.Row`, possibly instantiating **row metavariables** (`src/elaboration/unification/rows.ts`). Width subsumption via **A <: B** is not part of the core judgment.

**Flexibility mechanism (verified):** parametric row variables and extension unification (`Row.unify`, `bind` on row metas) give “open row” behaviour without subtyping—see [[row-polymorphism.md]], [[row-unification.md]].

**Contrast:** [[nominal-subtyping.md]] (name-driven hierarchy) vs this zettel (subtyping-as-lattice). Yap’s core elaborator is equality-oriented; Liquid checking in `src/verification/V2/subtype.ts` adds a separate structural subtyping pass for refinements.
