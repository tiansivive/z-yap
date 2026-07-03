---
tags:
  - deferred
  - design
  - pattern
  - elaboration
  - equality
  - polymorphism
  - typeclasses
  - gram
  - lowering
  - compiler
  - row-types
  - verification
---
# Typed dispatch equality

Pattern dispatch compares discriminants: variant tags, literal values, and projected struct fields. The comparison mechanism should eventually come from elaboration, where types and equality dictionaries are available, rather than from the GRAM bridge or backend stringification.

The hard case is polymorphic equality. A literal branch over numbers, strings, atoms, records, or user-defined data does not have one universal comparison operation with the right semantics and cost model. A typed equality path can select or synthesize the appropriate equality evidence before lowering, so later pipeline stages consume an already-resolved comparison.

This also reframes "discrimination desugaring." GRAM decision trees identify which value to inspect and which branches exist; they should not invent the semantic equality relation. The elaborated match can carry a resolved equality operation, or a prior elaboration pass can make the comparison explicit, leaving GRAM and MIR to lower control flow mechanically.

Backend-efficient dispatch remains a separate optimization. Once equality has been typed, a backend may still choose compare chains, hash dispatch, or integer-tag jump tables when the discriminant domain allows it.

<!-- connections:start -->

## Connections

**Outgoing**
- FOLLOWS → [[variant-discriminant-representation.adr]] — D-010 keeps symbolic tag dispatch while equality design waits
- ADDRESSES → [[gram-pattern-pass]] — Decision trees need typed comparison for non-tag discriminants
- RELIES_ON → [[implicit-resolution]] — Equality evidence is elaboration-time dictionary resolution
- CONSTRAINS → [[tagged-dispatch]] — Efficient backend dispatch follows typed equality, not stringification

**Incoming**
- [[string-dispatch-float-record-bug]] ← MOTIVATES — Mis-stringified values show why dispatch equality must be typed
- [[pattern-matching.thread]] ← INCLUDES
- [[gram-evolution.thread]] ← INCLUDES
- [[global-pending-queue]] ← INCLUDES — Deferred dispatch-equality design

<!-- connections:end -->
