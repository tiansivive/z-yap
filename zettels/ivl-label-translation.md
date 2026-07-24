---
tags:
  - bug
  - bugfix
  - resolved
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
  - branch:label-fixes
  - code:tiansivive/yap#14
---

# IVL formula translation rejects labels

A `:label` reference that reaches verification-condition synthesis inside arithmetic is not translatable to a formula: the IVL term translator has no case for the `Label` variable form and rejects it. (The gap is in the `term()` translator, not synthesis — synthesis of a bare label resolves its type; the untranslatable case is a label surviving inside a refinement predicate.)

Labels are a record-layer name that the value layer resolves to a field; verification translates value terms into IVL formulas but was built before label references appeared in checkable positions, so a label surviving into a refinement obligation has no formula image. Verifying a refinement over a record whose fields reference sibling labels therefore cannot produce a VC.

The gap is a missing translation case, not a solver limitation — the label must be resolved to its field term (the same resolution the value layer performs) before formula synthesis, or synthesis must handle the `Label` form directly.

Resolved (PR #14). The sibling-label scope is re-established at each record boundary ([[verification-label-scope]]), and `term()` resolves a surviving `:label` to its concrete sibling value via `ctx.sigma`, or a logical constant of the field's sort when the record is symbolic. The label only survives to translation in the symbolic case; concrete constructions substitute it away via the sigma-closure application before translation.

This resolution covers dependencies that remain label values until the verification boundary. A nested refinement can instead capture an already-symbolic outer-field projection while its record type forms; that closure-context case is tracked by [[nested-refinement-outer-label-capture.bug]].

<!-- connections:start -->

## Connections

**Incoming**
- [[gram-label-resolution-pass]] ← REVEALS — Label in refinement arithmetic has no IVL formula image
- [[verification-backend.thread]] ← INCLUDES — Missing Label case in formula synthesis
- [[pipeline-stabilization.thread]] ← INCLUDES — Surfaced auditing the label pipeline
- [[label-refinement-verification.session]] ← RESOLVED — Verification label translation fixed
- [[verification-label-scope]] ← RESOLVES — Boundary collection closes the label-translation gap
- [[nested-refinement-outer-label-capture.bug]] ← EXTENDS — Direct labels translate after PR #14; a nested closure can retain an earlier blocked projection

<!-- connections:end -->
