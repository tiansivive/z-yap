---
tags:
- syntax
- elaboration
- inference
- unification
- metavariable
- solver
- mechanism
- parser
- ast
- dependent
- implemented
- monad
- constraint
- testing
- codegen
- drift
---

# Holes

Lexer token **`_`** (`grammar.ne` `%hole`), `Atom -> %hole {% P.Hole %}`, AST `{ type: "hole" }` (`src/parser/processors.ts`, `src/parser/terms.ts`).

Elaboration: `EB.Hole.infer` (`src/elaboration/inference/holes.ts`). Allocates fresh **`Meta`** for a type (`NF.Type`) and another **`Meta`** typed by that kind; returns `[metaTerm, evaluatedTy, Q.noUsage(env)]`. No surface hole survives in `EB.Term`—only metavariable variables.

Dispatch: `src/elaboration/elaborate.ts` `.with({ type: "hole" }, EB.Hole.infer)`.

Display note: `src/parser/pretty.ts` renders holes as **`?`**, not `_`.

Constraint solving fills metas (`solver.md`, `unification-algorithm.md`).
