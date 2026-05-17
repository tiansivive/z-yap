---
tags:
- verification
- mechanism
- planned
- pattern
- backend
- sat
- compiler
- reference
- elaboration
- inference
- normalization
- tracing
- migration
- infrastructure
- milestone
- principle
- recursion
---
# Theory plugin interface (planned)

API sketch in `docs/SMT-SOLVER.md` §Theory registration:

```ts
Theory = { name; init; assertLit; check; push; pop }
```

Architecture choice in §Proposed architecture: DPLL(T)/CDCL(T) with shared term arena and theory plugins (EUF, arithmetic, strings, rows, quantifier engine).

No TypeScript export implementing this exists under `src/verification/` today; integration point is prospective alongside planned `Solver` type (`assert`, `check`, `push`, `pop`, `explain`) in same doc §Solver runtime.

Contrast with current code: `VerificationServiceV2` is constructed with a Z3 `Context` directly (`src/verification/V2/service.ts`), not a `VerificationBackend.solve(vc, obligations)` hook.
