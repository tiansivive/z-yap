---
tags:
  - testing
  - infrastructure
  - incomplete
  - problem
  - migration
  - elaboration
  - continuation
  - modality
  - parser
  - dependent
  - cli
---

# Test coverage gaps

The testing audit separates skipped tests from semantic coverage gaps. Skips are only one signal; snapshot-only tests and snapshots that bless known errors also create gaps.

**Skipped tests.**

- `inference/__tests__/modal.test.ts` — modal inference/checking coverage remains blocked on modal inference work.
- `__tests__/pi-types.test.ts` — dependent argument case depends on dependent match/checking coverage.
- `parser/__tests__/grammar.test.ts` — boolean structural parse case belongs in the tree-sitter migration baseline rather than a large Nearley expansion.
- `__tests__/integration/examples-readme.repl.test.ts` — REPL tutorial runner remains a user-workflow/infrastructure test.

**Snapshot-primary gaps.** Elaboration match, let-polymorphism, variants, tuples, holes, dictionaries, modal coverage, and some shift/reset module tests need direct semantic assertions before their snapshots can be read as correctness contracts.

**Snapshot-error gaps.** Integration snapshots contain expected failures, known implementation bugs, downstream GRAM/bridge lag, backend lag, and unexpected runtime exceptions. Each embedded error needs an explicit role before the snapshot can function as a regression artifact.

**Parser migration gaps.** Nearley parser gaps are useful inventory for tree-sitter: modules/import/export, FFI declarations, `using`, dict types, list and wildcard patterns, `:field` self-reference syntax, and fuller shift/reset syntax/error cases.

**Active pipeline gaps.** GRAM graph tests are strong, but active bridge/runtime parity needs focused tests for shift/reset with captured environments, multiple resumptions with captured values, rich struct/variant/list pattern dispatch, user FFI, and blocks.

<!-- connections:start -->

## Connections

**Outgoing**
- DETECTS → [[v2-elaboration-pipeline]] — Missing modal inference (22/23), missing checking.v2 match
- DETECTS → [[nearley-parser]] — Bool literal grammar gap
- DEFERS → [[shift-reset]] — Elaboration-level tests skipped; GRAM tests pass
- DEFERS → [[repl]] — Integration test skipped (infrastructure)
- BLOCKS → [[modalities]] — Modal test blocked until inference.v2 modal.ts exists
- BLOCKS → [[pi-types]] — Dependent arg test blocked by Bool parsing + checking.v2 match
- DETAILS → [[testing-strategy]] — Inventory of skipped suites
- DISCOVERED_BY → [[v1-test-cleanup]] — Audit that created the gaps inventory

**Incoming**
- [[testing-strategy]] ← INCLUDES — Gap tracking
- [[v1-test-cleanup]] ← MOTIVATES — Audit revealed skipped suites
- [[snapshot-error-triage]] ← INFORMS — Snapshot-embedded errors are coverage gaps until classified

<!-- connections:end -->
