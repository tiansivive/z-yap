---
tags:
- syntax
- elaboration
- parser
- ast
- polymorphism
- generalization
- monad
- tracing
- implemented
- migration
- inference
- dependent
---

# Blocks

Surface **`{ stmt₁; … ; stmtₙ; return expr; }`** or **`{ return expr; }`**. Grammar `Block -> Curly[ Many[Statement,%semicolon] %semicolon Return:? ]` (`src/parser/grammar.ne`). Processor `P.Block` builds `{ type: "block", statements, return? }` (`src/parser/processors.ts`).

Statements parsed: bare `TypeExpr` (as expression statement via `P.Expr`), `let`, `using`, `foreign` (`grammar.ne` `Statement`). Elaboration consumes blocks through `EB.Block.infer` (`src/elaboration/inference/block.ts`): folds statements with `EB.Stmt.infer`, threads context on `Let`, applies **`EB.Stmt.letdec`** which runs **`NF.generalize` / `NF.instantiate`** (`src/elaboration/inference/statements.ts`). Missing tail `return`: synthesizes unit block (`Lit.Atom("Unit")`) per `inferReturn`.

Gap: **`foreign`** parses (`P.Foreign`) but `EB.Stmt.infer` only handles `let`, `expression`, `using`; other statement shapes hit `"Not implemented yet"` (`src/elaboration/inference/statements.ts`).

Core term: `EB.Constructors.Block` (`src/elaboration/syntax/term.ts`). Detail: generalization mechanics (`generalization.md`), provenance tracing (`provenance-system.md`).
