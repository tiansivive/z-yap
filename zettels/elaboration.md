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
