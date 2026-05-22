---
tags:
- concept
- type-system
- mechanism
- elaboration
- unification
- row-types
- inference
- normalization
- lowering
- ast
- implemented
- pattern
- parser
- mir
- codegen
- testing
- reference
---
# Structural typing (shape-based types, without subtyping)

In PL parlance “structural typing” often means **type equivalence depends on shape**, not on declared names. That overlaps with—but is **not the same as**—**structural subtyping** ([[structural-subtyping.md]]): equivalence is symmetric; subtyping is directional.

**Yap (verified)**

- **Row-shaped types:** structs/schemas/variants lower to `App` of literal atoms (`Struct`, `Schema`, `Variant`, …) to a `Row` (`src/elaboration/syntax/term.ts` `Constructors`).
- **Structural congruence via unification:** `Schema–Schema`, `Struct–Struct`, `Variant–Variant` unify by comparing inner rows (`src/elaboration/unification/unification.ts`). Rows unify label-wise with metavariable solving (`src/elaboration/unification/rows.ts`).
- **No width subtyping:** extra labels are not implicitly discarded—failed row unification surfaces as errors (`MissingLabel` etc. in rows module), not as coercion.

**Parametric structure:** openness comes from row **variables** solved against extensions, not from **A <: B** rules—tie this hub to [[row-polymorphism.md]] rather than subtyping vocabulary.

**Lowering:** pure type-level rows/apps erase (`Leaf.erase`, `Patterns.TypeLevelApp`) before MIR (`src/lowering/lower.ts`); runtime structs use `Struct.data` lowering path.

Related: [[nominal-typing.md]], [[rows-universal-substrate.md]], [[structural-records.md]], [[row-theory.md]], [[nominal-identity]], [[opaque-types]], [[data-declarations]].
