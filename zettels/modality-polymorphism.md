---
tags:
  - modality
  - type-system
  - inference
  - elaboration
  - unification
  - speculative
  - polymorphism
  - concept
  - dependent
---
# Modality polymorphism

Polymorphism over modality grades: a function that is parametric in the usage quantity of its argument, rather than fixing it to 0, 1, or ω at the definition site.

## What it would mean

A grade-polymorphic binder `f : (x :_{m} A) -> B` could be instantiated at different usage grades by different callers. This generalizes the current system where each binder's quantity is a concrete literal from the {0, 1, ω} semiring.

## What it requires

Grade polymorphism needs modality metavariables — unification variables ranging over grades — and solving infrastructure to handle grade constraints. This intersects the constraint solver ([[constraint-solver]]) and zonking ([[zonking]]), since grade metas need to be solvable and substitutable just like type metas.

It also depends on usage enforcement being functional ([[verification-modal-phase]]) — there's no point in being polymorphic over grades that aren't checked.

## Status

Exploratory. No grade metavariables or grade-polymorphic binders exist in the current system. The {0, 1, ω} semiring and `Modal.Annotations` wrapper ([[modality-system]]) are designed to be extensible in this direction, but the extension requires substantial inference and solving work.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[modalities]] — Polymorphism over modalities
- REQUIRES → [[verification-modal-phase]] — Depends on enforcement being functional

**Incoming**
- [[usage-semantics.thread]] ← INCLUDES
- [[implicits-as-coeffects-exploration]] ← INFORMS — Graded modalities from coeffects

<!-- connections:end -->
