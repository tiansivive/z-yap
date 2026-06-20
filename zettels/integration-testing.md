---
tags:
  [
    testing,
    infrastructure,
    concern,
    goal,
    compiler,
    exploration,
    elaboration,
    parser,
    planned,
  ]
refs:
  - src: src/__tests__/integration/examples-readme.repl.test.ts
    note: REPL integration test (currently skipped)
---

# Integration testing

Yap has source-level integration suites under `src/__tests__/integration` that run language-tour fragments through the parser, elaboration, verification, GRAM, MIR, and codegen-facing pipeline helpers. These snapshots are valuable regression artifacts, but each declaration-level test should also assert the semantic claim it protects: expected type, normalized value, verification verdict, or explicitly classified expected error.

The REPL tutorial runner (`examples-readme.repl.test.ts`) remains skipped and serves a different role: user-workflow coverage for interactive loading and reported types. It should not be the sole definition of integration testing.

Integration testing expands in three directions:

**Semantic assertions.** Source-level integration tests should state their expected type/validity/error outcome directly before snapshotting full pipeline output. This separates core parser/elaboration/verification claims from downstream GRAM, bridge, or backend lag.

**Codegen round-trips.** The JS, C, and Erlang codegen emit tests snapshot the generated code but do not execute it. A round-trip test would elaborate a Yap program, lower it, emit target code, execute it (Node for JS, compile+run for C, `escript` for Erlang), and compare the output against expected values. This closes the gap between "emits valid-looking code" and "emits code that runs correctly."

**Multi-module programs.** Current elaboration tests process single expressions or single `let` statements. Testing import/export resolution, FFI declarations, and cross-module type propagation requires multi-file programs elaborated through the full pipeline.

Related: [[testing-strategy]], [[ffi]], [[js-codegen]], [[c-codegen]], [[erlang-codegen]], [[yap]]

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[yap]] — REPL pipeline end-to-end
- CONCERNS → [[ffi]]
- CONCERNS → [[js-codegen]]
- CONCERNS → [[c-codegen]]
- CONCERNS → [[erlang-codegen]]

**Incoming**
- [[testing-strategy]] ← INCLUDES
- [[testing.thread]] ← INCLUDES
- [[explorer-snippet-library]] ← COMPOSES_WITH — Snippets double as smoke tests
- [[semantic-assertions-with-regression-snapshots]] ← INFORMS — Declaration-level type/validity/error expectations
- [[snapshot-error-triage]] ← INFORMS — Downstream lag must be separated from core language claims

<!-- connections:end -->
