---
tags:
  - design
  - needs-design
  - backlog
  - gram
  - modality
  - syntax
  - parser
  - language
  - sugar
  - concern
  - elaboration
refs:
  - thread:gram-evolution
---
# GRAM modality vs pragma

The `%ruleName` annotation occupies the modal system (`Annotations.gram`) but does not affect type behaviour. QTT multiplicities and liquid refinements alter the type-level semantics of a term; the gram annotation is an inert compilation directive.

## Distinction

Modalities encode type-level constraints: a linear term cannot be duplicated; a refined term carries a predicate. These affect elaboration, verification, and the operational semantics of the program.

The gram annotation marks a subgraph for rewriting during lowering. It does not change the term's type, does not affect verification, and erases before runtime. The annotation is metadata for the compiler, not a semantic property of the value.

## Concern

Overloading the modal system with non-modal annotations conflates two distinct concepts:
- **Modality**: type-level property with semantic consequences
- **Pragma**: compilation directive without type-level effect

Surface syntax and elaboration representation may warrant separation: `%ruleName` could become a distinct pragma form rather than a modal dimension.

## Options

1. **Keep as modal** — accept the overloading; the modal system is already the carrier for term-level annotations
2. **Separate pragma syntax** — introduce `#pragma ruleName` or similar, elaborating to a distinct AST node
3. **Annotation layer** — a general-purpose annotation mechanism (like Rust `#[...]` or Java `@...`) orthogonal to modalities

Option 1 is the status quo. Option 2 separates concerns cleanly. Option 3 generalises beyond gram rules.

<!-- connections:start -->

## Connections

**Outgoing**
- DISCOVERED_BY → [[programmable-gram-passes-mvp-retrospective]] — Design issue discovered during MVP impl
- APPLIES_TO → [[modality-system]] — Pragma separation applies to modality design

**Incoming**
- [[gram-evolution.thread]] ← INCLUDES — Design issue tracked in the thread

<!-- connections:end -->
