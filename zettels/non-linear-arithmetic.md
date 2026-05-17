---
tags:
  [verification, arithmetic, decision, planned, normalization, ast, backend, reference, project, inference, sat, ffi, milestone, elaboration, dependent, syntax]
---
# Non-linear arithmetic

**Surface / VC emission:** Primitives `$mul`, `$div`, `$mod` exist (`src/shared/lib/primitives.ts`) and reach Z3 through `translate.ts` `External` handling.

**Solver policy (design):** `docs/SMT-SOLVER.md` states full non-linear arithmetic is a separate project; keep `*`, `/`, `%` in VC IR; support linearizable cases first; rely on aggressive NbE ground folding so non-linear atoms are rarer.

**In-house solver:** No `src/verification/solver/arithmetic/` implementation to inspect. **Current backend:** Z3 handles non-linear reals/ints according to its own engines, not a Yap-controlled partition of linear vs non-linear.
