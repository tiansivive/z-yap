---
tags:
  - bug
  - deferred
  - upstream
  - verification
  - ivl
  - refinement
  - label
  - formula
  - row-types
  - solver
refs:
  - thread:verification-backend
  - thread:pipeline-stabilization
  - code:tiansivive/yap#9
---

# IVL formula translation rejects labels

A `:label` reference that reaches verification-condition synthesis inside arithmetic is not translatable to a formula: the IVL formula translator in `verification/V2/synth.ts` has no case for the `Label` variable form and rejects it.

Labels are a record-layer name that the value layer resolves to a field; verification translates value terms into IVL formulas but was built before label references appeared in checkable positions, so a label surviving into a refinement obligation has no formula image. Verifying a refinement over a record whose fields reference sibling labels therefore cannot produce a VC.

The gap is a missing translation case, not a solver limitation — the label must be resolved to its field term (the same resolution the value layer performs) before formula synthesis, or synthesis must handle the `Label` form directly.

<!-- connections:start -->

## Connections

**Incoming**
- [[gram-label-resolution-pass]] ← REVEALS — Label in refinement arithmetic has no IVL formula image
- [[verification-backend.thread]] ← INCLUDES — Missing Label case in formula synthesis
- [[pipeline-stabilization.thread]] ← INCLUDES — Surfaced auditing the label pipeline

<!-- connections:end -->
