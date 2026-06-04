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

<!-- connections:start -->

## Connections

**Outgoing**
- CONTRASTS_WITH → [[structural-typing]] — Name-based vs structure-based identity
- CONTRASTS_WITH → [[typeclass-emulation]] — Class hierarchy vs structural

**Incoming**
- [[structural-typing]] ← CONTRASTS_WITH — Name-based vs structure-based identity
- [[typeclass-emulation]] ← EMULATES — Structural alternative to classes
- [[typeclass-emulation]] ← CONTRASTS_WITH — No class hierarchy
- [[structural-row-based-types]] ← REJECTS — Not primary type discipline
- [[data-declarations]] ← CONTRASTS_WITH — Structural sugar vs nominal declaration
- [[nominal-identity]] ← EXTENDS — Explores adding nominal identity to Yap
- [[opaque-types]] ← EXTENDS — Layering nominal abstraction

<!-- connections:end -->
