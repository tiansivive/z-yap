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
    legacy,
    tooling,
    ast,
    mir,
  ]
---
# tmp.ts Pipeline Stub (migration placeholder)

Some migration notes name `inference.v2/tmp.ts` and `checking.v2/tmp.ts` as placeholders for a full CST-based infer/check split.

**Live layout:** Inference dispatches from `src/elaboration/elaborate.ts` via `ts-pattern` into `src/elaboration/inference/`; checking lives in `src/elaboration/check.ts`. Both use `V2.Do` / `V2.track` from `src/elaboration/shared/monad.v2.ts`. The `inference.v2/` / `checking.v2/` directory names are historical — no `tmp.ts` stubs sit under `src/elaboration/` in this tree.

<!-- connections:start -->

## Connections

**Incoming**
- [[v2-elaboration-pipeline]] ← OBSOLETES — The live pipeline replaced the planned tmp.ts stubs; the stubs never materialised

<!-- connections:end -->
