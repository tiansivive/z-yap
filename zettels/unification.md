---
tags:
  [
    type-system,
    elaboration,
    normalization,
    unification,
    inference,
    verification,
    dependent,
    row-types,
    concept,
    reference,
    compiler,
    implemented,
  ]
---
# Unification

Hub for metavariable equality on **`NF.Value`** (**`src/elaboration/unification/unification.ts`**) and row unification (**`src/elaboration/unification/rows.ts`**), driven in batch by **`solve`** (**`src/elaboration/solver/solver.ts`**).

**Pipeline position**: inference/checking emit **`assign` / `resolve`** constraints (**`Constraint`** in **`solver.ts`**); **`solve` → `U.unify` → `Subst`**, then **`resolve`** against **`NF.force`** goals. **`module.ts`** **`expression`** composes returned **`zonker`** into context and feeds **`NF.generalize` / `NF.instantiate`** with **`resolutions`**.

**Core pieces** (detail zettels):

- **flex–flex / flex–rigid** — flex-flex-unification.md, flex-rigid-unification.md
- **occurs guard on `bind`** — occurs-check.md
- **μ / `App` unfold** — mu-type-unification.md
- **rows + `rewrite`** — row-unification.md, row-rewriting.md, row-unification-mechanism.md
- **`Subst`** — substitution-system.md
- **solver batching + implicits** — solver.md, solver-dispatch.md
- **full case inventory** — unification-algorithm.md

**Effects on context**: **`unify`** composes **`Sub.compose(subst, ctx.zonker)`** before **`NF.force`**; **`Mu`/`EB.unfoldMu`** uses **`V2.local`** so env length reflects μ binding during sub-calls.

<!-- connections:start -->

## Connections

**Outgoing**
- SOLVES → [[meta-variables]] — Unification resolves metas to concrete types
- USES → [[mu-types]] — Unfolds mu during structural comparison
- EXTENDS → [[row-polymorphism]] — Row rewriting extends Robinson unification for row types

**Incoming**
- [[meta-variables]] ← RELIES_ON — Metas are solved by unification
- [[implicits]] ← RELIES_ON — Unification-driven resolution solves implicit metas
- [[elaboration-monad]] ← USES — Monad writer accumulates constraints consumed by unification
- [[constraint-solver]] ← USES — Assign constraints → unify
- [[whnf-vs-full-normalization]] ← CONSTRAINS — Full NF in unification
- [[equirecursive-types]] ← PRESERVES — Type equality under finite unfolding
- [[abel-pientka]] ← INFORMS — Pattern fragment analysis
- [[unification-algorithm]] ← IMPLEMENTS — Core algorithm
- [[logic-programming]] ← USES — Relational reasoning via unification
- [[euf-theory]] ← RESOLVES — Congruence propagation
- [[nu-types]] ← RELIES_ON — Shares mu's unification infrastructure
- [[bisimulation-type-equality]] ← EXTENDS — Would replace ad-hoc mu unfolding
- [[gadts]] ← USES — Index unification during matching
- [[type-level-computation]] ← USES — Type equality for computed types
- [[dependent-pattern-matching]] ← REQUIRES — Index unification during matching
- [[with-abstraction]] ← USES — Type equalities from with-matching
- [[case-tree-elaboration]] ← USES — Index unification during splitting
- [[open-closed-variants]] ← USES — Row solving determines open/closed
- [[property-based-testing]] ← TARGETS

<!-- connections:end -->
