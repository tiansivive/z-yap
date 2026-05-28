---
tags:
- concept
- type-system
- recursion
- elaboration
- normalization
- unification
- implemented
- inference
- ast
- substitution
- evaluation
- incomplete
---
# Mu types

Equirecursive types — Yap's mechanism for recursive type definitions. A mu type `μα. T` binds a type variable that may appear in its own body, representing types like recursive lists, trees, or self-referential records.

Mu shares the `Abs` node with all other binders, discriminated by `binding.type === "Mu"`. It carries a `source` string for debug/origin labeling. Recursive let-bound definitions wrap their inferred type in a Mu when the definition references itself.

The key evaluation design: mu types stay neutral during NbE. Applying a Mu-binder Abs does not eagerly unfold — it produces a neutral App. This prevents infinite unfolding during normalization. Expansion happens only when needed, specifically during unification, where the unfold-and-recurse strategy drives comparison of recursive types.

The occurs check in unification currently throws when it detects a cyclic meta-variable solution. The natural completion of that path is constructing the solution as a mu type (`μα. ...`), which would allow the solver to express recursive type solutions directly rather than failing.

See mu-type-unification for the specific equality-checking strategy. See equirecursive-types for the broader design context including bisimulation and fuel-capped approaches.
