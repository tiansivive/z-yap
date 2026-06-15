---
tags:
  - verification
  - sat
  - mechanism
  - implemented
  - milestone
  - solver
  - unification
  - concept
---
# Congruence closure (EUF support)

Maintains equivalence classes over EUF ([EUF theory](euf-theory.md)) ground terms via union-find annotated with canonical representatives plus an inverse map from subterms back to enclosing applications (**parents**).

Key **congruence lemma**: whenever `ai ≡ bi` for all positions `i`, then `f(a1,…,an) ≡ f(b1,…,bn)`; after each `merge`, scan parent applications for newly implied equalities (**parent propagation / congruence explosions**) until quiescence.

Produces **minimal explanation sets** tracing a derived equality to user merge operations (the Nelson–Oppen / SCC style justification sets used later by theory lemmas). Implemented in `src/verification/solver/v2/euf/cc.ts`; see also [nelson-oppen.md](nelson-oppen.md) for combining theories.

<!-- connections:start -->

## Connections

**Incoming**
- [[m2-implementation]] ← IMPLEMENTS — CC in euf/cc.ts
- [[solver-trace]] ← RESOLVES — Enode IDs resolved to term names
- [[solver-v2-monadic-port.implementation]] ← IMPLEMENTS — v2 EUF registry/active state and CC port

<!-- connections:end -->
