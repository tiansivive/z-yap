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

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[error-propagation]] — Meaningful errors need context
- THREADS_THROUGH → [[elaboration-context]] — ctx.trace stack
- THREADS_THROUGH → [[bidirectional-checking]] — Checking/inference trace

**Incoming**
- [[error-propagation]] ← USES — Carries trace
- [[v2-track]] ← IMPLEMENTS — Track function
- [[provenance-display]] ← USES — Stack rendering
- [[milestone-5-explanations]] ← COMPOSES_WITH — End-to-end error reporting
- [[verification-pipeline]] ← REPORTS — Provenance-annotated failures
- [[explorer-provenance-trace]] ← USES — Renders provenance stack as tree

<!-- connections:end -->
