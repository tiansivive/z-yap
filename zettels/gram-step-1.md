---
tags:
  [
    lowering,
    migration,
    in-progress,
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

**Anchored implementation:** `.cursor/plans/gram-implementation.md` — graph data structure, `translate.ts` from `EB.Term`, display, tests.

**What exists:** `translate` walks elaboration terms into `Graph` values; `pipeline/descriptor.ts` `Initial` vocabulary already lists node tags including `RESET` and `SHIFT` (translation emits them). `compile` chains `translate` → configured pass pipeline → `verify`.

**Not the same as MIR parity:** MIR lowering implements shift/reset state machines (`src/lowering/continuations/`); GRAM pipeline tests mark shift/reset coverage as skipped until a GRAM lowering pass lands.

Step 1 is the **graph + translation handshake**; η / saturate / closure passes (`src/GRAM/passes/`) sit on top of that substrate.
