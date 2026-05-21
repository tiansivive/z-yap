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

No implementation planned yet. The Bubble design in [[bubble-semantics]] supports both concrete and symbolic modes (via the `values` list: non-empty for concrete, empty for symbolic) to avoid a future redesign when this becomes needed.

Cross-module effects would also need effect signature export/import — currently out of scope since Yap has no module system, but the verification strategy should not preclude it.
