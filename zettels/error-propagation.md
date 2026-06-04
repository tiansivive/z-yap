---
tags:
  [
    monad,
    elaboration,
    error-handling,
    inference,
    mechanism,
    continuation,
    tracing,
    pattern,
    code,
    performance,
    tooling,
    implemented,
  ]
---
# Error propagation (`V2.fail`, `V2.Do`)

`Elaboration<A>` in `src/elaboration/shared/monad.v2.ts` is a function returning `[Collector<A>, MutState]`; `Collector` holds `constraints`, `binders`, `metas`, `types`, `zonker`, and `result: Either<Err, A>`.

`fail` is a generator step:

```ts
export const fail = function* <A>(cause: Cause): Generator<Elaboration<any>, A, any> {
	const ctx = yield* ask();
	return yield* liftE(E.left({ ...cause, provenance: ctx.trace, ctx }));
};
```

It snapshots `ctx.trace` into `provenance` and embeds full `ctx` for `V2.display`.

`Do` loops on `yield`ed elaborations; on `E.isLeft(ma.result)` it returns immediately (“short-circuit on first error”) without consuming the rest of the generator.

Side channels (`tell` for constraints, binders, metas, types, zonker) merge via `concat` until a `Left` appears; the returned `Collector` on error is the one that first went `Left`.

`track(provenance, ma)` prefixes provenance onto `ctx.trace` for nested `ask`/`fail` contexts.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[error-causes]] — Lifts into monad
- USES → [[provenance-system]] — Carries trace
- PROPAGATES_VIA → [[elaboration-monad]] — V2.fail + yield

**Incoming**
- [[provenance-system]] ← ENABLES — Meaningful errors need context

<!-- connections:end -->
