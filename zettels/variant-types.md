---
tags:
- type-system
- elaboration
- inference
- syntax
- ast
- row-types
- concept
- implemented
- mir
- pattern
- lowering
- normalization
refs:
  - adr:D-010
---
# Variant Types

Row of tagged arms at the parser becomes `type: "variant"` (`variant` in `src/parser/processors.ts`). Type checking: `infer` in `src/elaboration/inference/variants.ts` runs under `muContext` with `EB.check` against `NF.Type`.

In core syntax, variant **type** families are `EB.Constructors.Variant(row)` → `App("Explicit", Lit(Atom("Variant")), Row(...))` (`src/elaboration/syntax/term.ts`, `CtorPatterns.Variant`). `NF.Patterns.Variant` mirrors this in normalization patterns used during inference (`injection.ts` alongside `Schema`).

Introducing a **value** arm uses `:tag payload` elaboration (`tagged.ts`), which types a `Variant` row but builds a runtime `Struct` with a real discriminant: `{ __tag: Atom(tag), payload: value }` ([[tagged-values.md]]). Variant pattern matching reads `__tag` for dispatch and projects `payload` for the arm body; verification mirrors this representation when checking a `Struct` against a `Variant`. Extending sums with injection syntax uses `Inj` (`injection.ts`).

Elimination compiles through `Match` and lowering (`src/lowering/matching/`, entry from `src/lowering/lower.ts`); `Inj` lowers via `Struct.injection` (`lower.ts`).

Adding or removing variant tags changes the `Row` spine; compatibility is via unification / explicit row parameters, **not** structural subtyping ([[structural-subtyping.md]]). Related: [[structural-records.md]] (products), [[row-polymorphism.md]], [[open-closed-variants]], [[data-declarations]], [[codata]].

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[row-polymorphism]] — Row-backed unions
- DUAL_OF → [[structural-records]] — Sum vs product over rows
- MIRRORS → [[structural-records]] — Row-backed dual

**Incoming**
- [[injection]] ← INTRODUCES — Tag injection
- [[tagged-values]] ← INTRODUCES — Intro form for variants
- [[match]] ← ELIMINATES — Elim form for variants
- [[elm-ocaml-influence]] ← INSPIRES — Polymorphic variants
- [[unification-algorithm]] ← IMPLEMENTS — Variant-Variant equality checking case
- [[row-polymorphism]] ← SUBSUMES — Rows generalize fixed-tag unions
- [[sigma-types]] ← COMPOSES_WITH — Dependent elimination produces variants
- [[match]] ← DISPATCHES_ON — Variant, Struct, Lit, List, Wildcard, Binder
- [[row-types.thread]] ← INCLUDES
- [[codata]] ← CONTRASTS_WITH — Constructors (data) vs observations (codata)
- [[data-declarations]] ← DESUGARS_TO — Data decls are sugar over row variants
- [[pattern-synonyms]] ← COMPOSES_WITH — Named variant patterns
- [[active-patterns]] ← USES — Partial patterns return option variant
- [[open-closed-variants]] ← APPLIES_TO — Open vs closed row tails
- [[exhaustiveness-checking]] ← USES — Tag sets determine coverage
- [[variant-discriminant-representation.adr]] ← DEFINES — Runtime value representation for row variants
- [[redundant-match-arms]] ← CONTRASTS_WITH — Variants dispatch on a runtime tag; record arms have no discriminant

<!-- connections:end -->
