---
tags: [concept, type-system, elaboration, normalization, language]
---
# Mu-types (Equi-recursive)

Recursive types in Yap are equi-recursive — the `mu` binder is transparent (no explicit fold/unfold in surface syntax).

Phase-dependent unfolding semantics:
- **Elaboration/Evaluation**: mu is NOT unfolded. Evaluation produces WHNF and treats mu as a value constructor, preserving it.
- **[[unification|Unification]]**: mu IS unfolded for structural comparison. When comparing `mu x. F(x)` with a concrete type, unification unfolds one step: `F(mu x. F(x))`, then continues structurally.

Occurs check interaction: if [[unification]] would produce an infinite type ([[meta-variables|meta]] occurs in its own solution), the type is wrapped in mu rather than failing.

Guardedness/contractiveness not yet enforced — planned via coinduction/bisimulation equality (P1 roadmap item).
