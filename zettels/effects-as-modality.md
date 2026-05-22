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

`shift` / `reset` exist as `EB.Term` variants (`src/elaboration/syntax/term.ts`) with MIR lowering in `src/lowering/continuations/`, separate from `Q.Multiplicity` / `Modal.Annotations`. Algebraic-effect or capability annotations are not wired onto those modality fields today.

Exploratory peg: reusing `Modal`/`Annotations` for effect indices would intersect modality discipline in elaboration (`stripModalities` in `src/elaboration/elaborate.ts`) and the commented usage-constraint hooks in `src/elaboration/solver/solver.ts`.

Related: [[implicits-as-coeffects]], [[shift-reset-mir-lowering]].
