---
tags:
  [
    elaboration,
    unification,
    mechanism,
    implemented,
    inference,
    normalization,
    syntax,
    ast,
    ir,
    display,
    error-handling,
    dependent,
    verification,
    tooling,
    type-system,
    migration,
  ]
---
# Zonking

`EB.Context["zonker"]` has type `Sub.Subst`: `Record<number, NF.Value>` branded for substitutions (`src/elaboration/unification/substitution.ts`). It maps metavar keys to solved normal forms.

Updates merge via `Sub.compose(newer, old)` / record spreads—see `V2.tell("zonker", …)` in `monad.v2.ts` (composer `(zk, z) => Sub.compose(zk, z)` against current ctx), `solver.ts` (`Sub.compose(subst, z)` after solving), `inference/statements.ts`, `module.ts`, and similar paths.

Consumers: meta evaluation path quotes `NF.quote(ctx, …, ctx.zonker[variable.val])` then re-evaluates (`evaluation.v2.ts`); `NF.quote` and `NF.display`/`NF.doc` read zonker for metas; `EB.Display.Term` shows zonked metas through `NF.doc`.
