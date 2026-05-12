---
tags: [mechanism, type-system, elaboration]
---
# Unification

First-order unification in Yap's [[elaboration]]. Core algorithm is Robinson-style with extensions:

- **Row rewriting** — label permutation and tail unification for structural [[row-polymorphism|row types]]
- **[[mu-types|Mu-type]] unfolding** — equi-recursive types unfolded during unification (not during elaboration)
- **Occurs check** — prevents infinite types (unless mu-wrapped)
- **Flex-flex** — two unsolved [[meta-variables|metas]] unify by equating them
- **Flex-rigid** — meta solved to the rigid term (after occurs check)

Runs after elaboration produces constraints. Performs full normalization (unlike elaboration which stays at WHNF). The result: a substitution mapping metas to their solutions.
