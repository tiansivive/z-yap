---
tags:
  - planned
  - elaboration
  - syntax
  - ast
  - row-types
  - type-system
  - lowering
  - normalization
  - inference
  - mechanism
  - migration
---
# Dedicated row constructors (internal EB)

Surface syntax already distinguishes type-level families — struct, tuple, variant, list — and elaboration dispatches them to separate modules. Internally, however, `EB.Term` encodes several of these families as binary `App` wrapped around literal atoms plus `Row`: `App("Explicit", Lit(Atom("Schema")), Row(row))` and similarly for Struct, Variant, Array.

## The tension

Downstream code — unification, lowering, display, pattern matching — must recover the *intent* (is this a struct? a variant? an array?) by pattern-matching on the literal atom inside the nested App. This works but is fragile: the family identity is implicit in the structure rather than explicit in the AST. Lowering defines dedicated pattern objects (`StructApp`, `TypeLevelSchema`, `TypeLevelVariant`, `TypeLevelArray`) precisely because the raw encoding doesn't carry family identity directly.

## Planned fix

Introduce dedicated `EB.Term` variants (or equivalent) for the row-based families so family identity is explicit in the AST node type. This would eliminate the need to recover intent from nested structure, simplify unification dispatch, and make traces and error messages more direct. The change touches the same AST-shape surface as spineful applications but is a separate refactor.
