---
tags:
- decision
- nbe
- normalization
- elaboration
- evaluation
- implemented
- inference
- unification
- dependent
- recursion
---
# WHNF vs full normalization

`NF.evaluate` is a single evaluator with no reduction-depth switch — it reduces until the semantic domain blocks further progress. What looks like weak head normal form is emergent: some terms cannot reduce further because their head is unknown.

Terms that stay "weak" (unreduced under binders or with stuck heads):
- **Neutral metas**: unsolved meta-variables produce `Neutral(Var(meta))` — computation is stuck until the meta is solved.
- **Neutral free variables**: rigid variables from binders — no reduction possible.
- **Mu application**: mu-binder Abs produces neutral App rather than unfolding, preventing infinite expansion.
- **Partial externals**: foreign functions with fewer arguments than their arity stay as partial `External` values.

The consequence: unification and inference share the same evaluator. Normalization depth is whatever the evaluator achieves for each head. If a term's head is known (a closure, a literal), it reduces. If it's unknown (a meta, a free variable), it stays neutral. The evaluator doesn't decide; the semantic domain does.

This design is simpler than an evaluator with configurable reduction depth, at the cost of not being able to "stop early" for performance. The evaluation-step-limit provides the engineering safety net against non-termination.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[elaboration]] — WHNF only in elab
- CONSTRAINS → [[unification]] — Full NF in unification
- CONSTRAINS → [[trampoline-evaluator]] — Evaluation depth
- RELIES_ON → [[neutrals]] — WHNF is emergent from neutral blocking
- RELIES_ON → [[mu-types]] — Mu stays neutral
- RELIES_ON → [[evaluation-step-limit]] — Safety net for one-evaluator design

**Incoming**
- [[whnf-codification]] ← ADDRESSES — Formalize the WHNF boundary
- [[lambda-synthesis-fix]] ← USES — Quotes NF.Value at correct de Bruijn level
- [[nbe]] ← INCLUDES — One evaluator, emergent WHNF

<!-- connections:end -->
