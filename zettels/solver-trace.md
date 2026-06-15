---
tags:
  - verification
  - sat
  - solver
  - mechanism
  - implemented
  - ivl
  - tooling
  - display
  - tracing
  - code
  - infrastructure
  - implementation
  - observability
  - generator
refs:
  src:
    - src/verification/solver/v2/trace/index.ts
    - src/verification/solver/v2/trace/replay.ts
    - src/verification/solver/v2/trace/print.ts
    - src/verification/solver/v2/solver.ts
  tests:
    - src/verification/solver/v2/trace/__tests__/trace.test.ts
---
# Solver trace

Writer-based observability system for the v2 CDCL(T) solver. Solver components emit domain-owned events through the RWSE runtime from [[solver-v2-effect-runtime.adr]], producing a complete small-step trace without altering solving semantics.

**Event types** (`v2/trace/index.ts`): CDCL propagation, decisions, conflicts, analysis, backjumping, theory assertion/check detail, quantifier rounds, formula setup, and terminal `sat`/`unsat`/`unknown` results.

**Theory detail events**: EUF emits registry/active assertion, merge, scan, and conflict events; arithmetic emits bound registration and feasibility events. These payloads expose internal theory transitions per solver step.

**One-shot trace API**: `Solver.run(formula)` returns the result, writer events, encoding artefacts, clauses, and arena for one generated IVL formula.

**Replay renderer** (`v2/trace/replay.ts`): reconstructs a human-readable small-step log: formula display, Tseitin proxy resolution back to original IVL subformulas, registry/active theory facts, trail assignments, EUF class changes, arithmetic bound summaries, quantifier lemma insertion, clause satisfaction tracking, and terminal result.

The top-level replay option `showRegistry` defaults to `true` so registered-vs-active theory facts are visible by default. Quantifier events are emitted by the E-matching and MBQI modules themselves and carry generated lemmas so replay can append quantifier clauses without relying on persistent clause IDs.

V2 replay has snapshot coverage for propositional contradiction, EUF contradiction, arithmetic UNSAT, arithmetic SAT, and quantifier UNSAT. The snapshots are intentionally paired with targeted assertions for semantic toggles such as `showRegistry: false` and EUF active/scan detail.

<!-- connections:start -->

## Connections

**Outgoing**
- EXPOSES → [[cdcl-t-solver]] — Makes CDCL(T) execution steps observable
- EXPOSES → [[euf-theory]] — EUFTrace.Step reveals merge/congruence/scan internals
- EXPOSES → [[arithmetic-theory]] — ArithTrace.Step reveals bound/pivot/feasibility internals
- EXPOSES → [[quantifier-engine]] — Quantifier round events visible in trace
- EXPOSES → [[bcp]] — Propagation steps rendered in trace output
- EXPOSES → [[one-uip]] — Conflict analysis + backjump steps rendered
- EXPOSES → [[watched-literals]] — Clause satisfaction tracking in trace
- DEPENDS_ON → [[m2-implementation]] — Structurally built on the M2 solver
- CONSUMES → [[m2-implementation]] — Trace consumes solver generator output
- EXTENDS → [[theory-plugin-interface]] — Added assertTrace/checkTrace generator methods
- USES → [[pretty-printing]] — prettier-printer for structured output
- REPORTS → [[cdcl-t-solver]] — Human-readable execution replay
- REPORTS → [[euf-theory]] — Renders equivalence classes after merges
- REPORTS → [[arithmetic-theory]] — Renders bound intervals after updates
- TRANSLATES_TO → [[pipeline-explorer]] — Trace output displayed in Trace tab
- SNAPSHOTS → [[cdcl-t-solver]] — 14 snapshot tests capture trace output
- RESOLVES → [[vc-ir]] — Tseitin proxy variables resolved back to IVL subformulas
- RESOLVES → [[congruence-closure]] — Enode IDs resolved to term names
- DISPATCHES_ON → [[theory-plugin-interface]] — Step rendering dispatches on theory name
- CONSUMES → [[vc-ir]] — Reads IVL formulas for display
- USES → [[m1-implementation]] — Uses IVL printer for formula rendering
- DEPENDS_ON → [[boolean-lowering-cnf]] — Trace reads atom table + proxy table from Tseitin
- EXPOSES → [[mbqi]] — mbqi-round and pure-quantifier steps in trace replay

**Incoming**
- [[session-trace-observability]] ← PRODUCED — Session delivered the trace system
- [[build-simplify-toggle]] ← ENABLES — Unsimplified formulas reveal full VC structure in trace
- [[lambda-synthesis-fix]] ← DISCOVERED_BY — Incorrect formula visible in trace output
- [[pipeline-explorer]] ← USES — Trace tab displays solver replay
- [[pipeline-explorer]] ← REPORTS — Renders trace output in Trace tab
- [[verification-backend.thread]] ← INCLUDES
- [[solver-v2-monadic-port.implementation]] ← EXPOSES — v2 trace print/replay

<!-- connections:end -->
