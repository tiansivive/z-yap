---
tags:
- modality
- multiplicity
- verification
- elaboration
- planned
- needs-design
- constraint
- solver
- sat
- type-system
- mechanism
- compiler
- inference
- cli
- migration
- ownership
- mutation
---
# Modality enforcement

**Elaboration today:** `Constraint` in `src/elaboration/solver/solver.ts` handles `assign` and `resolve`; `usage` constraints and their `V2.tell("constraint", { type: "usage", ... })` call sites in `check.ts`, `lambda.ts`, `statements.ts`, and `block.ts` remain commented—reserved hooks for graded usage solving.

**Verification today:** liquid refinements under `NF.Modal` are checked via Z3 (`src/verification/V2/`); extending the same pass to discharge QTT multiplicity obligations is the natural next step.

**Lookup / usages vectors:** bound-variable lookup returns zero usage vectors; sigma multiplicity integration is marked `QUESTION` in `src/elaboration/shared/context.ts`. Row sigma defaults include `multiplicity: Q.Many` in `extendSigmaEnv`.

Full enforcement would wire usage constraints (or equivalent analysis), align lookup vectors with binder annotations, and carry grades through verification beyond liquid predicates.

**Downstream consumer:** GRAM's CRUD enrichment pass ([[gram-crud-enrichment]]) reads multiplicity to choose access modes (`shared` vs `exclusive`). While elaboration still defaults unknown grades conservatively, the CRUD pass uses `"shared"` everywhere—sound, with FBIP optimizations opening up as usage solving lands.
