---
tags:
  [
    row-types,
    dependent,
    elaboration,
    inference,
    normalization,
    type-system,
    unification,
    context,
    mechanism,
    syntax,
    parser,
    implemented,
  ]
---
# Sigma bindings (`ctx.sigma`)

`Sigma` in `src/elaboration/shared/context.ts`: `{ term: EB.Term; nf: NF.Value; ann: NF.Value; multiplicity: Q.Multiplicity; isAnnotation?: boolean }`.

**Population:** `EB.extendSigma(ctx, label, value, isAnnotation?)` writes one key. `EB.Rows.inSigmaContext(row, f, isAnnotation?)` (`src/elaboration/inference/rows.ts`) `yield*`s `extract(row, lvl)` then `V2.local` reducing `entries(bindings)` with `extendSigma` before running `f`. Used from row inference (`infer`) and struct inference (`src/elaboration/inference/structs.ts` via `inSigmaContext` + `collect`). Checking path: `EB.Rows.inSigmaContext` / `collect` in `src/elaboration/check.ts` for row-like checking.

**Use:** `:label` source variables resolve through `lookup` → `ctx.sigma[name]` → `EB.Var` with `type: "Label"`. NbE reads `ctx.sigma` for label vars in `src/elaboration/normalization/evaluation.v2.ts`; `extendSigmaEnv` merges row values into sigma when reducing struct/schema-like values.

**Limitation:** comment in `rows.ts`: sigma should become a stack for nested row types — current map is flat.

There is no `checking.v2/` directory in-repo; sigma behavior is split across `check.ts`, `inference/rows.ts`, `inference/structs.ts`, and normalization as above.
