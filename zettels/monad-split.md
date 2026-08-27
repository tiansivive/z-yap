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

One future direction: split reader, writer, and mutable state into narrower interpreters or layered capabilities if inference, solver wiring, and provenance tracing need independent evolution. Today a single `Elaboration` monad covers all three channels.

<!-- connections:start -->

## Connections

**Outgoing**
- REVISES → [[elaboration-monad]] — Addresses coupling
- FIXES → [[default-context-substitution-aliasing.bug]] — Per-run registry state leaves no shared substitution to write through

**Incoming**
- [[elaboration-v2.thread]] ← INCLUDES
- [[solver-meta-threading]] ← DEFERS_TO — The real fix is threaded State, making new metas visible to every step at any depth

<!-- connections:end -->
