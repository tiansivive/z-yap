---
tags:
  - bugfix
  - implemented
  - explorer
  - syntax
  - testing
  - tooling
  - parser
  - display
---

# Explorer snippet syntax fixes

Four of the 19 built-in explorer snippets had incorrect surface syntax, causing parser or elaboration errors before any pipeline stage could produce output.

**Tuple:** Missing comma separators — corrected to `{ 1, "hello", true }`.

**Let binding:** Missing `return` keyword — corrected to `{ let id = \x -> x; return id 42; }`.

**Variant match:** Type annotation syntax errors in pattern — corrected per `examples/README.md`.

**Nested struct match:** Same category of syntax errors — corrected per `examples/README.md`.

**File:** `src/cli/explore/static/app.js` (the `SNIPPETS` array).
