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
  - validity
  - liquid
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

The v2 solver is the current in-tree CDCL(T) backend. It is built around a generator-interpreted RWSE runtime whose state, events, and algorithms are owned by domain modules under `src/verification/solver/v2`; the prior root-level solver implementation and Z3 adapter have been removed.

## Effect runtime

`core.ts` defines the solver effect runtime. The reader carries immutable configuration and problem metadata; the writer carries trace events, diagnostics, proof hooks, and stats; the state carries the solver machine; and the error channel represents internal invariants or unsupported solver features. Normal solver outcomes remain values, following [[solver-v2-effect-runtime.adr]].

## Formula and encoding pipeline

`formulas/` owns normalization, skolemization, and quantified/propositional separation. `encoding/cnf.ts` owns the public `CNF.encode` entrypoint with an internal Tseitin transform, while `encoding/lookup.ts` projects generated ground formulas into the existing Boolean abstraction.

## CDCL(T)

`cdcl/` owns Boolean search state, scan-based BCP, conflict analysis, learned clauses, and non-chronological backjumping. The search loop asserts active Boolean literals into the concrete theory bundle and checks theory consistency at Boolean fixpoints.

## Theories

`euf/` owns hash-consing and congruence closure. EUF state distinguishes `registry` from `active`: the registry records all known literal meanings, while active records the subset asserted on the current CDCL trail. `arithmetic/` owns rational arithmetic, linear normalization, bound registration, and simplex feasibility. `theory/` orchestrates concrete EUF and arithmetic states behind a single CDCL-facing API.

## Quantifiers

`quantifier/` owns trigger extraction, E-matching, bounded MBQI, and the monadic quantifier step. `quantifier/round.ts` runs E-matching first and falls back to MBQI when no lemmas are produced. `ematch/round.ts`, `ematch/matching.ts`, and `mbqi/round.ts` are `Core.G` computations: they read the current arena, EUF representatives, encoding table, quantifier state, and generation through the solver monad instead of receiving snapshots or callbacks. E-matching and MBQI emit their own trace events from inside those computations.

## Public API and trace

`solver.ts` exposes the one-shot v2 raw satisfiability API: `Solver.run(formula)` returns the result plus trace, encoding, clauses, and arena, while `Solver.check(formula)` returns only the SAT result. The intermediate incremental `create`/`assert`/`push`/`pop` surface was removed because Yap solves generated IVL formulas as self-contained verification conditions. Verification-facing callers still need [[vc-validity-discharge]] to interpret those formulas as obligations before reporting user-facing verdicts. Trace presentation lives in `trace/print.ts` and `trace/replay.ts`; `trace/index.ts` composes event types and writer helpers while component events remain owned by the emitting domains.

`trace/replay.ts` is a replay state machine, not just a formatter. It reconstructs formula context, variables/proxies, registry entries, clause status, trail assignments, EUF classes and active disequality scans, arithmetic bound summaries, quantifier lemma insertion, and terminal results from the writer event stream. `showRegistry` defaults to `true` because the registry/active distinction is central to debugging CDCL(T) theory behavior. EUF and arithmetic detail payloads are emitted by their domains through `theory/orchestrate.ts`, while E-matching and MBQI trace events carry generated lemmas so replay can append quantifier clauses with renderer-local labels instead of restoring persistent clause IDs.

Replay snapshots now mirror v1 trace coverage for propositional, EUF, arithmetic, and quantifier cases. Adding those snapshots exposed a writer-duplication bug in nested `Core.Do` execution: child computations were returning the parent writer and the outer interpreter concatenated it again. The interpreter now runs yielded children with an empty writer accumulator, preserving state threading while treating child output as a delta.

The live interactive verification paths use the v2 solver, but D-009 clarifies that raw solver output is not the verifier verdict. The proof-of-concept validity integration is exercised by the integration pipeline helper and targeted refinement test; REPL, explorer, and remaining user-facing verdict paths need the same wrapper audit. Source-level verification parity now lives in integration snapshots, which include IVL and v2 trace output. Module compilation verification cleanup remains separate migration work.

The temporary Z3-vs-v2 discrepancy pass found two issues. [[solver-v2-universal-refinement-false-sat]] is now reframed by validity discharge: it is no longer the ordinary Liquid verification path, though it remains relevant as a general quantified-SMT completeness case. [[block-scoped-let-vc-parity-bug]] remains an upstream VC-generation review item.

## Validation

The v2 solver path is covered by colocated tests under `src/verification/solver/v2`, including replay snapshots under `trace/__tests__/__snapshots__`. The v1/Z3 removal validation ran `pnpm typecheck`, `pnpm test src/verification/solver/v2`, `pnpm test src/verification`, and `pnpm test src/__tests__/integration`.

## Known limitations

Theory conclusions are not yet generated or consumed by CDCL; see [[theory-conclusions-propagation]]. Quantifier-generated formulas are projected into the initial CNF abstraction rather than extending it; see [[incremental-abstraction-extension]]. Validity discharge is only partially wired into verification entry points; see [[vc-validity-discharge]]. The block-scoped-let parity case remains open as a VC-generation review item. Module compilation does not yet emit IVL verification artefacts or run non-blocking v2 verification diagnostics.

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
- DEFERRED_TO → [[solver-v2-universal-refinement-false-sat]] — Raw quantified-SMT discrepancy later reframed by D-009
- DEFERRED_TO → [[block-scoped-let-vc-parity-bug]] — Former-oracle divergence and VC-generation review item

**Incoming**
- [[solver-v1-z3-removal]] ← FOLLOWS — v2 became the active solver backend before v1 deletion
- [[pipeline-explorer]] ← USES — Solver.run() for trace generation
- [[solver-v2-monadic-port.session]] ← PRODUCED — Session delivered the v2 port
- [[solver-v2-effect-runtime.adr]] ← MOTIVATES — Runtime decision orients the implementation
- [[verification-backend.thread]] ← INCLUDES — Thread item 25
- [[validity-vs-satisfiability]] ← CLARIFIES — Solver.check remains raw satisfiability
- [[evaluation-monad-rework]] ← MIRRORS — Precedent: imperative core ported to the generator monad

<!-- connections:end -->
