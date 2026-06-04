---
tags:
- verification
- milestone
- implemented
- reference
- ir
- normalization
- sat
- dependent
- backend
- project
- inference
- tooling
- principle
---
# Milestone 1: IR boundary

**Goal:** solver-neutral VC IR before CDCL(T) theories.

**Deliverables:** IVL sorts/terms/formulas (`src/verification/solver/ivl/types.ts`), builders and printer (`build.ts`, `print.ts`), translation from `NF.Value` into IVL, normalization/Skolem/CNF passes feeding the solver stack.

**Structural target:** `VerificationArtefacts.vc` as `IVL.Formula`; obligations and `TranslationTools` emit IVL instead of Z3 (`mkSort`, term/formula builders, `quantify`).

**Integration record:** work first landed on **`ivl-sat-solver`**, merged into normal development alongside [[m1-implementation]]. (**Not** synonymous with completing later milestones — strings/rows/explanations remain open; see [[verification-backend.thread]].)

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCES → [[vc-ir]] — First deliverable
- PRODUCES → [[translation-boundary-vc]] — Translation tools
- FOLLOWS → [[z3-replacement.adr]] — First step

**Incoming**
- [[milestone-2-euf-quant-lia]] ← FOLLOWS — After IR
- [[verification-backend.thread]] ← INCLUDES
- [[m1-implementation]] ← IMPLEMENTS — Realizes the milestone
- [[m1-implementation]] ← ADDRESSES — Closes the open work item

<!-- connections:end -->
