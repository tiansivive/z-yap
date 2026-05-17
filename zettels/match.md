---
tags:
- syntax
- elaboration
- lowering
- mir
- mechanism
- parser
- ast
- dependent
- implemented
- codegen
- compiler
- inference
- monad
- error-handling
---

# Match

Surface **`match scrutinee | pat -> arm | …`**, grammar `Match -> "match" %space:+ TypeExpr Alt:+` with `Alt` → bar, pattern, arrow, rhs (`src/parser/grammar.ne`). Processor `P.Match` / `P.Alternative` (`src/parser/processors.ts`). `Src` node `{ type: "match", scrutinee, alternatives }` (`src/parser/terms.ts`).

Elaboration: `EB.Match.infer` (`src/elaboration/inference/match.ts`). Infers scrutinee; each arm elaborates pattern via `EB.Patterns` helpers, extends context with binders, infers RHS; unifies alternative result types (`tell("constraint", { type: "assign", … })`); builds `EB.Constructors.Match`. Open work noted in-file: dependent narrowing / variant-return typing (“TODO” comments).

Lowering: `src/lowering/lower.ts` routes `Match` to `matching/`; header documents **Maranget-style clause-matrix compilation**. Fallback block emits `"non-exhaustive match"` string (`src/lowering/matching/index.ts`). Detail graph: `pattern-matching-compilation.md`, `maranget-paper.md`.

Elaboration does not currently implement exhaustiveness warnings in `match.ts` (no reachability pass there).
