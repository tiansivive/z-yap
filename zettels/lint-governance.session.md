---
tags:
  - ai-session
  - infrastructure
  - tooling
  - automation
  - convention
  - monad
  - testing
  - agent
  - cleanup
  - implemented
refs:
  session: aea7463d-ddb2-43fa-8d0e-e921d31c38d1
  branch: linting-debt-settling
---

# Lint governance session

This AI pair-programming session audited the ESLint ruleset against its stated goal (improving LLM output quality), diagnosed the failure mode — a permanently red gate carries no information — and rebuilt enforcement in layers: rule/idiom reconciliation with scoped carve-outs, deletion of dead code the audit surfaced (the orphaned direct EB.Term→JS codegen, a z3-solver scratch script), unification of the split tsconfig after fixing five stale-API test files (which killed the phantom `Unsafe … of type error` class), precise typing of the generator-monad yield protocol (`Prim<A>`, `yield* pure`, the delegation-direction and circular-inference findings), and an ESLint suppressions baseline plus truthful knip entries that turned both CI lint gates green. Instruction files were synced in the same pass (lint contract, `_`-prefix convention, sanctioned mutable cores, one-tsconfig rule).

## Produced

- [[lint-governance]] — the gate-design principle and enforcement architecture.
- [[evaluation-monad-rework]] — the NbE evaluator's planned port to an Evaluation generator monad, surfaced by the carve-out discussion.
- [[generator-monad]] — extended with the yield-protocol typing discipline.
- [[ci-pipeline]] — gate semantics updated to the baseline world.
- [[legacy-file-compile]] — live-MIR-surface migration path recorded.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[lint-governance]] — Gate-design principle authored in session
- PRODUCED → [[evaluation-monad-rework]] — Rework surfaced by the carve-out discussion
- PRODUCED → [[generator-monad]] — Yield-protocol typing discipline recorded

**Incoming**
- [[sessions.hub]] ← INCLUDES — Recorded pair-programming session

<!-- connections:end -->
