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
