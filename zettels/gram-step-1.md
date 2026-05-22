---
tags:
  [
    lowering,
    migration,
    implemented,
    graph,
    ir,
    elaboration,
    parser,
    mir,
    compiler,
    infrastructure,
    milestone,
    project,
    testing,
  ]
---

# GRAM step 1 (substrate)

**Status: complete.** The graph substrate and all initial passes are implemented and tested.

**Anchored implementation:** `src/GRAM/` — graph data structure, `translate.ts` from `EB.Term`, display, tests under `src/GRAM/__tests__/`.

**What exists:** `translate` walks elaboration terms into `Graph` values including pattern graph nodes (`pat:*`). `compile` chains `translate` → configured pass pipeline (`eta → saturate → shiftReset → pattern → closure`) → `verify`. All five passes are implemented with full test coverage.

Step 1 was the **graph + translation handshake**; subsequent passes (η, saturate, shift-reset enrichment, pattern decision tree, closure) built on that substrate to reach feature parity with MIR for translation and analysis.
