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

Hub: [[snapshot-testing]], [[fuzz-testing]], [[property-based-testing]], [[ci-pipeline]], [[integration-testing]], [[negative-testing]], [[solver-testing]]

Yap's test suite spans every pipeline stage: parsing, elaboration, normalization, unification, lowering, GRAM rewriting, verification, and codegen. Vitest runs 67+ test files with parallel workers, coverage via `@vitest/coverage-v8`, and Codecov integration.

The dominant pattern is **snapshot testing** — parse or elaborate a source string, assert structural properties on the AST/type, then snapshot the pretty-printed output. A custom serializer (`src/__tests__/setup.ts`) strips non-deterministic keys (`ffi`, `imports`, `location`, `trace`, `id`), and `console-fail-test` catches accidental logging.

**Coverage by stage:**
- **Parser**: 12 files — Nearley parse → assert single result → snapshot CST
- **Elaboration inference**: 18+ files — `elaborateFrom(src)` → structural assert → snapshot displays
- **Elaboration modules**: 4+ files — full `let`/export/import through solver
- **Normalization**: 4 files — NbE evaluation, generalization, force, arity
- **Unification**: 1 file — unification v2
- **Lowering + GRAM**: 15 files — MIR lowering, DPO matching, saturation, closures, patterns
- **Verification solver**: 8 files — CDCL, CNF, EUF, arithmetic, quantifiers, traces
- **Codegen**: 3 files — JS, C, Erlang emit snapshots

**Gaps under exploration:** fuzz testing ([[fuzz-testing]]), property-based generators ([[property-based-testing]]), systematic negative testing ([[negative-testing]]), codegen round-trip verification ([[integration-testing]]), and deeper solver stress testing ([[solver-testing]]). These will come online progressively as the core stabilizes.
