---
tags:
- elaboration
- inference
- type-system
- normalization
- context
- mechanism
- row-types
- compiler
- code
- reference
- display
- monad
- unification
- parser
- implemented
status: implemented
---
# Implicit environment (`ctx.implicits`)

Field on `EB.Context`: `implicits: Array<[EB.Term, NF.Value]>` (`src/elaboration/shared/context.ts`).

Each pair is an elaborated candidate term and its type in normal form. Module `using` (`module.ts`) appends after `Stmt.infer`. Block **evaluation** extends the same field for `EB.Statement` `{ type: "Using" }` (`evaluation.v2.ts`); block **inference** currently does not mirror that (`inference/block.ts`).

`resolveImplicit` (`context.ts`) scans the array head-first: `U.unify(goal, candidateType, env.length, Sub.empty)`; returns first `[term, subst]` with `Either` success.

Ordering matters: earlier entries win; there is no separate multiset merge in types.

Hub: [[implicits.md]], [[implicit-resolution.md]].
