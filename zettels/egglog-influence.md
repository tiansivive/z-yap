---
tags:
- research
- reference
- rewriting
- sat
- mir
- lowering
- compiler
- pattern
- infrastructure
- planned
---
# egglog (Influence)

[egglog](https://github.com/egraphs-good/egglog) — e-graphs plus Datalog-style rules for equality saturation and incremental relational facts.

**Not the same as Yap’s GRAM “saturate” pass.** `src/GRAM/passes/saturate.ts` rewrites application spines so **primitive externals reach a fixed arity** (metadata `saturated: true`), then rewrites saturated primops — local graph rules, not an e-graph congruence closure.

**Where the analogy is explicit:** `z-yap/zettels/logram.md` sketches **LoGRAM** (triple-store / Datalog over graph facts) and names egglog as spirit for combining relational queries with rewriting. LoGRAM remains a design direction—GRAM today implements local graph passes (`src/GRAM/passes/`), not a full Datalog substrate.

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[logram]] — Equality saturation
- INSPIRES → [[dpo-rewriting]] — E-graph rewriting
- MIRRORS → [[logram]] — Equality saturation ↔ graph saturation

**Incoming**
- [[logram]] ← USES — Equality saturation substrate

<!-- connections:end -->
