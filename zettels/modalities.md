---
tags:
  - type-system
  - modality
  - multiplicity
  - dependent
  - concept
  - hub
  - verification
  - elaboration
---
# Modalities

Hub: [[usage-semantics.thread]]

Modal type theory applied to Yap's type system. Modalities constrain how values are used, tracked, and verified.

## Domain

- **Theory:** [[modal-type-theory]] — graded modal type theory as a framework; Atkey's QTT calculus
- **Yap's system:** [[modality-system]] — dual modalities (quantity + liquid), extensible design
- **Usage semantics:** [[usage-semantics]] — {0, 1, ω} multiplicities, semiring, QTT/Idris inspiration
- **Modal phase:** [[verification-modal-phase]] — modal checking in verification, not elaboration

## Extensions (speculative / planned)

- **Modality polymorphism:** [[modality-polymorphism]] — polymorphism over grades
- **Effects as modality:** [[effects-as-modality]] — effect indices as a third modality dimension

## References

- [[idris-1-qtt-paper]] — Brady's QTT in Idris 2 (ECOOP 2021)
- [[petricek-orchard]] — coeffect framework

## Downstream consumers

- [[refinement-types]] — liquid predicates compose with quantity in `Modal`
- [[gram-crud-enrichment]] — multiplicity drives CRUD access mode selection
- [[verification-pipeline]] — modal obligations discharged in verification pass

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[pi-types]] — Quantity on domain
- COMPOSES_WITH → [[refinement-types]] — Modal + refined
- COERCES_TO → [[pi-types]] — Modal stripping during inference
- COMPOSES_WITH → [[pi-types]] — Graded function arguments

**Incoming**
- [[verification-modal-phase]] ← ADDRESSES — How modal obligations are discharged
- [[modality-polymorphism]] ← EXTENDS — Polymorphism over modalities
- [[refinement-inference]] ← REVISES — Strip → template revision
- [[effects-as-modality]] ← EXTENDS — Effects tracked as modalities
- [[ghc-influence]] ← INSPIRES — Levity polymorphism precedent
- [[idris-1-qtt-paper]] ← INSPIRES — Quantity tracking
- [[vc-ir]] ← ENCODES — Modal verification constraints
- [[modality-system]] ← EXTENDS — Design details of the modal wrapper
- [[usage-semantics]] ← EXTENDS — Quantity dimension of the modal system
- [[usage-semantics.thread]] ← RELIES_ON — Hub concept
- [[gram-crud-enrichment]] ← CONSUMES — Multiplicity drives mode selection
- [[crud-strategy-choice]] ← RELIES_ON — Strategy depends on multiplicity system
- [[mode-annotation-strategy]] ← CONSUMES — Reads quantity from modal nodes
- [[perceus-reuse-analysis]] ← CONTRASTS_WITH — Runtime refcount vs compile-time QTT
- [[counting-immutable-beans]] ← CONTRASTS_WITH — Runtime uniqueness vs compile-time QTT
- [[clean-uniqueness-types]] ← INSPIRES — Uniqueness typing as prior art for QTT
- [[clean-uniqueness-types]] ← CONTRASTS_WITH — Whole-object binary vs per-binding graded
- [[test-coverage-gaps]] ← BLOCKS — Modal test blocked until inference.v2 modal.ts exists
- [[selfification]] ← COMPOSES_WITH — Conjoins self-equality into existing liquid predicate
- [[annotations]] ← COMPOSES_WITH — stripModalities preserves user modalities
- [[strict-vs-lazy]] ← COMPOSES_WITH — Modality system could encode eval strategy

<!-- connections:end -->
