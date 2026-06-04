---
tags:
  - concept
  - type-system
  - modality
  - multiplicity
  - dependent
  - design
  - elaboration
  - inference
  - principle
  - deferred
---
# Usage semantics

Yap's quantity modality tracks how many times a binding may be consumed, using a {0, 1, ω} semiring of multiplicities inspired by QTT (Atkey, [[modal-type-theory]]) and Idris 2 (Brady, [[idris-1-qtt-paper]]).

## The semiring

Three grades:
- **Zero** — the binding is erased; it contributes to type checking but generates no runtime code
- **One** — the binding is used exactly once; enables linearity-flavored APIs (resource handles, uniqueness)
- **Many (ω)** — the binding is unrestricted

Grades compose via two operations:
- **Add** — parallel use of a variable in multiple sub-expressions (e.g. both branches of an if)
- **Multiply** — nested use of a variable inside a context that is itself used with some grade

These are the standard QTT semiring operations. They govern how usage vectors propagate through elaboration: each binding site starts with a declared grade, and the type system checks that the body's actual usage is compatible.

## Idris influence

Idris 2 is the primary implementation precedent. Yap shares the same grade vocabulary ({0, 1, ω}) and the same design neighborhood: quantity on binders, semiring tracking through the core language, compile-time erasure for 0-quantity. The foundational calculus is Atkey's QTT (LICS 2018), which Idris 2 realizes in practice.

## Current state

Usage vectors are threaded through inference alongside terms and types, but the constraint solver does not yet consume usage constraints — the infrastructure is scaffolded but not wired. See [[verification-modal-phase]] for the design decision on where enforcement will live.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[modal-type-theory]] — QTT semiring in Yap
- GROUNDED_IN → [[idris-1-qtt-paper]] — Idris 2 implementation precedent
- EXTENDS → [[modalities]] — Quantity dimension of the modal system

**Incoming**
- [[usage-semantics.thread]] ← INCLUDES
- [[extensibility-via-modalities.adr]] ← GENERALIZES — Usage pass reads quantity dimension
- [[singleshot-static-specialization]] ← RELIES_ON — Needs continuation-parameter usage upper bound

<!-- connections:end -->
