---
tags:
- type-system
- elaboration
- decision
- principle
- row-types
- inference
- unification
- parser
- implemented
- concept
- dependent
- mir
---
# Structural Row-Based Types (Decision)

Core user data is parsed into row trees (`src/parser/processors.ts`: `struct`, `tuple`, `variant`, injection/projection) and elaborated against `NF` rows (`src/shared/rows.ts`, inference under `src/elaboration/inference/`). Type-level flexibility is expressed through **row metavariables and unification** (`src/elaboration/unification/rows.ts`, `structs.ts` flex branch)—parametric tails, not implicit structural subtyping ([[structural-subtyping.md]], [[row-polymorphism.md]]).

Bulk collections that need homogeneous element types or foreign strategies use separate constructors: `Array` + `Indexed` for lists (`lists.ts`), `Indexed` for dictionaries (`dictionaries.ts`)—orthogonal to `Schema`/`Variant` row polymorphism but still assembled with row spines where the grammar supplies field lists.

Lowering treats `Struct` applications as data (`src/lowering/lower.ts` `StructApp` arm) and routes `Proj`/`Inj` through `src/lowering/struct.ts`.
