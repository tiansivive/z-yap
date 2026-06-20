---
tags:
  - thread
  - modality
  - multiplicity
  - type-system
  - elaboration
  - verification
  - inference
  - principle
---
# Usage Semantics

QTT-inspired multiplicities, modal representation, usage inference, and enforcement.
From surface annotations through elaboration's Modal wrappers to verification's
modal phase.

## Sequence

1. **Modal type theory** [[modal-type-theory]] — reference
   Graded modal type theory as a framework. Atkey's QTT calculus, Brady's Idris 2.

2. **Modality system** [[modality-system]] — concept
   Yap's dual-dimension design: quantity + liquid in one Modal wrapper, extensible.

3. **Usage semantics** [[usage-semantics]] — concept
   {0, 1, ω} semiring multiplicities, QTT/Idris inspiration, composition rules.

4. **Verification modal phase** [[verification-modal-phase]] — decision
   Modal checking in verification, not inline during elaboration. Jhala/Vazou precedent.

5. **Modalities hub** [[modalities]] — hub
   Domain entry point. Links theory, system, semantics, decisions, extensions.

6. **Modality polymorphism** [[modality-polymorphism]] — speculative
   Polymorphism over grades. Requires grade metavariables and solving infrastructure.

7. **Effects as modality** [[effects-as-modality]] — speculative
   Effect indices as a third modality dimension alongside quantity and liquid.

8. **QTT paper** [[idris-1-qtt-paper]] — reference
   Brady's QTT in Idris 2 (ECOOP 2021). Primary implementation precedent.

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[modalities]] — Hub concept
- RELIES_ON → [[modal-type-theory]] — Foundational theory
- RELIES_ON → [[modality-system]] — Yap's modality design
- INCLUDES → [[usage-semantics]]
- RELIES_ON → [[verification-modal-phase]] — Modal phase decision
- INCLUDES → [[modality-polymorphism]]
- INCLUDES → [[effects-as-modality]]
- REFERENCES → [[idris-1-qtt-paper]] — QTT paper reference

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[gram-evolution.thread]] ← SHARED_WITH — CRUD depends on multiplicity
- [[type-erasure]] ← INCLUDED_IN — QTT drives principled erasure
- [[lacks-exclusion-type-operator]] ← INFORMS — Effect exclusion is a usage/effect-row design pressure

<!-- connections:end -->
