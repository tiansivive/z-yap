---
tags:
  - decision
  - verification
  - modality
  - multiplicity
  - elaboration
  - inference
  - principle
  - type-system
  - dependent
---
# Verification as modal phase

**Decision:** Modal semantics — quantity checking, liquid refinement discharge — are handled in the verification pass, not inline during elaboration. Elaboration produces fully inferred and normalized types first; verification then checks modal constraints against those resolved types.

## Rationale

**Separation from inference.** An earlier exploratory pass included usage checking directly in elaboration. It proved the semantics worked but was awkward: usage accounting tangled with type inference, making both harder to reason about and extend independently. Separating them lets elaboration focus on structural type inference (bidirectional checking, unification, generalization) while verification handles all modal obligations.

**Complete type information.** Modal checking benefits from seeing fully resolved types. Quantity checking needs to know the final type of each binding (not an in-progress metavariable); liquid refinement discharge needs normalized types for VC generation. Running modal checks after elaboration guarantees this.

**Jhala and Vazou precedent.** The approach aligns with the recommendation in the liquid type checking literature: refinement checking works best as a phase that runs after standard type inference, operating on fully elaborated terms with known types.

**Unified modal pass.** Since liquid refinements already require a separate verification pass, handling quantity checking in the same pass avoids adding yet another phase. Both are modal obligations — different dimensions of the same system ([[modality-system]]) — and can be discharged uniformly.

## Implications

Elaboration strips modal wrappers from synthesized types (`stripModalities`) so inference sees clean structural types. The modal information is preserved in the AST and available to verification. This is deliberate, not drift — the strip is the boundary between the inference phase and the modal phase.
