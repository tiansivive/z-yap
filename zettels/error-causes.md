---
tags:
  [
    error-handling,
    elaboration,
    inference,
    unification,
    verification,
    problem,
    mechanism,
    display,
    row-types,
    modality,
    infrastructure,
    implemented,
  ]
---
# Error causes (`Err.Cause`)

Defined in `src/elaboration/shared/errors.ts` as `Cause`:

- `UnificationFailure`, `RigidVariableMismatch`, `RowMismatch`, `MissingLabel`, `TypeMismatch`, `Impossible`, `MultiplicityMismatch`.

`Errors.display(cause, zonker, metas)` stringifies via `NF.display` and row `R.display` (for `RowMismatch`). It does not append provenance.

Elaboration failures carried as `Err` in `src/elaboration/shared/monad.v2.ts` extend `Cause` with `provenance?: P.Provenance[]` and `ctx: EB.Context`. `V2.display(err)` calls `Errors.display` on the cause, then optional `P.display` for the trace.

`V2.fail(cause)` builds a `Left` of that enriched `Err` (see error-propagation zettel).
