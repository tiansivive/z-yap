---
tags:
  [
    type-system,
    concept,
    principle,
    elaboration,
    row-types,
    syntax,
    ast,
    dependent,
    inference,
    normalization,
    reference,
    rejected,
  ]
---
# Nominal typing (contrast)

**Nominal typing:** type identity is the **name** of the declaration; two definitions with the same fields are different types unless aliased.

**Yap:** compound data is encoded with **structural** rows (`EB.Row`, row patterns, `Proj`/`Inj`), Π, variants, etc. — identity comes from shape and unification, not from a separate nominal type symbol for each user `type` declaration in the nominal sense.

Elaboration types live in `EB`/`NF`; there is no parallel nominal class table in `src/elaboration/shared/context.ts` beyond `imports` / `ffi` names for value-level binding.

Contrast zettel only: nominal typing discipline is **not** what the core elaborator implements.
