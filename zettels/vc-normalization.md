---
tags:
  - verification
  - normalization
  - concept
  - sat
  - ir
  - ivl
  - principle
  - mechanism
  - arithmetic
  - compiler
  - backend
---
# VC normalization

VC normalization is a formula simplification stage in the verification pipeline, positioned between VC emission (from `translate.ts`) and boolean lowering (Tseitin CNF). Its role is to reduce formula size and structural complexity before the solver sees clauses.

## What normalization does

Algebraic cleanup: double negation elimination, flattening nested conjunctions/disjunctions, constant folding (trivial `true`/`false` propagation), vacuous quantifier removal, and guard simplification. These rewrites preserve logical equivalence (not just equisatisfiability) so the simplified formula remains faithful to the original obligation.

Normalization also canonicalizes arithmetic atoms into linear normal form (`c₁x₁ + c₂x₂ + … ≤ k`) so the simplex-based arithmetic theory receives uniform input regardless of how the VC was emitted.

## Why it matters

Without normalization, Tseitin encoding produces unnecessary proxy variables for structurally redundant sub-formulas, inflating the clause database and slowing BCP. Ground arithmetic that could be folded at formula level instead generates tableau rows the simplex solver must pivot through. The normalization pass is cheap relative to solving and pays for itself in reduced clause count.

## Relationship to Build.simplify

Smart constructors in `build.ts` enforce some invariants at construction time (e.g. `And(true, φ) = φ`). `Build.simplify` is a global toggle that gates these algebraic rewrites — turning it off preserves raw formula structure for debugging. Normalization as a pass operates after the full VC is assembled, complementing but not replacing build-time invariants.
