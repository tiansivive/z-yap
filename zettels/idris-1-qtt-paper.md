---
tags:
  - modality
  - type-system
  - dependent
  - research
  - paper
  - reference
  - language
---
# Brady — Quantitative Type Theory in Idris 2

[Idris 2: Quantitative Type Theory in Practice](https://doi.org/10.4230/LIPIcs.ECOOP.2021.9). Edwin Brady. ECOOP 2021 (LIPIcs 194).

Describes Idris 2's core language: Quantitative Type Theory tags every binding with a usage grade from a semiring ({0, 1, ω}), enabling compile-time reasoning about erasure, linearity, and related program transformations while retaining full dependent typing.

## Key contributions

- Demonstrates QTT is practical as a core language for a general-purpose dependently typed language, not just a theoretical calculus
- Shows how 0-quantity enables principled erasure: type-level arguments that don't affect runtime can be compiled away
- Shows how 1-quantity enables linearity-flavored APIs without a separate linear type system
- Addresses the tension between dependent types (which need to inspect values at the type level) and linearity (which restricts use) via the 0-quantity escape hatch

## Foundational calculus

The theoretical foundation is Robert Atkey's **Syntax and Semantics of Quantitative Type Theory** (LICS 2018), which Brady cites and builds on. Atkey proves that a dependent type theory parameterized by a usage semiring preserves subject reduction and type safety. See [[modal-type-theory]] for the broader theoretical context.

## Relationship to Yap

Yap's usage semantics ([[usage-semantics]]) shares Idris 2's grade vocabulary ({0, 1, ω}) and design approach. The primary divergence is that Yap composes quantity with liquid refinements in a unified modal wrapper ([[modality-system]]) and defers modal checking to the verification pass ([[verification-modal-phase]]) rather than checking inline during elaboration.

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[modalities]] — Quantity tracking
- INSPIRES → [[mode-annotation-strategy]] — QTT multiplicities drive access mode
- INSPIRES → [[gram-crud-enrichment]] — Compile-time uniqueness from types

**Incoming**
- [[usage-semantics]] ← GROUNDED_IN — Idris 2 implementation precedent
- [[usage-semantics.thread]] ← REFERENCES — QTT paper reference

<!-- connections:end -->
