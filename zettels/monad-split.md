---
tags:
  [
    elaboration,
    monad,
    problem,
    speculative,
    inference,
    migration,
    infrastructure,
    drift,
    normalization,
    unification,
    verification,
    lowering,
    continuation,
  ]
---
# Monad split

`Elaboration` folds reader (`EB.Context`), writer-like accumulation (`Collector`), and mutable `MutState` into one yield protocol (`src/elaboration/shared/monad.v2.ts`). Channels (`tell`) couple constraint emission, meta registry, zonker updates, and type annotations in one collector merge path (`concat` merges writers; zonker uses `Sub.compose`).

Unverified roadmap detail: splitting into narrower interpreters or layered capabilities would be a later refactor if inference, solver wiring, and provenance tracing need independent evolution—the codebase today does not expose a second elaboration monad.
