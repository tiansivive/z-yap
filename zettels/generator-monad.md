---
tags:
  [
    elaboration,
    monad,
    inference,
    mechanism,
    decision,
    implemented,
    continuation,
    tracing,
    code,
    unification,
    verification,
    migration,
  ]
---
# Generator monad

Elaboration v2 threads effects through `V2.Elaboration<A>` (`src/elaboration/shared/monad.v2.ts`): a function `(ctx, w?, st?) => [Collector<A>, MutState]`. The `Collector` holds `constraints`, `binders`, `metas`, `types` (term id → nf + modalities), `zonker` (meta substitution compose), and `Either` `result`. `MutState` holds `delimitations`, `skolems`, and `nondeterminism`.

`V2.Do` runs a generator that `yield`s nested `Elaboration` steps. `ask` / `local` reader on `EB.Context`; `tell` multiplexes channels (`"constraint"` | `"binder"` | `"meta"` | `"type"` | `"zonker"`) into the writer-shaped collector; `getSt` / `putSt` / `modifySt` update `MutState`.
