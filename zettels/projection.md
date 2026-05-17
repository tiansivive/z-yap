---
tags:
- type-system
- elaboration
- inference
- syntax
- ast
- mechanism
- implemented
- row-types
- dependent
- normalization
- error-handling
---
# Projection

Source projection (`type: "projection"`; processor `Projection` in `src/parser/processors.ts`: `term.label` or section form) elaborates through `infer` / `project` in `src/elaboration/inference/projection.ts`. Core term: `EB.Constructors.Proj(label, scr)`.

`project` narrows the scrutinee type with `match` on `NF.Value`: neutrals recurse; **flex** metavariables introduce a fresh row tail and emit `assign` against `App(Lit(Atom("Schema")), Row(extension(label, freshTypeMeta, rowVar)))` (`projection.ts`); **schema** heads walk `arg.row` with `MissingLabel` failure on absent labels and return the field’s `NF.Value`; **sigma** projections read the binder’s row annotation (`binder.annotation` as `NF.Row`) and may extend row metavars under `assign`.

There is **no** `Variant` case: field selection applies to products (`Schema`, `Sigma`), not sums. Variant elimination is `Match` (`src/elaboration/inference/match.ts`, lowering `src/lowering/matching/`, [[match.md]]).

Type information is reconciled through constraints and row structure, not structural subtyping ([[structural-subtyping.md]]).
