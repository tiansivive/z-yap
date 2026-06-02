---
tags:
  - concept
  - type-system
  - modality
  - multiplicity
  - dependent
  - design
  - verification
  - elaboration
  - language
---
# Modality system

Yap's modality system carries multiple modality dimensions in a single `Modal` wrapper on types. Rather than treating usage tracking and refinement predicates as separate mechanisms, they compose as dimensions of one system.

## Current dimensions

**Quantity** — a {0, 1, ω} multiplicity grade governing how many times a binding may be consumed. This is the QTT-inspired dimension; see [[usage-semantics]] for the semiring and design detail.

**Liquid** — a refinement predicate expressing logical constraints on the value. This is the verification dimension; liquid predicates are discharged by the solver during the verification pass. See [[refinement-types]].

Both dimensions live in `Modal.Annotations`, which wraps `EB.Term` and `NF.Value` nodes. Surface syntax parses usage qualifiers (`<0>`, `<1>`, `<*>`) alongside optional refinement annotations.

## Extensibility

The dual-dimension design is intentionally open:

**Compiler lowering** — a `gram` dimension carries user-written DPO rewrite rules consumed by a Kernel pass during graph lowering. The architectural pattern — modal dimensions as the extension surface, with each downstream subsystem reading the dimensions it understands — is captured as ADR in [[extensibility-via-modalities.adr]] and instantiated by [[programmable-gram-passes]].

**Effects as modality** — effect indices (what side effects a computation may perform) could be a third dimension in the same wrapper, tracked and verified alongside quantity and liquid. This is speculative; see [[effects-as-modality]].

**User-defined modalities** — in principle, any property that forms a suitable algebraic structure (a semiring or similar) could be added as a modality dimension: security levels, approximation bounds, resource budgets. This is further out and unexplored.

## Design rationale

Composing modalities in one wrapper rather than layering separate systems avoids the "annotation stacking" problem where each concern adds its own type-level syntax. It also means the verification pass ([[verification-modal-phase]]) handles all modal obligations uniformly rather than needing separate passes per concern.
