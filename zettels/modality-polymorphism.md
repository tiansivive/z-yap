---
tags:
- modality
- type-system
- inference
- elaboration
- unification
- planned
- polymorphism
- concept
- solver
- ast
- compiler
- reference
- migration
---
# Modality polymorphism

There is no concrete syntax or elaboration support for binding over multiplicity variables (no modality metavariables in `src/elaboration/syntax/term.ts` beyond fixed `Q.Multiplicity` on `Modal.Annotations`).

Roadmap prose in `.github/copilot-instructions.md` lists “modality polymorphism” among R&D items; no separate `ROADMAP.md` exists in this repo snapshot.

Technically it would intersect commented usage constraints (`src/elaboration/solver/solver.ts`), zonking (`Sub`), and the decision to strip inferred modal types (`stripModalities` in `src/elaboration/elaborate.ts`). Until those pieces carry graded information through solving, polymorphism over grades remains unspecified.
