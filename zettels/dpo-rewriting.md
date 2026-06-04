---
tags:
- rewriting
- mechanism
- implemented
- graph
- compiler
- infrastructure
- reference
- ir
- pattern
- project
- testing
---

# DPO rewriting

**Location:** `src/GRAM/grs/` — rule shape `{ lhs, rhs, where? }` in `rule.ts`; matching and rewrite glue in `match.ts`, `rewrite.ts`; strategies `apply`, `once`, `seq`, `try_`, `choice`, `repeat` in `strategy.ts`. Tests: `src/GRAM/__tests__/dpo.test.ts`.

**Semantics (project docs):** `src/GRAM/grs/README.md` describes DPO-style graph rewriting on GRAM: shared binds between LHS and RHS form the preserved interface; LHS-only nodes delete, RHS-only nodes create; engine rejects dangling edges. Strategies compose rule application.

**Limitation:** No aggregate patterns—rules are fixed-arity LHS patterns. Passes needing variable-length collection before rewrite use imperative traversals (example: `capture` in `src/GRAM/passes/closure.ts`). README names **LoGRAM** as a planned Datalog/triple-store direction for joins.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[gram]] — Rewriting engine
- TRAVERSES → [[gram]] — Pattern matching for rule LHS
- REWRITES → [[gram]] — L ← K → R rule application on nodes

**Incoming**
- [[gram]] ← REWRITES — DPO rules refine graph
- [[egglog-influence]] ← INSPIRES — E-graph rewriting
- [[stratego-influence]] ← INSPIRES — Strategy combinators
- [[gram]] ← DELEGATES_TO — Graph transformation engine
- [[dpo-vs-imperative-passes]] ← CONSTRAINS — Defines when DPO applies
- [[gram-evolution.thread]] ← INCLUDES
- [[explorer-diff-mode]] ← ENABLES — Visualize DPO rule application effects
- [[explorer-graph-viz]] ← USES — Animates DPO rule application
- [[programmable-gram-passes]] ← RELIES_ON — Existing match/rewrite engine runs user rules
- [[gram-kernel-pass]] ← USES — Delegates execution to the engine
- [[gram-rule-as-yap-value]] ← MIRRORS — Surface type maps engine-side Rule

<!-- connections:end -->
