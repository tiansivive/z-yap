---
tags:
  - verification
  - solver
  - sat
  - z3
  - migration
  - implementation
  - testing
  - ivl
  - cdcl
  - validity
  - liquid
  - implemented
  - code
refs:
  src:
    - src/verification/solver/v2/
    - src/verification/solver/ivl/
  tests:
    - src/verification/solver/v2/
    - src/__tests__/integration/
---
# Solver v1 and Z3 removal

Yap's verification backend now uses the v2 one-shot solver path as the active in-tree CDCL(T) implementation. The root-level v1 solver modules, v1 solver tests, `z3.adapter.ts`, and the `z3-solver` package dependency were removed after source-level parity coverage moved into integration snapshots with IVL and solver trace output.

The former-oracle disagreements were preserved after removal. [[solver-v2-universal-refinement-false-sat]] is now reframed by validity discharge; [[block-scoped-let-vc-parity-bug]] remains an open VC-generation review item. Neither is a reason to keep the Z3 adapter in the dependency graph.

Validation for the removal passed `pnpm typecheck`, `pnpm test src/verification/solver/v2`, `pnpm test src/verification`, and `pnpm test src/__tests__/integration`.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[z3-replacement.adr]] — Removed Z3 dependency and adapter
- FOLLOWS → [[solver-v2-monadic-port.implementation]] — v2 became the active solver backend before v1 deletion
- PRESERVES → [[solver-v2-universal-refinement-false-sat]] — Historical raw quantified-SMT discrepancy preserved after Z3 removal
- PRESERVES → [[block-scoped-let-vc-parity-bug]] — Former-oracle disagreement remains as integration test.fails bug

**Incoming**
- [[verification-backend.thread]] ← INCLUDES — Thread item 30

<!-- connections:end -->
