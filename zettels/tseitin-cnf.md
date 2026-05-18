---
tags:
  - verification
  - sat
  - mechanism
  - planned
  - reference
  - ir
  - milestone
---
# Tseitin CNF transformation

Introduces fresh proxy Booleans sub-formula by sub-formula so every connective becomes a small definitional clause block; the proxy for the root is asserted. The output CNF is **equisatisfiable** with the input formula, not logically equivalent unless you expose all equivalences.

Worst-case size grows **linearly** in formula size versus naïvely distributing connectives across clauses (**exponential** blowup).

Planned lowering context: `docs/SMT-SOLVER.md` Pass 3 and [boolean lowering to CNF](boolean-lowering-cnf.md); target file sketch `src/verification/solver/cnf.ts` once the SAT core consumes clauses.
