---
tags:
  [verification, sat, mechanism, implemented, backend, ir, reference, project, milestone, lowering, inference, arithmetic, codegen, principle, problem, ffi]
---
# Boolean lowering (CNF)

**Implemented (M1):** `src/verification/solver/cnf.ts` performs Tseitin-style CNF transformation. Theory atoms stay opaque as integer-indexed variables; boolean connectives (And, Or, Not, Implies, Iff) become definitional clause blocks with fresh proxy variables. The proxy for the root formula is asserted. Output feeds directly into the CDCL core ([[cdcl-t-solver]]).
