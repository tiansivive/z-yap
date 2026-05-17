---
tags:
- syntax
- elaboration
- dependent
- inference
- mechanism
- parser
- ast
- normalization
- implemented
- monad
- lowering
- codegen
---

# Lambda

Surface **`\x -> body`** (explicit Π introduction) and **`\x => body`** (implicit), grammar `Lambda -> %backslash … %arrow|%fatArrow … TypeExpr` via `{% P.Lambda("Explicit"|"Implicit") %}` (`src/parser/grammar.ne`). Multi-parameter lists desugar to nested single binders inside `Lam` (`src/parser/processors.ts` `reduceRight`).

Optional type annotation on parameters: `Param -> Identifier | Parens[TypedParam]` with `TypedParam -> Identifier %colon TypeExpr {% P.Param %}`; `annotation?` on `Src` lambda (`src/parser/terms.ts`).

Elaboration: `EB.Lambda.infer` (`src/elaboration/inference/lambda.ts`). Domain: `check(annotation, NF.Type)` when present, else fresh type meta. Extends context with `EB.bind` `Lambda`, infers body, runs `EB.Icit.insert.gen` on body result, emits `EB.Constructors.Lambda` and Π type `NF.Constructors.Pi` with `NF.closeVal` on body type.

Core shape: encoded as `Abs` with `binding: { type: "Lambda", … }` (`src/elaboration/syntax/term.ts` `Constructors.Lambda`).

Application pairing: `application.md`, `implicit-resolution.md`. Lowering/closure conversion: `closure-conversion.md`.
