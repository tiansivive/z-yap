---
tags:
  - backlog
  - improvement
  - verification
  - ivl
  - solver
  - compiler
---

# Vacuous IVL verification conditions

Most explorer snippets produce VCs that are tautologies: `(= x x)`. These are well-formed — the verification pipeline correctly generates and validates them — but carry no real verification content.

**Cause:** Selfification (`src/verification/V2/utils/refinements.ts`) wraps bound variables with `λv. v = term`. For a bound variable referencing itself, β-reduction yields `x = x`. Types without liquid annotations get a neutral predicate `λ_. true` which simplification strips, leaving only the reflexive equalities.

**Impact:** No bugs. The solver trace tab shows green checkmarks that add no assurance. Becomes meaningful when liquid annotations, pre/post conditions, or refinement assertions are present.

**Improvement:** Strip reflexive `(= t t)` in `Build.simplify` (`src/verification/solver/ivl/build.ts`) — detect structurally equal operands and replace with `true`.
