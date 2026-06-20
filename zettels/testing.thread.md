---
tags:
  [
    testing,
    infrastructure,
    thread,
    project,
    compiler,
    goal,
    concern,
    exploration,
  ]
---

# Testing

Thread: [[testing-strategy]], [[testing-audit-2026-06-20]], [[semantic-assertions-with-regression-snapshots]], [[snapshot-error-triage]], [[snapshot-testing]], [[fuzz-testing]], [[property-based-testing]], [[ci-pipeline]], [[integration-testing]], [[negative-testing]], [[solver-testing]], [[v1-test-cleanup]], [[test-coverage-gaps]]

Yap's testing infrastructure rests on snapshot-driven Vitest suites covering 67+ files across every pipeline stage. CI enforces lint, formatting, dead-code detection, type checking, and test coverage on every PR.

**Current state.** Snapshot testing is mature and well-integrated. The CI pipeline is solid. Elaboration and parser tests are comprehensive for the features they cover. Solver tests validate each theory plugin. GRAM tests cover DPO matching, saturation, and pattern translation.

**Frontier.** Several testing dimensions remain exploratory and will come online as the core stabilizes:

- **Fuzz testing** ([[fuzz-testing]]) is a goal — grammar-aware parser fuzzing, elaboration fuzzing via random ASTs, and solver fuzzing via random IVL formulas.
- **Property-based testing** ([[property-based-testing]]) could verify algebraic invariants: NbE round-trip, unification idempotence, solver soundness, pattern coverage completeness.
- **Integration testing** ([[integration-testing]]) — the REPL integration test exists but is skipped; codegen round-trips and multi-module programs are unexplored.
- **Negative testing** ([[negative-testing]]) — systematic coverage of error paths: type errors, parse failures, unsatisfiable refinements, non-termination.
- **Solver stress testing** ([[solver-testing]]) — adversarial formulas, performance benchmarking, differential testing.
- **Semantic assertions over regression snapshots** ([[semantic-assertions-with-regression-snapshots]]) — snapshots remain useful, but tests need direct semantic claims.
- **Snapshot error triage** ([[snapshot-error-triage]]) — snapshot-embedded errors need explicit roles before they can be treated as regression artifacts.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[testing-strategy]]
- INCLUDES → [[fuzz-testing]]
- INCLUDES → [[property-based-testing]]
- INCLUDES → [[integration-testing]]
- INCLUDES → [[negative-testing]]
- INCLUDES → [[testing-audit-2026-06-20]] — Audit resource and findings index
- INCLUDES → [[semantic-assertions-with-regression-snapshots]] — Testing methodology from audit
- INCLUDES → [[snapshot-error-triage]] — Snapshot error classification from audit

**Incoming**
- [[v1-test-cleanup]] ← DETAILS — Thread item
- [[repo-docs-retirement-audit-2026-06-20]] ← INFORMS — README/tour updates should stay aligned with integration tests

<!-- connections:end -->
