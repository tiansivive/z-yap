---
tags:
- research
- reference
- verification
- sat
- quantifiers
- arithmetic
- solver
- implemented
- modality
- type-system
---
# Liquid Haskell (Influence)

[Liquid Haskell](https://github.com/ucsd-progsys/liquidhaskell) — refinement predicates over Haskell types; obligations discharged by **SMT** (typically Z3-class solvers).

**Verified in Yap:** `src/verification/V2/` lowers refinements into **IVL** verification conditions (`translate.ts`), exercises them through the **in-tree CDCL(T)** solver (tests under `src/verification/__tests__/` and `src/verification/solver/__tests__/`), and can still round-trip IVL to Z3 via **`z3.adapter.ts`**. **`pnpm yap explore`** exposes **IVL + Trace** tabs (`src/cli/explore/pipeline.ts`, [[pipeline-explorer]]).

Architectural parallel: refinements stay mostly **annotations + VC generation**, not full dependent proof tactics — same coarse split as Liquid Haskell, on Yap’s dependent core.
