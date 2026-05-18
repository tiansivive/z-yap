---
tags:
  - verification
  - sat
  - mechanism
  - planned
  - milestone
---
# Congruence closure (EUF support)

Maintains equivalence classes over EUF ([EUF theory](euf-theory.md)) ground terms via union-find annotated with canonical representatives plus an inverse map from subterms back to enclosing applications (**parents**).

Key **congruence lemma**: whenever `ai ≡ bi` for all positions `i`, then `f(a1,…,an) ≡ f(b1,…,bn)`; after each `merge`, scan parent applications for newly implied equalities (**parent propagation / congruence explosions**) until quiescence.

Produces **minimal explanation sets** tracing a derived equality to user merge operations (the Nelson–Oppen / SCC style justification sets used later by theory lemmas). Planned home in `src/verification/solver/euf/` per `docs/SMT-SOLVER.md`; see also [nelson-oppen.md](nelson-oppen.md) for combining theories.
