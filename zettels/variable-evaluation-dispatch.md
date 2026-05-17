---
tags:
  [
    normalization,
    elaboration,
    mechanism,
    implemented,
    ast,
    ffi,
    unification,
    inference,
    syntax,
    dependent,
    row-types,
    modality,
    runtime,
    continuation,
  ]
---
# Variable evaluation dispatch

`evaluateTerm` in `src/elaboration/normalization/evaluation.v2.ts` matches `EB.Term` `Var` shapes:

- **Label** — `ctx.sigma[name]` supplies cached `nf` or evaluates `term`.
- **Free** — `ctx.imports[name]`; extends env with a let binder, pushes `Cont` to assign `entry.nf` after eval (knot).
- **Meta** — `skolems[val]` from `V2.MutState` re-queues eval of the skolem term; else if `ctx.zonker[val]` missing pushes `Neutral(Var meta)`; else `NF.quote` the zonked value and eval the quote.
- **Bound** — env entry: if binder head is `Mu`, pushes `Neutral(entry.nf)`; else pushes `entry.nf`.
- **Foreign** — `ctx.ffi[name]`; arity 0 runs `compute()`, else `NF.Constructors.External(…)`.
