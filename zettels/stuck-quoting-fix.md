---
tags:
  - bugfix
  - implemented
  - normalization
  - elaboration
  - explorer
  - evaluation
  - display
  - compiler
---

# Stuck quoting fix

The explorer snippet `\obj -> obj.x` with `deBruijn: "both"` caused a segmentation fault via stack overflow in `NF.quote`.

**Root cause:** Stuck projections and injections are encoded as synthetic lambdas in `evaluation.v2.ts` — e.g. `Neutral(App(Lambda("$proj_x", Closure(ctx, Proj("x", Bound(0)))), base))`. When `quote` encounters the `App`, it quotes the lambda by applying its closure to a fresh `Rigid`, which evaluates the projection on that rigid — producing another stuck projection with the same encoding. Infinite recursion.

**Fix:** Added `NF.Patterns.StuckProj` and `NF.Patterns.StuckInj` in `normalization/syntax/term.ts` matching the `$proj_`/`$inj_` binder prefixes. `quoting.ts` recognizes these patterns and short-circuits to direct `EB.Constructors.Proj`/`EB.Constructors.Inj` construction, avoiding the closure application cycle.

**Files:** `src/elaboration/normalization/quoting.ts`, `src/elaboration/normalization/syntax/term.ts`, `src/elaboration/normalization/evaluation.v2.ts`, `src/elaboration/normalization/arity.ts`.

**Visibility:** Only triggered by `deBruijn: "both"` because that mode quotes the normalized value back to an EB term for display alongside de Bruijn indices. Default mode doesn't quote stuck values.
