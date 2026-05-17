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
---
# Variant Types

Row of tagged arms at the parser becomes `type: "variant"` (`variant` in `src/parser/processors.ts`). Type checking: `infer` in `src/elaboration/inference/variants.ts` runs under `muContext` with `EB.check` against `NF.Type`.

In core syntax, variant **type** families are `EB.Constructors.Variant(row)` → `App("Explicit", Lit(Atom("Variant")), Row(...))` (`src/elaboration/syntax/term.ts`, `CtorPatterns.Variant`). `NF.Patterns.Variant` mirrors this in normalization patterns used during inference (`injection.ts` alongside `Schema`).

Introducing a **value** arm uses `:tag payload` elaboration (`tagged.ts`), which types a `Variant` row but builds a `Struct` unary row as the term ([[tagged-values.md]]). Extending sums with injection syntax uses `Inj` (`injection.ts`).

Elimination compiles through `Match` and lowering (`src/lowering/matching/`, entry from `src/lowering/lower.ts`); `Inj` lowers via `Struct.injection` (`lower.ts`).

Adding or removing variant tags changes the `Row` spine; compatibility is via unification / explicit row parameters, **not** structural subtyping ([[structural-subtyping.md]]). Related: [[structural-records.md]] (products), [[row-polymorphism.md]].
