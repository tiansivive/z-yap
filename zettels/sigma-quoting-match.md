---
tags:
  - limitation
  - incomplete
  - normalization
  - dependent
  - type-system
---

# Sigma quoting: match over fields

When a dependent record (sigma type) has a second component whose type depends on the first component through a match expression, quoting the sigma body fails at normalization time. The closure for the dependent type applies the row annotation to the match, but the match evaluator has no concrete value to scrutinize — only the sigma-bound variable — so it falls through with "Match: No alternative matched".

Example: `exampleP2`'s `OrderedPair` has second field `:snd` whose type depends on `:fst` via a match dispatching on `:fst`'s tag. The sigma closure receives the row annotation and attempts to evaluate the match, but since `:fst` is a symbolic sigma binder (not a concrete value), the match cannot reduce.

This is an architectural limitation of the current sigma quoting strategy: sigma bodies are evaluated by applying the closure to the field's annotation type rather than a symbolic fresh variable. Match expressions in the body need a concrete scrutinee to reduce, but sigma quoting can't provide one.

**Scope:** Affects any sigma type where the dependent field's type involves a match/case over an earlier field.
