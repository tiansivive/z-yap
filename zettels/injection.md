---
tags:
- type-system
- elaboration
- inference
- syntax
- ast
- mechanism
- implemented
- pattern
- parser
- row-types
- dependent
- sugar
---
# Injection

Source **injection** is `{ base | label = value … }` folded into nested `Src.Term` nodes `{ type: "injection"; label; value; term }` (`Injection` processor in `src/parser/processors.ts`). Inference is `infer` → `inject` in `src/elaboration/inference/injection.ts`.

Core output term: `EB.Constructors.Inj(label, val, base)` (`src/elaboration/syntax/term.ts`). Expected type shapes dispatch with `NF.Patterns.Sigma`, `NF.Patterns.Schema`, `NF.Patterns.Variant`, neutrals, and metavariable (`Flex`): duplicate-label branches call `R.rewrite` (`@yap/shared/rows`) on the relevant `NF.Row`; fresh tails use row metavariables plus `constraint assign` (`inject`, lines using `freshMeta` / `tell "constraint"`).

This is **not** variant introduction (`:tag payload` goes through `tagged`; see [[tagged-values.md]]). Injection extends records/schemas/sums **algebraically** under inference constraints rather than declaring subtyping—width flexibility is row-parameter / metavar solving (see [[row-polymorphism.md]], [[structural-subtyping.md]]).

Dual elimination is projection (`Proj`) handled in `src/elaboration/inference/projection.ts` ([[projection.md]]).
