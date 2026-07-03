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

Elaboration v2 threads effects through `V2.Elaboration<A>` (`src/elaboration/shared/monad.v2.ts`): a function `(ctx, w?, st?) => [Collector<A>, MutState]`. The `Collector` holds `constraints`, `binders`, `metas`, `types` (term id → nf + modalities), `zonker` (meta substitution compose), and `Either` `result`. `MutState` holds `delimitations` and `nondeterminism`.

`V2.Do` runs a generator that `yield`s nested `Elaboration` steps. `ask` / `local` reader on `EB.Context`; `tell` multiplexes channels (`"constraint"` | `"binder"` | `"meta"` | `"type"` | `"zonker"`) into the writer-shaped collector; `getSt` / `putSt` / `modifySt` update `MutState`. The verification solver replicates the pattern (`verification/solver/v2/core.ts`: `Solver<A>`, `G<A>`, `Do`).

## Typing the yield protocol

TypeScript gives a generator one resume type (TNext) for every `yield` in its body, but the Do driver resumes each yield with the result of the effect just yielded — a per-yield type TS cannot express. The working discipline:

- **Single-effect primitives type precisely**: a leaf that yields exactly one `Eff<A>` is `Generator<Eff<A>, A, A>` (`Prim<A>` in the solver core; `ask`/`listen`/`pure` in elaboration). The bare `yield` then resumes as `A`, not `any`.
- **Composites keep TNext `any`** — deliberately. `yield*` delegation requires the *outer* TNext to be assignable to each *inner* TNext; `any` satisfies all of them, while an "honest" `never` breaks every caller. The `any` never escapes: user code reaches effects through `yield*` into precisely-typed leaves.
- **Never `yield` an effect bare in user code** — the resume is `any`. Wrap it: `yield* pure(effect)`.
- **Beware circular inference**: `pure(inlineLambda)` collapses `A` to `unknown`/`any` when the lambda's return needs `A` contextually (e.g. a tuple return). Annotate the effect (`const eff: Elaboration<void> = …`) before lifting.
- The driver's own `it.next(value)` is the one irreducibly untyped point; it carries a documented lint disable and the drivers are lint-carved as sanctioned imperative cores ([[lint-governance]]).

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[elaboration-monad]] — Generator yield protocol
- ENCODES → [[elaboration-monad]] — RWSE as generator

**Incoming**
- [[elaboration-monad]] ← PROPAGATES_VIA — Generator yield protocol
- [[elaboration-monad]] ← WRAPS — ReaderWriterStateEither algebraic structure
- [[elaboration-v2.thread]] ← INCLUDES

<!-- connections:end -->
