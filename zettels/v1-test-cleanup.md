---
tags:
  - testing
  - migration
  - decision
  - bugfix
  - infrastructure
  - elaboration
  - normalization
  - unification
  - solver
  - snapshot-testing
  - inference
  - code
  - compiler
  - pattern
  - cleanup
---

# V1 test cleanup

Deletion of legacy v1-API test files and porting of missing coverage to active v2-based suites.

**Deleted files:**
- `src/elaboration/elaboration.test.ts` (824 lines) — comprehensive elaboration tests covering literals, functions, rows, structs, pattern matching, recursion, blocks. Written against defunct v1 monad API (`EB.M.run`, single-argument `EB.Display.Term`/`NF.display`). Was `describe.skip`'d and excluded from vitest.
- `src/elaboration/solver/solver.test.ts` (88 lines) — solver constraint tests using v1 `EB.M` monad. Was `describe.skip`'d.

**Ported to `inference/__tests__/match.test.ts`:** 8 pattern matching test cases not covered by existing active suites — branch unification (mismatched branch types), variable patterns, struct patterns (literal fields, row polymorphism, variable binding, nested recursive with application), type patterns (Num/String constructors), variant patterns (#nil/#cons tags).

**Audit method:** compared every `describe`/`it` block in the old files against the 19 active `inference/__tests__/*.test.ts` files. Only pattern matching had coverage gaps; all other categories (literals, functions, rows, structs, recursion, blocks, annotations, holes, projections, injections, lambdas, pi types, applications, tuples, tagged values, lists, dictionaries) were already covered by existing v2 suites.

**Config changes:** removed explicit vitest exclusions for the deleted files from `vitest.config.mts`. Added `@yap/gram` path aliases to `tsc.tsconfig.json`. Added `src/cli/explore/static` and `tooling/syntax-highlighting` to `tsc.tsconfig.json` excludes (static assets causing `checkJs` errors).
