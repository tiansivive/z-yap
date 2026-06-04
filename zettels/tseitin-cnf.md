---
tags:
  - verification
  - sat
  - mechanism
  - implemented
  - reference
  - ir
  - milestone
  - solver
---
# Tseitin CNF transformation

Introduces fresh proxy Booleans sub-formula by sub-formula so every connective becomes a small definitional clause block; the proxy for the root is asserted. The output CNF is **equisatisfiable** with the input formula, not logically equivalent unless you expose all equivalences.

Worst-case size grows **linearly** in formula size versus naïvely distributing connectives across clauses (**exponential** blowup).

**Yap:** Implemented in `src/verification/solver/cnf.ts` (`tseitin`). Invoked from `solver.ts` after normalization and Skolemization; proxy variables feed the CDCL core ([boolean lowering to CNF](boolean-lowering-cnf.md), [[cdcl-t-solver]]). See [[m1-implementation]].

<!-- connections:start -->

## Connections

**Incoming**
- [[m1-implementation]] ← USES — Tseitin algorithm used in cnf.ts

<!-- connections:end -->
