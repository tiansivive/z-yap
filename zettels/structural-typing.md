---
tags:
  - concept
  - type-system
  - mechanism
  - elaboration
  - unification
  - row-types
  - inference
  - implemented
  - principle
---
# Structural typing

In Yap, type equivalence depends on shape, not on declared names. Two types are equivalent if they have the same structure — the same fields, the same labels, the same row shape — regardless of where or how they were defined.

## Not the same as structural subtyping

Structural typing (equivalence by shape) overlaps with but is distinct from structural *subtyping* (one shape "fits inside" another). Yap has structural equivalence but **no width subtyping**: extra labels in a row are not implicitly discarded. A struct with fields `{x, y, z}` does not silently satisfy an expectation for `{x, y}` — the mismatch surfaces as a unification error, not a coercion.

## Openness via row variables

Where other structural systems use subtyping rules (A <: B) for extensibility, Yap uses row *variables*. An open row `{x: Int | r}` can unify with `{x: Int, y: String}` by solving `r = {y: String}`. This is parametric extensibility — openness comes from unification of row tails, not from directional subtyping rules. See [[row-polymorphism]].

## Structural congruence via unification

Type-level families (Schema, Struct, Variant) unify by comparing their inner rows. Rows unify label-wise with metavariable solving for tails. This means two independently defined types with the same row structure are automatically equivalent — no declarations, no nominal identity, no registration needed.

Related: [[nominal-typing]], [[rows-universal-substrate]], [[structural-records]], [[row-theory]], [[nominal-identity]], [[opaque-types]].
