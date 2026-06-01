---
tags:
- principle
- type-system
- dependent
- row-types
- elaboration
- normalization
- language
- inference
- implemented
---
# Sigma field references: value semantics

In a sigma type `{ fst: A, snd: :fst }`, the reference `:fst` denotes the value that field `fst` will hold when a concrete struct is checked against this type. It does not denote `A` (the type annotation of `fst`).

This follows from standard dependent pair semantics: in `Σ(x:A).B(x)`, checking `(a, b)` substitutes `a` (the value) for `x` in `B`. The variable `x` ranges over inhabitants of `A`, not over `A` itself.

In Yap, numbers are singleton types — `1 : 1` checks successfully, `2 : 1` fails (see [[singleton-types]]). So `{ fst: Num, snd: :fst }` is a well-formed dependent type where `:fst` ranges over numbers and each number is a valid singleton type. The type classifies pairs `(n, m)` where `m : n`, i.e. `m = n`.

The Pi analogy is exact: `(x: Num) -> x` has codomain `x` (a value), not `Num`. Applying to `1` yields codomain `1`. Sigma field references work the same way — the reference is to the witness value, and the resulting type is a function of that value.

This is the mechanism that makes refinement predicates over fields work: `{ fst: Num, snd: Num[|\v -> v > :fst|] }` constrains `snd` to be greater than the *value* of `fst`, not greater than `Num`.
