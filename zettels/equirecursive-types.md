---
tags:
- type-system
- recursion
- incomplete
- elaboration
- normalization
- unification
- concept
- mechanism
- problem
- inference
- solver
- performance
- testing
- decision
- drift
---
# Equirecursive types (μ in Yap)

**Intended meaning:** μ binds a recursive type operator without fold/unfold in surface syntax; elaboration treats `Mu` as a first-class `Abs` binder (`src/elaboration/syntax/term.ts`, `normalization/syntax/term.ts`).

**Verified behavior**

- **Unification-driven unfolding:** `src/elaboration/unification/unification.ts` unfolds μ when comparing against non-μ values and uses `NF.unfoldMu` on rigid applications where applicable (`src/elaboration/normalization/recursion.ts`).
- **Evaluation stance:** reduction defers μ-head apps per `normalization/ARCHITECTURE.md` (neutral wrapping); stack evaluator implements the Mu binder path in `evaluation.v2.ts`.
- **Fuel:** `NF.evaluate` takes `maxSteps` default `10000000`; exceeding it throws (`src/elaboration/normalization/evaluation.v2.ts`)—this caps pathological loops but is engineering policy, not a proof of decidability.

**Verified gaps**

- **Occurs-check solutions:** meta binding throws instead of constructing μ (`bind` in `unification.ts`).
- No separate bisimulation / Amadio–Cardelli-style equivalence module appears in `src/elaboration/`—congruence is whatever `unify` + evaluation implement today.

Treat full equirecursive **theory** as open; treat **implementation** as the files above.

Related: [[mu-types.md]], [[mu-type-unification.md]], [[whnf-vs-full-normalization.md]], [[missing-spec-recursive-types.md]].
