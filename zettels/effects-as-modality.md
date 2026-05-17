---
tags:
- modality
- effect
- continuation
- type-system
- speculative
- pattern
- principle
- lowering
- mir
- runtime
- codegen
- project
- research
---
# Effects as modality

No implementation maps algebraic-effect or capability annotations onto `Q.Multiplicity` or `Modal.Annotations`; `shift` / `reset` exist as `EB.Term` variants (`src/elaboration/syntax/term.ts`) with MIR lowering described in-repo (`docs/MIR-LOWERING.md`, `src/lowering/`), not as graded modalities.

This note is a design peg only: reusing `Modal`/`Annotations` for effect indices would need modality discipline that elaboration and verification do not enforce today (`stripModalities` in `src/elaboration/elaborate.ts`; commented usage constraints in `src/elaboration/solver/solver.ts`).

Related exploratory graph notes: `z-yap/zettels/implicits-as-coeffects.md`, `z-yap/zettels/shift-reset-mir-lowering.md`.
