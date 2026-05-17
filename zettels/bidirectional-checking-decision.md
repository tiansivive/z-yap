---
tags:
  [
    decision,
    elaboration,
    type-system,
    inference,
    dependent,
    row-types,
    modality,
    principle,
    pattern,
    migration,
    implemented,
  ]
---
# Bidirectional checking (design)

Split mirrors standard infer/check folklore: **`infer`** walks source constructors (`EB.*` modules under `src/elaboration/inference/`); **`check`** consumes an expected `NF.Value` so lambdas, structs against schemas/sigmas, and similar forms avoid gratuitous metavariables.

Concrete yap choices wired into `check.ts`: implicit-`Pi` heads insert an implicit lambda binder (`origin: "inserted"` via `EB.bind`) before recursing; modal types peel or delegate to liquid typing (`Liquid` import). Row-heavy checking aligns with structural dependent rows rather than nominal hooks.

Let-polymorphism after solves uses `NF.generalize` / `NF.instantiate` at `let` boundaries (`src/elaboration/inference/statements.ts`, `normalization/generalization.ts`).
