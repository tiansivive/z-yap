---
tags:
  - continuation
  - elaboration
  - verification
  - ast
  - concept
  - mechanism
  - in-progress
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

<!-- connections:start -->

## Connections

**Outgoing**
- SUPERSEDES → [[continuation-binders]] — Replaces skolem-meta indirection with explicit Bubble node
- ADDRESSES → [[missing-spec-shift-reset]] — Makes nondeterministic semantics explicit in AST
- ENABLES → [[shift-reset-verification]] — Carries values for VC generation
- APPLIES_TO → [[shift-reset]] — New EB.Term constructor at shift use sites
- COMPOSES_WITH → [[gram-shift-reset-pass]] — GRAM already has bubble concept; aligns vocabulary
- USES → [[nondeterminism]] — Resume values from nondeterminism.solution
- USES → [[answer-type-polymorphism]] — ann carries answer type A

**Incoming**
- [[direct-style-lowering.adr]] ← RELIES_ON — EB-level handling feeds this lowering
- [[shift-reset-verification]] ← RELIES_ON — Needs Bubble in EB.Term
- [[open-shift-verification]] ← MOTIVATES — Design for symbolic mode upfront
- [[session-bubble-verification-design]] ← PRODUCES
- [[delimited-continuations.thread]] ← INCLUDES
- [[bubble-semantics-phase1.implementation]] ← IMPLEMENTS — Phase 1 implementation
- [[tell-listen-resumption-refactor]] ← ADDRESSES — Refactors how resumption values flow to Bubble

<!-- connections:end -->
