---
tags:
  - verification
  - solver
  - sat
  - monad
  - generator
  - implementation
  - migration
  - tracing
  - quantifiers
  - arithmetic
  - ivl
  - implemented
  - code
refs:
  src:
    - src/verification/solver/v2/core.ts
    - src/verification/solver/v2/solver.ts
    - src/verification/solver/v2/cdcl/
    - src/verification/solver/v2/euf/
    - src/verification/solver/v2/arithmetic/
    - src/verification/solver/v2/theory/
    - src/verification/solver/v2/quantifier/
    - src/verification/solver/v2/encoding/
    - src/verification/solver/v2/formulas/
    - src/verification/solver/v2/trace/
  tests:
    - src/verification/solver/v2/
---
# Solver v2 monadic port

The v2 solver is an additive re-architecture of the in-tree CDCL(T) backend around a generator-interpreted RWSE runtime. It keeps the existing solver entrypoints intact while exposing a parallel v2 path whose state, events, and algorithms are owned by domain modules under `src/verification/solver/v2`.

## Effect runtime

`core.ts` defines the solver effect runtime. The reader carries immutable configuration and problem metadata; the writer carries trace events, diagnostics, proof hooks, and stats; the state carries the solver machine; and the error channel represents internal invariants or unsupported solver features. Normal solver outcomes remain values, following [[solver-v2-effect-runtime.adr]].

## Formula and encoding pipeline

`formulas/` owns normalization, skolemization, and quantified/propositional separation. `encoding/cnf.ts` owns the public `CNF.encode` entrypoint with an internal Tseitin transform, while `encoding/lookup.ts` projects generated ground formulas into the existing Boolean abstraction.

## CDCL(T)

`cdcl/` owns Boolean search state, scan-based BCP, conflict analysis, learned clauses, and non-chronological backjumping. The search loop asserts active Boolean literals into the concrete theory bundle and checks theory consistency at Boolean fixpoints.

## Theories

`euf/` owns hash-consing and congruence closure. EUF state distinguishes `registry` from `active`: the registry records all known literal meanings, while active records the subset asserted on the current CDCL trail. `arithmetic/` owns rational arithmetic, linear normalization, bound registration, and simplex feasibility. `theory/` orchestrates concrete EUF and arithmetic states behind a single CDCL-facing API.

## Quantifiers

`quantifier/` owns trigger extraction, E-matching, and bounded MBQI. E-matching uses the current EUF arena and representative lookup to generate CDCL lemmas from trigger substitutions. MBQI enumerates bounded ground-term candidates when E-matching yields no lemmas.

## Public API and trace

`solver.ts` exposes `Solver.create`, `Solver.createTraced`, and `Solver.check` as the additive v2 API. Trace presentation lives in `trace/print.ts` and `trace/replay.ts`; component events remain owned by the emitting domains and are composed by `trace.ts`.

## Validation

The v2 solver path is covered by colocated tests under `src/verification/solver/v2`. The closeout validation ran `pnpm typecheck` and `pnpm test src/verification/solver/v2`.

## Known limitations

Theory conclusions are not yet generated or consumed by CDCL; see [[theory-conclusions-propagation]]. Quantifier-generated formulas are projected into the initial CNF abstraction rather than extending it; see [[incremental-abstraction-extension]]. The current production solver entrypoints still point at the existing solver path until v2 replacement is reviewed.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[solver-v2-effect-runtime.adr]] — Concrete implementation of D-008
- IMPLEMENTS → [[cdcl-t-solver]] — Additive v2 CDCL(T) path
- IMPLEMENTS → [[congruence-closure]] — v2 EUF registry/active state and CC port
- IMPLEMENTS → [[arithmetic-theory]] — v2 arithmetic domain port
- IMPLEMENTS → [[quantifier-engine]] — v2 E-matching and MBQI port
- EXPOSES → [[solver-trace]] — v2 trace print/replay
- DEFERRED_TO → [[theory-conclusions-propagation]] — Theory conclusions are named but not produced/consumed
- DEFERRED_TO → [[incremental-abstraction-extension]] — Quantifier fresh-atom abstraction extension remains future work

**Incoming**
- [[solver-v2-monadic-port.session]] ← PRODUCED — Session delivered the v2 port
- [[solver-v2-effect-runtime.adr]] ← MOTIVATES — Runtime decision orients the implementation
- [[verification-backend.thread]] ← INCLUDES — Thread item 25

<!-- connections:end -->
