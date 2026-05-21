---
tags:
  - continuation
  - elaboration
  - verification
  - ast
  - concept
  - mechanism
  - planned
  - needs-design
  - inference
  - normalization
  - lowering
  - codegen
  - graph
---
# Bubble Semantics

A proposed `EB.Term` constructor replacing the current `Var(skolem)` + `state.skolems` indirection at shift use sites.

**Shape:** `{ type: "Bubble"; id: number; ann: NF.Value; values: NF.Value[]; shift: Term }` where `id` is the skolem meta id, `ann` is the inferred type of the shift expression (with refinement), `values` is the list of concrete resume argument values collected from `state.nondeterminism.solution`, and `shift` is the shift handler body.

**Created in:** `src/elaboration/inference/shift.ts`, after the shift body is checked and resume values are collected. Replaces the current pattern where `infer` returns `Var(skolem)` and stores the `Shift` node in `state.skolems[skolem.val]`.

**Benefits:**
- Self-contained: all information at the use site, no indirection through mutable state
- Verification: `values` enables concrete formula expansion; `ann` enables symbolic quantification
- Lowering: `shift` field carries the handler for MIR state machine generation
- Evaluation: runs the shift handler as before (stack capture semantics unchanged)
- Display: pretty-prints as `bubble#N` rather than `?N`

**Impacts:** every EB.Term traversal pass (implicits, metas, pretty, lowering, GRAM), plus verification synth/check, evaluation. GRAM already has a `bubble` concept in its shift-reset pass — this aligns EB with GRAM's vocabulary.

**Replaces:** the `Var(skolem)` representation where the skolem is excluded from generalization via `state.skolems` filtering in `NF.generalize`.
