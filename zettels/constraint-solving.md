---
tags: [mechanism, type-system, elaboration]
---
# Constraint Solving

Deferred constraint solving in yap's elaboration pipeline. Constraints are collected during inference and solved per let-binding.

The flow:
1. **Collection** — during inference/checking, unsolved equalities become constraints (meta-variable equations)
2. **Solving** — at let-binding boundaries, constraints are solved via first-order unification
3. **Generalization** — unsolved metas after solving become universally quantified (let-polymorphism)
4. **Zonking** — the solved substitution is applied lazily via the context's zonker

This deferred approach enables polymorphism — constraints from different usage sites are collected and solved together, finding the most general solution.
