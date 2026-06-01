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

Yap has one integration test: `examples-readme.repl.test.ts`. It defines tutorial snippets covering primitives, functions, records, variants, pattern matching, blocks, polymorphism, implicits, row polymorphism, dependent types, recursion, and refinements, then runs them through the REPL pipeline. The test is currently **skipped** (`test.skip`), so zero end-to-end coverage exists in CI.

Unskipping this test is a near-term goal. Beyond the REPL, integration testing could expand in two directions:

**Codegen round-trips.** The JS, C, and Erlang codegen emit tests snapshot the generated code but do not execute it. A round-trip test would elaborate a Yap program, lower it, emit target code, execute it (Node for JS, compile+run for C, `escript` for Erlang), and compare the output against expected values. This closes the gap between "emits valid-looking code" and "emits code that runs correctly."

**Multi-module programs.** Current elaboration tests process single expressions or single `let` statements. Testing import/export resolution, FFI declarations, and cross-module type propagation requires multi-file programs elaborated through the full pipeline.

Related: [[testing-strategy]], [[ffi]], [[js-codegen]], [[c-codegen]], [[erlang-codegen]], [[yap]]
