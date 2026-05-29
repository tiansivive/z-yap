---
tags:
  - implemented
  - bugfix
  - elaboration
  - inference
  - compiler
  - explorer
  - unification
  - normalization
---

# Verification unconstrained meta

The variant match explorer snippet (`\x -> match x | #nil a -> 0 | #cons {el, rest} -> 1`) crashed at `NF.generalize` — `ctx.metas[?15]` was undefined.

**Root cause:** Row `rewrite` in `unification/rows.ts` creates fresh metas (kind, type, row tail) when it encounters an unsolved row meta during constraint solving. These metas are told to the writer but `module.expression` only merged inference metas (from `listen()` before solve) into `ctx.metas`. Solver-created metas were orphaned — present in the writer but invisible to `generalize`.

**Fix:** Added a second `V2.listen()` after `EB.solve()` in both `module.ts` and `inference/statements.ts` to capture solver-created metas and merge them into the context before generalization.

**Files:** `src/elaboration/module.ts`, `src/elaboration/inference/statements.ts`.

**Note:** The downstream "Unconstrained meta variable in verification" still appears because the variant type parameters (`?3`, `?5`, `?7`) are genuinely unconstrained — this is expected for polymorphic snippets with no type annotations.
