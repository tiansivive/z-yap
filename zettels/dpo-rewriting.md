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
