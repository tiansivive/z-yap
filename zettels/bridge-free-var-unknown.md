---
tags:
  - bug
  - planned
  - lowering
  - graph
  - mir
  - codegen
  - compiler
---

# Bridge free var → unknown

The GRAM→MIR bridge emits `unknown` for `var:free` node references. When GRAM contains a free variable (e.g. a top-level function referenced from another definition), the bridge doesn't resolve it to a MIR variable name — it falls through to an `unknown` placeholder.

Observed in multiple integration test snapshots: any definition that references another top-level binding by name shows `unknown` in MIR and codegen where the free variable reference should appear.

**Root cause:** The bridge's variable resolution (`closures.ts` / `emit.ts`) handles `var:bound` (de Bruijn, with `:refers_to` edges) and `var:meta` but lacks a dispatch case for `var:free`. Free variables in GRAM carry their name but have no `:refers_to` edge to follow, so the bridge needs a separate resolution path — likely looking up the name in the module-level scope.

**Impact:** Any multi-definition module where one function calls another produces broken MIR/codegen. Single-definition modules and self-recursive functions (which use bound variables) are unaffected.

**Note:** The integration test harness also masks this partially — the test runs single-expression scripts through `runScript`, so free-variable cross-references only appear when a block defines multiple functions.
