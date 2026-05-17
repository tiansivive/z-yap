---
tags:
  [
    migration,
    drift,
    reference,
    problem,
    elaboration,
    inference,
    compiler,
    project,
    incomplete,
    tooling,
    ast,
    mir,
  ]
---
# tmp.ts Pipeline Stub (doc vs tree)

**Docs:** `src/elaboration/ARCHITECTURE.md` (“V2 Migration Modules”) states that `inference.v2/tmp.ts` and `checking.v2/tmp.ts` stubs block wiring full CST-based inference/checking pipelines.

**This repository:** There is **no** `src/elaboration/inference.v2/` or `src/elaboration/checking.v2/` directory and **no** `tmp.ts` under `src/elaboration/`. Actual inference is dispatched from `src/elaboration/elaborate.ts` via `ts-pattern` into modules under `src/elaboration/inference/`; checking lives in `src/elaboration/check.ts`. Both use `V2.Do` / `V2.track` from `src/elaboration/shared/monad.v2.ts`.

Treat the stub narrative as **migration-plan / architecture-doc content**, not something verified by files in this checkout. For parity status, prefer `brainstorming/yap/V2-MIGRATION.md` plus a fresh directory listing.
