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

**Verified in Yap:** `src/verification/V2/` translates refinements and λ-calculus fragments to Z3 (`z3-solver`), generates verification conditions, and runs the solver (`src/verification/ARCHITECTURE.md`, tests under `src/verification/__tests__/`). Pipeline explorer exposes VC text via `EB.Mod.verify` + pretty printers (`src/cli/explore/pipeline.ts`).

Architectural parallel: refinements stay mostly **annotations + VC generation**, not full dependent proof tactics — same coarse split as Liquid Haskell, on Yap’s dependent core.
