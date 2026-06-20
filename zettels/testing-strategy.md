---
tags:
  [
    testing,
    infrastructure,
    compiler,
    project,
    reference,
    hub,
    implemented,
    concern,
  ]
refs:
  - src: src/__tests__/setup.ts
    note: Custom snapshot serializer, key stripping
  - src: src/elaboration/inference/__tests__/util.ts
    note: elaborateFrom helper, supply resets
  - src: src/verification/__tests__/helpers.ts
    note: Verification test helpers
  - src: vitest.config.mts
    note: Vitest configuration
  - ci: .github/workflows/ci.yml
    note: CI pipeline definition
---

# Testing strategy

Hub: [[snapshot-testing]], [[semantic-assertions-with-regression-snapshots]], [[snapshot-error-triage]], [[testing-audit-2026-06-20]], [[fuzz-testing]], [[property-based-testing]], [[ci-pipeline]], [[integration-testing]], [[negative-testing]], [[solver-testing]], [[test-coverage-gaps]], [[v1-test-cleanup]]

Yap's test suite spans every pipeline stage: parsing, elaboration, normalization, unification, GRAM rewriting, verification, and codegen. Vitest runs the suite with parallel workers, coverage via `@vitest/coverage-v8`, and Codecov integration.

Snapshots remain useful regression artifacts, but the active testing direction is to pair them with direct semantic assertions. A test should state the behavior it protects through displayed type text, normalized value, verification verdict, graph shape, runtime result, or a classified expected error; the snapshot then catches broader compiler-output drift.

**Coverage by stage:**
- **Parser**: Nearley tests document current syntax expectations; gaps feed the tree-sitter migration test plan
- **Elaboration inference**: `elaborateFrom(src)` → semantic assertions on displays/constraints/shape → regression snapshots
- **Elaboration modules**: 4+ files — full `let`/export/import through solver
- **Normalization**: 4 files — NbE evaluation, generalization, force, arity
- **Unification**: 1 file — unification v2
- **GRAM**: graph substrate, DPO matching, saturation, closures, patterns, PAP, shift/reset enrichment, bridge tests
- **Verification solver**: 8 files — CDCL, CNF, EUF, arithmetic, quantifiers, traces
- **Codegen**: backend emit tests and active-pipeline parity gaps

**Gaps under exploration:** fuzz testing ([[fuzz-testing]]), property-based generators ([[property-based-testing]]), systematic negative testing ([[negative-testing]]), codegen round-trip verification ([[integration-testing]]), and deeper solver stress testing ([[solver-testing]]). These will come online progressively as the core stabilizes.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[snapshot-testing]]
- INCLUDES → [[fuzz-testing]]
- INCLUDES → [[property-based-testing]]
- INCLUDES → [[ci-pipeline]]
- INCLUDES → [[integration-testing]]
- INCLUDES → [[negative-testing]]
- INCLUDES → [[solver-testing]]
- INCLUDES → [[test-coverage-gaps]] — Gap tracking
- INCLUDES → [[v1-test-cleanup]] — Cleanup event

**Incoming**
- [[testing.thread]] ← INCLUDES
- [[ci-pipeline]] ← SUPPORTS
- [[snapshot-testing]] ← DETAILS
- [[test-coverage-gaps]] ← DETAILS — Inventory of skipped suites
- [[v1-test-cleanup]] ← ADDRESSES — Closes v1/v2 test drift

<!-- connections:end -->
