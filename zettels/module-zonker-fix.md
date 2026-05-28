---
tags:
  - bugfix
  - implemented
  - elaboration
  - generalization
  - monad
  - substitution
  - compiler
  - inference
---

# Module zonker propagation fix

`{ let id = \x -> x; return id 42; }` inferred type `Π(a: Type) => Num` instead of `Num` — a meta from `id`'s let-generalization leaked to the block level and was re-generalized.

**Root cause:** `module.ts` `expression` destructured `V2.listen()` as `{ constraints, metas }`, silently dropping the accumulated `zonker`. When `letdec` generalizes a let-binding, it maps inner metas to bound variables via a substitution and tells it to the writer with `V2.tell("zonker", next.zonker)`. But `expression` never extracted this told zonker. The zonker it used (from `solve` only) didn't contain the generalization substitution. `collectMetasEB` then scanned the elaborated block term, found the unresolved meta in `id`'s annotation, passed the `lvl` guard (it was created at block depth), and generalized it again.

**Misdiagnosis:** An earlier fix (Agent C) tried to solve a related crash (`ctx.metas[m.val]` undefined) by making nested `Do` blocks inherit parent `w.metas` and adding sync points across `unification.ts`, `solver.ts`, `module.ts`, and `statements.ts`. That fix resolved the crash but introduced this type leakage. The root cause of both the crash and the leakage was the same: the told zonker not being consumed. Extracting it fixes both — Agent C's changes were reverted.

**Fix:** Destructure `{ constraints, metas, zonker: toldZonker }` from `listen()` and compose `toldZonker` into the final zonker chain.

**File:** `src/elaboration/module.ts`.
