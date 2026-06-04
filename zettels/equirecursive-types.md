---
tags:
- type-system
- recursion
- incomplete
- needs-design
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
- **Evaluation stance:** `evaluation.v2.ts` wraps μ-head apps as neutral without unfolding on that step; stack evaluator implements the Mu binder path in the same module.
- **Fuel:** `NF.evaluate` takes `maxSteps` default `10000000`; exceeding it throws (`src/elaboration/normalization/evaluation.v2.ts`)—this caps pathological loops but is engineering policy, not a proof of decidability.

**Verified gaps**

- **Occurs-check solutions:** meta binding throws instead of constructing μ (`bind` in `unification.ts`).
- Congruence today is whatever `unify` + `evaluation.v2.ts` implement; a dedicated bisimulation / Amadio–Cardelli-style equivalence layer could be explored on top of that core.

Treat full equirecursive **theory** as open; treat **implementation** as the files above.

Related: [[mu-types.md]], [[mu-type-unification.md]], [[whnf-vs-full-normalization.md]], [[missing-spec-recursive-types.md]], [[bisimulation-type-equality]], [[nu-types]], [[inductive-types]], [[coinductivity]].

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[mu-types]] — Beyond simple unfolding
- REVISES → [[mu-type-unification]] — Toward full bisimulation
- PRESERVES → [[unification]] — Type equality under finite unfolding
- REWRITES → [[mu-types]] — Unfold-and-recurse during unification
- DETECTS → [[nbe]] — Infinite unfolding (step limit)
- DELEGATES_TO → [[mu-type-unification]] — Checking delegation

**Incoming**
- [[termination-checking]] ← EXTENDS — Guardedness
- [[mu-type-unification]] ← IMPLEMENTS — Current approach
- [[recursion.thread]] ← INCLUDES
- [[nu-types]] ← USES — Extends equirecursive machinery with polarity
- [[bisimulation-type-equality]] ← ADDRESSES — Principled equality for recursive types
- [[sized-types]] ← ADDRESSES — Bounds unfolding depth type-theoretically
- [[inductive-types]] ← CONTRASTS_WITH — Well-founded vs equirecursive
- [[indexed-families]] ← CONTRASTS_WITH — Strict positivity vs equirecursion
- [[type-level-computation]] ← CONSTRAINS — Step budget limits computation

<!-- connections:end -->
