---
tags:
  - bugfix
  - implemented
  - normalization
  - dependent
  - type-system
  - elaboration
  - closure
  - row-types
---

# Sigma quoting: symbolic row application preserves field references

Sigma quoting in `src/elaboration/normalization/quoting.ts` applies the sigma closure to recover the body for readback. The original implementation applied the closure to `binder.annotation` — the concrete type row (e.g. `[fst: Type, snd: :fst]`). This meant label references in the body resolved to the field's *type annotation* rather than a symbolic value, collapsing `snd: :fst` into `snd: Type` and losing the dependency.

The fix constructs a **symbolic NF.Row** where each field's value is `NF.Neutral(NF.Var({ type: "Label", name: label }))` — a neutral label variable. Applying the closure with this symbolic row preserves label references as neutrals through evaluation, analogous to how Pi quoting applies to `Rigid(lvl)` to preserve the de Bruijn binder.

After the fix, `Σ($sig: [snd: :fst, fst: Type]). Schema [snd: :fst, fst: Type]` correctly preserves `:fst` in the body during readback.

Same root cause as [[sigma-quoting-match]] — both resolved by the symbolic row approach.
