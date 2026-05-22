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

Five test suites remain skipped. Each has a distinct blocker.

**1. `inference/__tests__/shift-reset.test.ts`** — entire `describe.skip`. The v2 inference modules (`shift.ts`, `reset.ts`) are implemented and Done per V2-MIGRATION.md, but the test syntax (`reset 10 with \k v -> ...`) may not align with the current Nearley parser. GRAM-level shift/reset tests (`src/GRAM/__tests__/shift-reset.test.ts`) pass and cover the lowering side comprehensively.

**2. `inference/__tests__/modal.test.ts`** — `it.skip("<*> 1")`. Correctly skipped: inference.v2 `modal.ts` does not exist (22/23 inference modules done, modal is the missing one). checking.v2 `modal.ts` also missing. Unblocked only when modal inference is implemented.

**3. `__tests__/pi-types.test.ts`** — `it.skip("handles dependent arg")`. Blocked by two things: (a) `Bool` literal not parsed by Nearley grammar (see item 4), (b) checking.v2 `match.ts` not implemented (dependent match in Pi domains requires it). The other 2 tests in this file (non-dependent) pass.

**4. `parser/__tests__/grammar.test.ts`** — `it.skip("should parse booleans: true")`. The Nearley grammar may lack a `true`/`false` → Bool literal production. The v2 literal module handles Bool in elaboration, and tree-sitter likely parses it. This is a v1-parser-only gap.

**5. `__tests__/integration/examples-readme.repl.test.ts`** — `test.skip`. 180s timeout integration test running all tutorial snippets through the REPL. Not a feature gap — an infrastructure/stability concern. Depends on the full v1 pipeline being stable end-to-end.
