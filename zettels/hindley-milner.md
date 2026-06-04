---
tags:
- concept
- type-system
- mechanism
- unification
- elaboration
- inference
- incomplete
- reference
- monad
- constraint
- generalization
- row-types
- dependent
- solver
- migration
---
# Hindley–Milner (and what Yap actually does)

Classic HM: principal types for the rank‑1 polymorphic λ-calculus via Robinson unification and **let-polymorphism** (generalize at `let`).

**Verified Yap overlap**

- **Unification on normal forms:** `src/elaboration/unification/unification.ts` (`unify`) dispatches on `NF.Value` shape (including Pi, Sigma, Mu, App, Row).
- **Row metavariable solving:** `src/elaboration/unification/rows.ts` extends unification with scoped-label row rewriting (meta rows unify against extensions/empty).
- **Let-polymorphism-style generalization:** `src/elaboration/normalization/generalization.ts` replaces eligible metas with bound variables and wraps the type in (implicit) Pi binders; `src/elaboration/inference/statements.ts` `letdec` runs constraint solving (`EB.solve`) then `NF.generalize` / `NF.instantiate`.

**Verified divergence from “pure HM”**

- Full **dependent** typing: Pi domains are arbitrary `NF.Type`‑classified terms, not only simple types (`src/elaboration/inference/pi.ts`, `check.ts`).
- **Surface pipeline** is bidirectional inference + checking in the V2 elaboration monad (`src/elaboration/elaborate.ts`, `shared/monad.v2.ts`), not a standalone HM reconstruction.
- **`src/elaboration/infer.ts`** is stubbed; entry is `EB.infer` in `elaborate.ts`.

Use this zettel as background reading; precise algorithms live under [[unification.md]], [[row-unification.md]], and [[generalization.md]].

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[generalization]] — Let-polymorphism theory
- INFORMS → [[meta-variables]] — Unification-based inference

**Incoming**
- [[yap]] ← EXTENDS — HM + row variables + dependent types
- [[row-polymorphism]] ← EXTENDS — Parametric extension via row variables
- [[generalization]] ← IMPLEMENTS — Yap's implementation of HM let-generalization
- [[system-f]] ← INFORMS — Explicit polymorphism

<!-- connections:end -->
