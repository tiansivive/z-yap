---
tags:
- type-system
- dependent
- decision
- concept
- elaboration
- normalization
- ast
- ir
- implemented
- unification
- verification
- lowering
- codegen
- monad
- reference
- performance
---
# Types as terms

**Single syntax class:** Types and programs share `EB.Term` (`src/elaboration/syntax/term.ts`). There is no parallel “type AST” branch for binders—`Pi`, `Sigma`, `Mu`, and `Lambda` all use `Abs` with a discriminated `binding`.

**Single normal form language:** Type-level values are `NF.Value` (`src/elaboration/normalization/syntax/term.ts`). `NF.Type` is just a distinguished literal atom; Π-types are `Abs` with `binder.type === "Pi"`.

**One evaluator:** `NF.evaluate` / `evaluation.v2.ts` drives NbE-style evaluation for both programs and types; definitional equality hooks into that representation via `unify` on `NF.Value` (`src/elaboration/unification/unification.ts`).

**Lowering boundary:** `src/lowering/lower.ts` erases or rejects many type-only shapes (e.g. type-level rows via `Leaf.erase()`, `Patterns.TypeLevelApp`); runtime lowering centers on `Lambda`, `App`, data constructors—see module header comments in `lower.ts`.

Related: [[eb-term.md]], [[nf-value.md]], [[type-type.md]], [[dependent-types.md]], [[mir-lowering.md]].
