---
tags:
  [
    verification,
    row-types,
    dependent,
    planned,
    needs-design,
    mechanism,
    sat,
    normalization,
    inference,
    reference,
    backend,
    compiler,
    migration,
    pattern,
    principle,
    performance,
    tracing,
  ]
---
# Row theory (solver)

Specification target in `docs/SMT-SOLVER.md` §Rows (not implemented under `src/verification/solver/`—that directory does not exist in-repo).

Intended representation sketch: `RowTerm` as label→`VC.Term` map plus optional tail name; normalize extensions (canonical label order, overwrite collapse), solve equality/containment by label decomposition, propagate field obligations, unify tails for open rows.

Explicit design choice there: avoid encoding rows as a generic boxed-array theory; align solver with verifier containment walks (`subtype.contains()`).

Current code gap noted in same doc and visible in `src/verification/V2/logic/translate.ts`: row literals error out during translation.
