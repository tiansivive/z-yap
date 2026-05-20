---
tags:
  [verification, sat, mechanism, implemented, backend, ir, reference, project, milestone, lowering, inference, arithmetic, codegen, principle, problem, ffi]
---
# Boolean lowering (CNF)

**Implemented (M1):** `src/verification/solver/cnf.ts` performs Tseitin-style CNF transformation. Theory atoms stay opaque as integer-indexed variables; boolean connectives (And, Or, Not, Implies, Iff) become definitional clause blocks with fresh proxy variables. The proxy for the root formula is asserted. Output feeds directly into the CDCL core.

**Legacy stack:** `VerificationServiceV2` still uses Z3-internal clause learning via `z3.adapter.ts` during transition. See [[m1-implementation]].
