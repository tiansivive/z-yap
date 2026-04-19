---
tags: [concept, type-system, mechanism, row-types]
---
# Row Polymorphism

Row polymorphism allows functions to be polymorphic over the "rest" of a record (or variant) type using a row variable.

```purescript
getName :: forall r. { name :: String | r } -> String
setName :: forall r. String -> { | r } -> { name :: String | r }
```

The caller instantiates `r` — no coercion, no information loss. Purely parametric: `r` is universally quantified over the row tail.

In yap, all structural types (structs, tuples, variants, arrays) are row-based. Row variables enable polymorphism over record fields, variant cases, and tuple elements uniformly. [[row-unification|Row unification]] handles constraints on row tails during [[elaboration]].

Row polymorphism is NOT subtyping — it preserves full type information through parametric quantification rather than discarding it through coercion. See [[structural-subtyping]] for the contrast.
