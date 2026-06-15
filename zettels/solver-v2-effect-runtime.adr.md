---
adr-id: D-008
tags:
  [
    adr,
    accepted,
    decision,
    verification,
    solver,
    sat,
    monad,
    generator,
    effect,
    tracing,
    migration,
    implementation,
    implemented,
  ]
refs:
  - src: src/verification/solver/v2/core.ts
    note: "Generator-interpreted RWSE runtime"
---
# Solver v2 effect runtime

**Decision:** Use a generator-interpreted RWSE runtime for the v2 solver. Reader carries immutable configuration and problem metadata; Writer carries trace, diagnostics, proof hooks, and stats; State carries CDCL, encoding, theory, quantifier, arena, assertion, and scope data; Either carries internal errors and invariants. `sat`, `unsat`, and `unknown` remain ordinary solver result values.

## Scope

This decision governs the additive v2 solver path under `src/verification/solver/v2`. It does not replace the existing solver entrypoints by itself, and it does not require every solver helper to become effectful. Pure algorithms remain pure when a local state-in/state-out shape is clearer.

## Rationale

The existing solver mixed generator trace output, pure state threading, and theory-local mutation. The v2 runtime makes those channels explicit without adopting a generic transformer stack: generator syntax gives linear solver code, while the interpreter owns the controlled mutable state needed for performance. Treating solver outcomes as values keeps ordinary satisfiability results separate from runtime failures such as unsupported features or invariant violations.

The shape also matches existing Yap architecture. Elaboration already uses generator-based monadic flow, and the deprecated lowering monad showed that an owned interpreter can compose Reader, Writer, State, and Either concerns without forcing every module into fp-ts transformer style.

## Consequences

Mutation is allowed only at explicit boundaries: the `Core.Do` interpreter, encapsulated solver-state modules, and the public incremental solver API. Trace events are writer payloads owned by their emitting components and composed by the top-level trace module. Domain modules own their v2 types instead of being beholden to old solver definitions, while stable IVL syntax remains shared.

This runtime makes future theory propagation and richer trace/proof replay easier to express, but does not implement those features by itself.

<!-- connections:start -->

## Connections

**Outgoing**
- REFRAMES → [[solver-effect-system]] — Future-work sketch becomes accepted v2 runtime decision
- IMPLEMENTS → [[z3-replacement.adr]] — Additive v2 runtime advances the owned solver path
- MOTIVATES → [[solver-v2-monadic-port.implementation]] — Runtime decision orients the implementation
- CONSTRAINS → [[theory-conclusions-propagation]] — Future propagation must flow through the runtime/theory result shape

**Incoming**
- [[solver-v2-monadic-port.session]] ← PRODUCED — Session settled the runtime decision
- [[solver-v2-monadic-port.implementation]] ← IMPLEMENTS — Concrete implementation of D-008

<!-- connections:end -->
