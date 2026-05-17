---
tags:
- type-system
- elaboration
- inference
- unification
- normalization
- lowering
- principle
- decision
- row-types
- implemented
- mir
- compiler
---
# Rows as Universal Substrate

Most user-level structural data routes through `R.Row` (`src/shared/rows.ts`) in the elaborator: **structs** and **tuples** share `commonStructInference` (`src/elaboration/inference/structs.ts`, `tuples.ts`); **variant type literals** build `Src` rows of tagged arms then check as types (`variants.ts`); **injection/projection** rewrite `NF.Row` spines (`injection.ts`, `projection.ts`). Row unification is factored in `src/elaboration/unification/rows.ts` and invoked from `unification.ts` for `NF` row values.

Exceptions are deliberately non-row **FFI containers**: lists become `App(Lit("Array"), Row(...))` with `Indexed Num` typing (`lists.ts`); dictionaries use `Indexed` with string/num-driven default strategies (`dictionaries.ts`)—still row-shaped at the `Array`/element spine for lists, but not `Schema` polymorphism.

Lowering reuses one struct path for `StructApp` heads (`Patterns.StructApp` → `Struct.data`, `src/lowering/lower.ts`), while `Inj`/`Proj` go through `src/lowering/struct.ts`.

The payoff is shared algorithms (traversal in `rows.ts`, unification cases, inference patterns) across products and sums; it does **not** imply structural subtyping—see [[structural-subtyping.md]], [[row-polymorphism.md]].
