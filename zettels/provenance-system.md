---
tags:
  [
    tracing,
    elaboration,
    mechanism,
    implemented,
    monad,
    normalization,
    unification,
    ast,
    type-system,
    code,
    reference,
    row-types,
  ]
---
# Provenance System

`src/elaboration/shared/provenance.ts` defines `Provenance` as a tagged union:

- `src` + `term` | `stmt` — Nearley surface syntax
- `eb` — elaboration term `EB.Term`
- `nf` — normal-form value `NF.Value`
- `alt` — pattern alternative `Src.Alternative`
- `unify` + `nf` (pair of `NF.Value`) or `row` (pair of `NF.Row`)

Each entry may carry optional `metadata`: `{ action: "checking"; against: NF.Value; description? }`, `{ action: "infer"; description? }`, `{ action: "unification" }`, or `{ action: "alternative"; type: NF.Value; motive: string }`.

`EB.Context` carries `trace: Provenance[]` (see `src/elaboration/shared/context.ts`). `V2.track` in `src/elaboration/shared/monad.v2.ts` concatenates new provenance onto `ctx.trace` for the nested elaboration run. On failure, `V2.fail` attaches `ctx.trace` to `Err.provenance`.

Constraints get traces copied at collection time (`addProvenance` maps constraints to `WithProvenance<EB.Constraint>` in `monad.v2.ts`).
