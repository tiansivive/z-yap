---
tags:
  [
    elaboration,
    row-types,
    dependent,
    inference,
    syntax,
    parser,
    mechanism,
    ast,
    normalization,
    unification,
    display,
    implemented,
  ]
---
# Label lookup (`:field`)

`lookup` in `src/elaboration/shared/context.ts`: when `Src.Variable` has `type === "label"`, the key is `variable.value` into `ctx.sigma`. On hit it returns `EB.Constructors.Var({ type: "Label", name: variable.value })` with that sigma entry’s `nf` and zero usages for indices. Comment in-file: labels use distinct syntax so they are resolved **before** bound-variable search (ordinary names do not shadow sigma keys).

On miss it throws `new Error(\`Label not found: …\`)` — not `Err.MissingLabel` from `errors.ts`.

`Err.MissingLabel` is used elsewhere for **row** shape mismatches (e.g. `src/elaboration/check.ts`, `src/elaboration/unification/rows.ts`, `src/elaboration/inference/projection.ts`, verification code under `src/verification/V2/`).

`EB.Display.Term` prints label variables as `` `:${name}` `` in `src/elaboration/pretty/pretty.ts`.
