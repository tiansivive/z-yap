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

Elaboration types live in `EB`/`NF`. `src/elaboration/shared/context.ts` tracks `imports` / `ffi` for value-level names, not a parallel nominal type registry — compound identity is row/Π/variant shape plus unification.

Contrast zettel: documents nominal typing literature against Yap’s structural core.

Related: [[nominal-identity]], [[opaque-types]], [[data-declarations]].
