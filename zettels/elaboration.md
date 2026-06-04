---
tags:
- elaboration
- mechanism
- parser
- inference
- normalization
- verification
- lowering
- project
- reference
- milestone
- migration
- implemented
---
# Elaboration (hub)

Maps `Src.*` AST to `EB.Term` + `NF.Value` typing, then hands off to verification/lowering elsewhere. Orchestrated from `src/elaboration/module.ts` for modules; single terms use `infer` (`elaborate.ts`).

**Dispatch**

- Inference: `match` on `Src.Term` in `elaborate.ts` → `src/elaboration/inference/*` helpers.
- Checking: `check.ts` matches `[Src.Term, NF.Value]` mostly by type shape.

**Cross-cutting**

- [[bidirectional-checking.md]] — infer vs check roles
- [[bidirectional-checking-decision.md]] — why the split manifests in `check.ts` rules
- [[elaboration-monad.md]] — `V2.Do`, `tell` / `listen`, `MutState`
- [[elaboration-context.md]] — `EB.Context` fields
- [[constraint-types.md]] / [[constraint-solving.md]] / [[deferred-constraint-solving.md]] — writer + `solver.ts`
- [[eb-term.md]] — core AST
- [[src-to-eb-transformation.md]] — representative surface→core lowers
- [[typing-rules.md]] — where judgement-style prose lives in-repo

Post-`let`: solve, generalize, instantiate, implicit wrapping, Z3 verification (`module.ts` / `VerificationServiceV2`).

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[bidirectional-checking]] — Infer synthesises, check pushes inward
- USES → [[nbe]] — Evaluate to values, compare structurally
- USES → [[constraint-solving]] — Deferred constraints solved per let-binding

**Incoming**
- [[yap]] ← INCLUDES — Core pipeline stage
- [[session-lowering-branch-split]] ← ADDRESSES — FFI arity computation piped from elaboration to lowering
- [[nearley-parser]] ← PRODUCES — Src.Term
- [[verification-modal-phase]] ← FOLLOWS — Modal checking after full inference
- [[whnf-vs-full-normalization]] ← CONSTRAINS — WHNF only in elab
- [[elaboration-context]] ← ENABLES — Central context
- [[bidirectional-checking-decision]] ← DISPATCHES_ON — Mode drives path
- [[pretty-printing]] ← REPORTS — Human-readable output
- [[test-utility]] ← SNAPSHOTS — Pretty + structure output
- [[elaboration-monad]] ← ENABLES — Monadic pipeline
- [[bidirectional-checking]] ← DISPATCHES_ON — Check vs infer mode
- [[functional-patterns]] ← REQUIRES — Elaboration redesign needed
- [[logic-programming]] ← INSPIRES — miniKanren-like relational fragments
- [[elaboration-v2.thread]] ← INCLUDES

<!-- connections:end -->
