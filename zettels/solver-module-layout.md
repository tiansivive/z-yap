---
tags:
  [
    verification,
    infrastructure,
    planned,
    reference,
    backend,
    compiler,
    sat,
    normalization,
    mir,
    migration,
    project,
    tooling,
    testing,
    milestone,
    principle,
    pattern,
    drift,
  ]
---
# Solver module layout (planned)

Authoritative sketch: `docs/SMT-SOLVER.md` §Internal module layout.

Proposed tree `src/verification/solver/` with `ir.ts`, `normalize.ts`, `skolem.ts`, `cnf.ts`, `solver.ts`, `context.ts`, `trail.ts`, `explain.ts`, plus `euf/`, `arithmetic/`, `strings/`, `rows/`, `quantifiers/` subfolders—matching that doc verbatim.

Repo state: no `src/verification/solver/` directory yet; solving today goes through `z3-solver` in tests (`src/verification/__tests__/check.test.ts`) and `src/elaboration/module.ts` (`solver.add(artefacts.vc.eq(true))`).

Layering intent from doc: VC utilities independent of SAT internals; theories plug into shared literal interfaces.
