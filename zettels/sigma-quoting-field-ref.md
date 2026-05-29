---
tags:
  - limitation
  - incomplete
  - normalization
  - dependent
  - type-system
---

# Sigma quoting: field ref substitution

When quoting a sigma type whose body references an earlier field (e.g. `:fst`), the readback resolves the field reference to the field's **type** rather than a symbolic projection of the field's **value**. The normalized type shows `:fst` replaced by `Num` (the type of `:fst`) instead of a de Bruijn reference to the first field.

Example: `OrderedPair` with `{:fst: Num, :snd: Num}` where `:snd` depends on `:fst` — normalized type shows `:snd: Num` everywhere because `:fst` was substituted with `Num` (its type annotation) rather than preserved as a field reference.

Root cause: `quoting.ts` applies the sigma closure to the row annotation entry for that field rather than a fresh rigid variable. The row annotation entry is the type of the field, so the body evaluates with the type where it expects the value.

This is the same sigma quoting strategy limitation as [[sigma-quoting-match]] but manifesting as type-for-value substitution rather than match failure.

**Scope:** Affects any sigma type where the dependent body references an earlier field's value, not just its type. Simple dependent records (where the dependency is only on the type, not the value) are unaffected.
