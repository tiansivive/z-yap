---
tags:
  - verification
  - row-types
  - dependent
  - needs-design
  - mechanism
  - sat
  - principle
  - backend
---
# Row theory

Row reasoning in verification must be *structural* — aligned with how rows work in elaboration — rather than encoded as opaque terms in a generic theory like EUF or arrays.

## The principle

Elaboration's row semantics are label-based: rows decompose by label, unify field-wise, and handle openness through row variables solved against extensions. The verification side must respect the same structure. If rows are flattened into uninterpreted sorts or encoded as array-like sequences, the solver loses the structural information that makes row reasoning precise — label identity, extension order, tail unification.

This is one of the key motivations for the owned-solver direction ([[z3-replacement.adr]], [[required-theory-support]]): Z3 has no native row theory, so row-typed formulas degrade to uninterpreted sorts and lose structural precision. An owned engine can host a theory plugin that shares the same row vocabulary as elaboration.

## IVL representation

IVL includes row terms (`Empty`, label `Extend` with value + rest, tail `Var`) mirroring elaboration's `R.Row` structure. This gives the solver's row reasoning the same decomposition primitives that unification uses.

## Open design

The specific shape of a row theory plugin — whether it's a dedicated CDCL(T) theory, an encoding into existing theories, or something else entirely — is open. What's settled is the *alignment principle*: whatever mechanism handles rows in verification must preserve the structural semantics that elaboration establishes.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[theory-plugin-interface]] — Row containment
- MIRRORS → [[row-unification-mechanism]] — Same label decomposition
- PRESERVES → [[verification-pipeline]] — subtype.contains() semantics
- IMPLEMENTS → [[row-polymorphism]] — Width subtyping, containment
- USES → [[cdcl-t-solver]] — Emits child obligations for field values
- DELEGATES_TO → [[cdcl-t-solver]] — Nested obligation emission

**Incoming**
- [[milestone-4-rows]] ← PRODUCES — Row module
- [[row-types.thread]] ← RELIES_ON — Structural row reasoning principle
- [[design-row-theory-verification]] ← ADDRESSES — Design task for the concept

<!-- connections:end -->
