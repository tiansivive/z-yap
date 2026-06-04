---
tags:
  [
    tracing,
    elaboration,
    monad,
    mechanism,
    implemented,
    error-handling,
    inference,
    code,
    performance,
    type-system,
    normalization,
    project,
    continuation,
  ]
---
# V2.track

Defined in `src/elaboration/shared/monad.v2.ts`:

```ts
track: <A>(provenance: P.Provenance | P.Provenance[], fa: Elaboration<A>) => Elaboration<A>
```

Implementation: copy context with `trace: ctx.trace.concat(provenance)`, run `fa` under that extended reader field; **no change** to success values aside from ordinary monadic accumulation.

Used from `src/elaboration/elaborate.ts` at top-level inference (wraps entire term inference in a `src`/`infer` provenance frame). Nested sites typically wrap smaller regions the same way so `V2.fail` can attach the stacked `ctx.trace` to `Err.provenance` for `display`.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[provenance-system]] — Track function
- EXTENDS → [[elaboration-monad]] — Trace extension
- THREADS_THROUGH → [[elaboration-context]] — Extends ctx.trace per step

<!-- connections:end -->
