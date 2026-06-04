---
tags:
- elaboration
- inference
- normalization
- syntax
- ast
- problem
- bug
- incomplete
- migration
- compiler
- context
- mechanism
- tooling
- cli
- testing
status: incomplete
---
# Block-level `using` gap

Module statements: `module.ts` `using` runs `EB.Stmt.infer`, then appends `[term, nfType]` to `ctx.implicits`.

Block inference: `src/elaboration/inference/block.ts` walks `Src.Statement`s via `EB.Stmt.infer.gen`. Only `Let` runs `Stmt.letdec` and `V2.local` to extend the reader context. For `stmt.type !== "Let"` (including `Using`), it returns `recurse(rest, [...results, stmt])` **without** `update(ctx, "implicits", ...)`, so elaboration-time implicit lookup never sees block-local `using`.

Runtime path: `src/elaboration/normalization/evaluation.v2.ts` `processStatementsAndPush` matches `{ type: "Using" }` and appends to `implicits`, so evaluation and inference disagree on scoped instances.

Hub: [[implicits.md]], [[implicit-environment.md]].

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[blocks]] — Using in block scope
- APPLIES_TO → [[implicit-environment]] — Block-local Δ
- DETECTS → [[module-system]] — Gap in implementation

**Incoming**
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->
