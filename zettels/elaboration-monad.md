---
tags:
  [
    mechanism,
    pattern,
    monad,
    elaboration,
    code,
    inference,
    unification,
    tracing,
    error-handling,
    continuation,
    performance,
    implemented,
  ]
---
# Elaboration monad (V2)

Type (`src/elaboration/shared/monad.v2.ts`):

`Elaboration<A> = (ctx: EB.Context, w?, st?) => [Collector<A>, MutState]`

**Reader:** `ctx` threaded per step; `ask`, `asks`, `local`.

**Writer (`Collector`):** merges `constraints` (provenance-wrapped), `binders`, `metas`, per-term `types`, composed `zonker` `Subst`, and `Either` result.

**Mutable state (`MutState`):** `delimitations` (shift/reset), `skolems`, `nondeterminism.solution` — not the meta counter. Fresh meta IDs live in module `counts` (`shared/supply.ts`).

**Either:** `fail` yields `Left` with `Cause` + `ctx.trace`; `Do` stops on first `Left`.

**Channels:** `tell` supports `constraint` \| `binder` \| `meta` \| `type` \| `zonker`. `listen` returns the accumulated writer slice.

Usage pattern: `V2.Do(function* () { const ctx = yield* V2.ask(); … yield* V2.tell("constraint", { type: "assign", left, right }); … })`.
