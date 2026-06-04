---
tags:
  - verification
  - continuation
  - ivl
  - planned
  - needs-design
  - mechanism
  - concept
  - quantifiers
  - sat
---
# Shift/Reset Verification

Full verification strategy for shift/reset expressions, replacing the dummy stub.

**IVL representation:** a new `IVL.Term` constructor `Bubble(id, sort)` acts as a universally quantified variable at the Reset boundary. `Build.bubble(id, sort)` constructs it.

**Concrete expansion (closed shifts):** when all resume values are known (finite `values` list in the Bubble), substitute each value into the formula and conjoin: `φ[bubble := v₁] ∧ φ[bubble := v₂] ∧ … ∧ φ[bubble := vₙ]`. This is the common case for single-module programs with explicit `resume` calls.

**Symbolic quantification (open shifts):** when resume values are unknown or the shift crosses a module boundary, emit `∀bubble: A. P(bubble) → φ(bubble)` where `P` is the refinement predicate on the bubble's type. The concrete case is an optimization: `P(x) ≡ (x = v₁ ∨ … ∨ x = vₙ)` distributes to the conjunction above.

**Reset in verification:** verify the body once with Bubble as a free IVL variable. At the Reset boundary, apply expansion or quantification depending on the Bubble's `values` list.

**Shift body verification:** verify the handler body (the argument to `shift`) under the continuation binder. The handler's postcondition must imply the answer type's refinement — this is the ARM (Answer Refinement Modification) constraint.

**Depends on:** [[bubble-semantics]] for the EB.Term representation, [[vc-ir]] for IVL extensions.

<!-- connections:start -->

## Connections

**Outgoing**
- SUPERSEDES → [[shift-reset-verification-stub]] — Replaces dummy with real verification
- EXTENDS → [[verification-pipeline]] — Adds Reset/Bubble cases with quantification
- USES → [[vc-ir]] — IVL Bubble term constructor
- USES → [[answer-type-polymorphism]] — Bubble type = answer type A
- RELIES_ON → [[bubble-semantics]] — Needs Bubble in EB.Term
- ADDRESSES → [[open-shift-verification]] — Symbolic mode handles open shifts

**Incoming**
- [[bubble-semantics]] ← ENABLES — Carries values for VC generation
- [[open-shift-verification]] ← EXTENDS — Symbolic generalization of concrete expansion
- [[arm-paper]] ← INFORMS — ARM = symbolic answer refinement tracking
- [[sekiyama-unno-temporal]] ← INFORMS — Temporal effects + delimited control
- [[session-bubble-verification-design]] ← PRODUCES
- [[delimited-continuations.thread]] ← INCLUDES

<!-- connections:end -->
