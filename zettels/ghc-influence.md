---
tags:
- research
- reference
- type-system
- inference
- elaboration
- constraint
- solver
- monad
- compiler
- in-progress
---
# GHC (Influence)

[GHC](https://www.haskell.org/ghc/) — production Haskell; type classes, levity/representation polymorphism, constraint-heavy inference.

**Useful analogy:** constraints accumulated during elaboration and discharged in a solver pass resemble “generate constraints, solve later,” though Yap’s mechanism is its **V2 elaboration monad** (`src/elaboration/shared/monad.v2.ts`) plus `src/elaboration/solver/solver.ts`, not GHC’s Wanted/Given machinery.

**No direct citations:** Implicit-resolution commentary in `solver.ts` compares behavior to **Idris 2 and Lean**, not GHC. Treat GHC as **cultural precedent** for mature FP inference pipelines, not as traced lineage in code comments.
