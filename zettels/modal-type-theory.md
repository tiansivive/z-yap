---
tags:
  - concept
  - type-system
  - modality
  - multiplicity
  - research
  - reference
  - dependent
---
# Modal type theory

Modal type theory extends type systems with modalities — annotations that constrain how values may be used, duplicated, or discarded. A modal type `□ₘ A` says "a value of type A, usable according to mode m."

## Graded modal type theory

In graded modal type theory, modalities form an algebraic structure (typically a semiring) where grades compose through addition (parallel use) and multiplication (nested use). This generalizes binary distinctions (linear/unrestricted) into a spectrum: zero use (erasable), exactly once (linear), unrestricted, or any grade the semiring defines.

Robert Atkey's **Syntax and Semantics of Quantitative Type Theory** (LICS 2018) provides the foundational calculus. It shows how a dependent type theory can be parameterized by a semiring of usage grades while preserving subject reduction and type safety. Each binding carries a grade; the type system tracks that the body respects the grade via semiring arithmetic.

## From theory to practice

Edwin Brady's **Idris 2** (ECOOP 2021, [[idris-1-qtt-paper]]) is the primary implementation precedent. Idris 2's core language is QTT: every binding carries a quantity (0, 1, ω), and the type checker verifies that usage respects the annotation. This enables compile-time erasure (0-quantity arguments don't generate code), linearity-flavored APIs (1-quantity), and unrestricted use (ω).

Petricek and Orchard's coeffect framework ([[petricek-orchard]]) provides a complementary perspective: tracking what a computation *needs* from its context (coeffects) rather than what it *produces* (effects).

## Relationship to Yap

Yap draws on this tradition but extends it: the modal wrapper carries *multiple* modality dimensions (quantity and liquid refinements) in a single system, rather than treating them as separate concerns. See [[modality-system]] for the design and [[usage-semantics]] for the specific QTT-inspired quantity dimension.

<!-- connections:start -->

## Connections

**Incoming**
- [[usage-semantics]] ← IMPLEMENTS — QTT semiring in Yap
- [[modality-system]] ← IMPLEMENTS — Multi-dimension modal design
- [[usage-semantics.thread]] ← RELIES_ON — Foundational theory

<!-- connections:end -->
