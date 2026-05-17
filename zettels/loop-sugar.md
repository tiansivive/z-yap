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

**No `for` / `while` surface syntax** appears in `src/parser/grammar.ne` (lexer keywords include neither). Iteration is expressed via **functions, blocks, recursion**, `match`, and FFI-backed helpers where applicable (`foreign` statements, REPL FFI wiring in `src/cli/repl.ts`).

Deferred **loop sugar** would be a compile-time desugar (for example tail-recursive accumulator definitions), not a silent imperative primitive inside core elaboration — but nothing like that exists in grammar or lowering yet.
