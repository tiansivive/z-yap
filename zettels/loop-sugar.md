---
tags:
  [
    deferred,
    syntax,
    sugar,
    recursion,
    language,
    parser,
    elaboration,
    compiler,
    migration,
    backend,
    principle,
    decision,
    infrastructure,
    lowering,
  ]
---

# Loop sugar

Iteration today uses **functions, blocks, recursion**, `match`, and FFI-backed helpers where applicable (`foreign` statements, REPL FFI wiring in `src/cli/repl.ts`). `src/parser/grammar.ne` does not yet surface `for` / `while` keywords.

**Loop sugar (exploratory):** a compile-time desugar to tail-recursive accumulator definitions would stay outside core elaboration as an imperative primitive — grammar and lowering would need explicit rules if added.
