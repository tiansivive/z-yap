---
tags:
  - concern
  - design
  - tech-debt
  - elaboration
  - inference
  - generalization
  - constraint
  - effect
  - architecture
  - needs-design
  - deferred
status: open
---
# `Stmt.infer` and `letdec` are two halves of one rule

`EB.Stmt.infer`'s `let` case elaborates the declaration's value and answers an `ElaboratedStmt`. `EB.Stmt.letdec` then closes the declaration: solve *this* declaration's constraints, generalize, instantiate, wrap the inserted implicit lambdas, rebuild the statement. Despite the name it is not inference — it is the let *boundary*.

Every caller runs them back to back (`inference/block.ts`, `module.ts`), and none wants one without the other. The split leaks in three ways:

**Constraint scope becomes the caller's problem.** `letdec` reads its constraints with `M.writer.peek()`, so it only behaves if the caller has already opened a scope that covers the preceding `infer`. `block.ts` therefore wraps both in one `M.writer.listen` through a bespoke inner generator, existing purely to keep the two calls in the same scope. Get that wrong and the declaration re-visits an earlier statement's constraints — see [[generalization-solution-visibility]] for what that costs.

**Two statements, and the caller must pick the second.** `infer` answers the un-generalized `Let`; `letdec` answers the generalized one. Nothing in the types says the first is superseded.

**A cast at one call site.** `module.ts` casts `elaborated as Extract<EB.Statement, { type: "Let" }>` because `infer`'s return is uniform.

## Why fusing is now cheap

`letdec` answers `[statement, Context]`, and post-registry-migration that context is `const next = ctx` — the ambient reader context, unchanged (`inference/statements.ts`). Under v2 it carried an updated zonker, which is why it was returned at all. It is now vestigial, so the return can shrink to the statement alone and callers can take the context from the reader.

That leaves the fused shape: `Stmt.infer`'s `let` case owns the whole rule, including its own `M.writer.listen`, and keeps the uniform `ElaboratedStmt` return. The caller's sequencing problem, the wrapper generator, the `peek`-from-outside coupling, the two-statements footgun and the cast all go at once.

## Open

Whether `letdec` survives as a private helper inside `statements.ts` or dissolves into the `let` case. Nondeterministic `replay` and the `st.nondeterminism` read move inside either way.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[bidirectional-checking-decision]] — Statement-level rule shape
- CONSTRAINS → [[generalization]] — Where the let boundary runs
- DETECTS → [[elaboration-monad]] — Writer scope leaking into an API

**Incoming**
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->
