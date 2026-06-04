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

Each pair is an elaborated candidate term and its type in normal form. Module `using` (`module.ts`) appends after `Stmt.infer`. Block **evaluation** extends `implicits` for `{ type: "Using" }` (`evaluation.v2.ts`). Block **inference** elaborates `using` via `inference/statements.ts` into `{ type: "Using", value, annotation }` while keeping the ambient `ctx.implicits` from the enclosing scope for subsequent statements (module-level `using` is what grows the list during typechecking).

`resolveImplicit` (`context.ts`) scans the array head-first: `U.unify(goal, candidateType, env.length, Sub.empty)`; returns first `[term, subst]` with `Either` success.

Ordering matters: earlier entries win; there is no separate multiset merge in types.

Hub: [[implicits.md]], [[implicit-resolution.md]].

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[implicit-resolution]] — Provides Δ
- THREADS_THROUGH → [[elaboration-context]] — ctx.implicits

**Incoming**
- [[elaboration-context]] ← INCLUDES — Δ in context
- [[block-level-using-gap]] ← APPLIES_TO — Block-local Δ
- [[typeclass-emulation]] ← ENCODES — Instances as record values in Δ

<!-- connections:end -->
