---
tags:
  - elaboration
  - normalization
  - generalization
  - metavariable
  - type-system
  - inference
  - design
  - question
  - needs-design
  - concern
  - deferred
---
# Instantiate's `Any` default for unconstrained metas

After generalization, `instantiate` replaces any still-unconstrained metavariable with a default keyed on its kind: a `Row`-kinded meta becomes the empty row, a `Type`-kinded meta becomes `Any`. `Any` exists only as this fallback — no unification rule mentions it, no elaboration path depends on it, and it carries no top/bottom semantics. Its appearance in an inferred type is a signal that a meta escaped without being solved or generalized, not a meaningful result.

The open question: should such metas be **generalized** (yielding the principal type, at the cost of an extra binder) rather than **defaulted**? Transitive kind generalization ([[generalization]]) already removes one source of `Any` by turning unconstrained kind metas into `Π(_: Type)` binders; a residual `Any` default remains for metas that reach `instantiate` neither solved nor generalized. Resolving it requires a position on what `Any` *is*: a real type with typing rules (a top type), a transient inference placeholder that should never surface, or a construct to eliminate entirely in favour of always generalizing. It also trades against ergonomics — a fully generalized principal type is verbose, and a user may prefer to annotate rather than read many inferred binders, which raises how annotations interact with the generalized shape.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[implicit-generalization-semantics]] — Same generalize-not-default principle, now at the kind level

**Incoming**
- [[generalization]] ← MOTIVATES — Transitive kind gen removes one Any source; the residual default is the open question
- [[variant-match-generalization.session]] ← PRODUCED — Design question surfaced in session
- [[elaboration-v2.thread]] ← INCLUDES — Open generalization/defaulting design gap
- [[global-pending-queue]] ← INCLUDES — Deferred design discussion

<!-- connections:end -->
