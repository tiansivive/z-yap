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
