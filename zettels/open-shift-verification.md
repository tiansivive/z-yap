---
tags:
  - continuation
  - verification
  - effect
  - speculative
  - needs-design
  - problem
  - concept
  - quantifiers
---
# Open Shift Verification

Shifts where the resume values are not concretely known: the handler body has free variables (`\k -> k x` where `x` is a parameter), the shift crosses a module boundary, or the continuation escapes to a higher-order context.

The concrete bubble expansion (`φ[bubble := v₁] ∧ … ∧ φ[bubble := vₙ]`) fails here because the value set is open. Requires symbolic quantification: `∀bubble: A. P(bubble) → φ(bubble)` where `P` is derived from the type's refinement predicate rather than an enumeration of concrete values.

This is Yap's analog of ARM (Answer Refinement Modification) — tracking how the handler modifies the answer type's refinement through the continuation. The refinement on the answer type flows backward from `answer.final` to `answer.initial`, constraining what the continuation may return.

Symbolic shift verification remains open design work. The Bubble design in [[bubble-semantics]] supports both concrete and symbolic modes (via the `values` list: non-empty for concrete, empty for symbolic) so concrete expansion need not be redesigned when symbolic quantification is added.

Cross-module effects would need effect signature export/import. Yap's module system is rudimentary (file-level imports, exports, FFI — see [[module-system]]); cross-module shift verification can follow as modules and effect signatures mature.

<!-- connections:start -->

## Connections

**Outgoing**
- MOTIVATES → [[bubble-semantics]] — Design for symbolic mode upfront
- EXTENDS → [[shift-reset-verification]] — Symbolic generalization of concrete expansion
- COMPOSES_WITH → [[effects-as-modality]] — Effect annotations needed for cross-module

**Incoming**
- [[shift-reset-verification]] ← ADDRESSES — Symbolic mode handles open shifts
- [[arm-paper]] ← INFORMS — Theoretical foundation for symbolic mode
- [[session-bubble-verification-design]] ← PRODUCES
- [[delimited-continuations.thread]] ← INCLUDES

<!-- connections:end -->
