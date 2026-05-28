---
tags:
  - implemented
  - bugfix
  - verification
  - elaboration
  - inference
  - compiler
  - explorer
---

# Verification rigid mismatch

The let binding explorer snippet (`{ let id = \x -> x; return id 42; }`) produced "Rigid variables do not match in subtype" during verification.

**Root cause:** The told zonker from `letdec` generalization was dropped by `module.ts`'s `listen()` destructuring. Without the generalization substitution, unsolved metas were re-generalized and compared as rigid variables against concrete types.

**Fix:** Resolved by [[module-zonker-fix]]. Full pipeline now completes: type `Num`, normalized `42`, verification sat.
