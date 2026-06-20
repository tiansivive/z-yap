---
tags:
- research
- reference
- verification
- liquid
- validity
- refinement
- sat
- quantifiers
- arithmetic
- solver
- implemented
- modality
- type-system
---
# Liquid Haskell (Influence)

[Liquid Haskell](https://github.com/ucsd-progsys/liquidhaskell) — refinement predicates over Haskell types; obligations discharged by **SMT** (typically Z3-class solvers). Liquid abbreviates **Logically Qualified Data Types**, from Rondon, Kawaguchi, and Jhala's Liquid Types work.

**Verified in Yap:** `src/verification/V2/` lowers refinements into **IVL** verification conditions (`translate.ts`) and exercises them through the **in-tree CDCL(T)** solver (tests under `src/verification/solver/v2/` and `src/__tests__/integration/`). D-009 adds the validity-discharge layer that turns Liquid VCs into counterexample queries before raw SAT. **`pnpm yap explore`** exposes **IVL + Trace** tabs (`src/cli/explore/pipeline.ts`, [[pipeline-explorer]]).

Architectural parallel: refinements stay mostly **annotations + VC generation**, not full dependent proof tactics — same coarse split as Liquid Haskell, on Yap’s dependent core.

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[refinement-types]] — SMT automation
- INSPIRES → [[smt-translation]] — VC generation pipeline
- INSPIRES → [[vc-ir]] — Formula fragment
- INFORMS → [[liquid-vc-fragment]] — Logically Qualified Data Types and Liquid checking discipline

**Incoming**
- [[first-order-restriction.adr]] ← IMPLEMENTS — Standard Liquid Types convention
- [[vazou-refinement-reflection-2018]] ← INFORMS — Core LH paper
- [[liquid-vc-fragment]] ← GROUNDED_IN — Yap fragment follows the Liquid split

<!-- connections:end -->
