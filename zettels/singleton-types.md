---
tags:
- concept
- type-system
- dependent
- elaboration
- checking
- language
- implemented
- principle
- inference
---
# Singleton types

Numeric literals in Yap are types that classify themselves. `check(1, 1)` succeeds (the value `1` inhabits the type `1`); `check(2, 1)` fails. `check(n, Type)` always succeeds for any numeric literal — every number is a valid type.

This behavior emerges from two bidirectional checking cases, with no dedicated `Singleton` AST node or type constructor:
- `check([lit(Num), Type])`: literals check against `Type`, making them valid type-level objects.
- `check([lit(Num), Lit(Num)])`: literal-against-literal compares values. Same value succeeds; different values fail.

Singleton types interact with sigma dependencies: `{ fst: Num, snd: :fst }` produces a sigma where each field's type depends on the concrete value of `fst`. When `fst` is `1`, `snd`'s type is `1` — only the value `1` inhabits it.

This requires the `check([struct, Sigma])` path to traverse-and-check rather than infer-then-constrain, so that the bidirectional checking direction is preserved and `check(1, 1)` fires instead of `infer(1) = Num` being unified against `1` (see [[sigma-checking-infer-constrain]]).
