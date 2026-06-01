---
tags:
  - verification
  - normalization
  - sat
  - ivl
  - planned
  - needs-design
  - ir
  - backend
  - arithmetic
  - compiler
---
# Design: VC normalization pass

Determine the scope and implementation of formula simplification between VC emission and boolean lowering in the verification pipeline.

VC normalization sits between `translate.ts` (which emits IVL formulas from bidirectional checking) and Tseitin CNF lowering. Its role: reduce formula size and structural complexity before the solver sees clauses. Simplifications include double negation elimination, flattening nested connectives, constant folding, vacuous quantifier removal, guard simplification, and canonicalization of arithmetic atoms into linear normal form.

The design must settle: which rewrites are equivalence-preserving vs merely equisatisfiable, ordering of rewrite passes, integration point in the pipeline (before or after Skolemization), and whether normalization should be configurable (cf. the existing `simplify` toggle).

See [[vc-normalization]] for the concept analysis.
