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

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[meta-variables]] — Monad state component manages the meta store
- USES → [[unification]] — Monad writer accumulates constraints consumed by unification
- ENABLES → [[shift-reset]] — Via MutState.skolems
- THREADS_THROUGH → [[elaboration-context]] — Reader component
- PROPAGATES_VIA → [[generator-monad]] — Generator yield protocol
- WRAPS → [[generator-monad]] — ReaderWriterStateEither algebraic structure
- DELEGATES_TO → [[nondeterminism]] — MutState for skolems, metas
- ENABLES → [[elaboration]] — Monadic pipeline
- ENABLES → [[v2-elaboration-pipeline]] — V2 pipeline
- THREADS_THROUGH → [[meta-variables]] — MutState manages meta store

**Incoming**
- [[continuation-binders]] ← THREADS_THROUGH — Via MutState
- [[elaboration-context]] ← THREADS_THROUGH — Reader component
- [[monad-split]] ← REVISES — Addresses coupling
- [[generator-monad]] ← IMPLEMENTS — Generator yield protocol
- [[generator-monad]] ← ENCODES — RWSE as generator
- [[lean-4-influence]] ← INSPIRES — Pipeline discipline
- [[context-operations]] ← THREADS_THROUGH — All phases
- [[error-propagation]] ← PROPAGATES_VIA — V2.fail + yield
- [[v2-track]] ← EXTENDS — Trace extension
- [[test-utility]] ← USES — V2.Do pipeline
- [[meta-variables]] ← THREADS_THROUGH — MutState.supply, ctx.metas
- [[nondeterminism-multishot]] ← THREADS_THROUGH — MutState.nondeterminism
- [[nondeterminism]] ← THREADS_THROUGH — MutState.nondeterminism.solution
- [[elaboration-v2.thread]] ← INCLUDES
- [[module-zonker-fix]] ← FIXES — Told zonker dropped by listen()
- [[default-context-substitution-aliasing.bug]] ← REVEALS — Metacontext on the reader env is writable by anyone holding a context
- [[effects-migration-regression-closure.session]] ← FIXES — Abstract quoting order and evalMode reader

<!-- connections:end -->
