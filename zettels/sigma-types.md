---
tags:
- type-system
- dependent
- row-types
- concept
- implemented
- elaboration
- syntax
- ast
- normalization
- unification
- inference
- context
- mir
- codegen
- error-handling
---
# Sigma types

**AST:** `Abs` with `binding.type === "Sigma"` (`src/elaboration/syntax/term.ts`); `EB.Constructors.Sigma`. NF: `NF.Constructors.Sigma` / `NF.Patterns.Sigma`.

**Role:** Packages a row-typed witness and a body type that can depend on that row (dependent record/type schema pattern). Checking a surface `struct` at `NF.Type` produces a Sigma wrapping the row and a `Schema` body (`src/elaboration/check.ts` around the `struct` / `NF.Patterns.Type` case).

**Label back-references:** Source variables with `variable.type === "label"` resolve through `ctx.sigma` in `src/elaboration/shared/context.ts` `lookup`, returning a `Var` with `Variable` kind `Label` and the stored normal form. Row evaluation seeds `sigma` when elaborating row fields (`src/elaboration/normalization/evaluation.v2.ts`).

**Unification:** Sigma–Sigma in `src/elaboration/unification/unification.ts` unifies annotations, then applies each sigma closure to its annotation before unifying bodies. Special cases relate `Schema` and `Sigma` by applying the sigma closure to the schema’s row argument (same file).

**Quoting nuance:** `src/elaboration/normalization/quoting.ts` notes sigma bodies are not under a de Bruijn binder in the same way as Pi—application uses the sigma environment, not `lvl` bump.

**Known gap (code comment):** `src/elaboration/inference/rows.ts` TODO on stacking nested sigma environments for nested row types.

Related: [[sigma-bindings.md]], [[structural-records.md]], [[row-data-structure.md]], [[eb-term.md]].
