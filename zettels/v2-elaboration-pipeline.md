---
tags:
  [
    elaboration,
    inference,
    monad,
    implemented,
    type-system,
    normalization,
    unification,
    continuation,
    codegen,
    compiler,
    dependent,
    parser,
    migration,
  ]
---
# V2 Elaboration Pipeline (verified layout)

**Monad:** `src/elaboration/shared/monad.v2.ts` — `Elaboration<A>` implemented as a state-passing function producing `Collector` with `Either<Err, A>`; `Do`/`yield*` generator API; `track` augments `ctx.trace`; failures attach `provenance: ctx.trace`.

**Inference:** `src/elaboration/elaborate.ts` — `infer : Src.Term → Elaboration<[EB.Term, NF.Value, Q.Usages]>` wraps `V2.track({ tag: "src", type: "term", term: ast, metadata: { action: "infer" }}, …)` and matches on `Src.Term` into `EB.Match.infer`, `EB.Lambda.infer`, `EB.Struct.infer`, etc. Implementations live under `src/elaboration/inference/` (`index.ts` re-exports per-construct modules).

**Checking:** `src/elaboration/check.ts` — `check : (EB.Term, NF.Value) → Elaboration<…>` via `V2.Do` and `NF`/`EB` shape matching.

**Related:** constraint solving `src/elaboration/solver/solver.ts`, unification `src/elaboration/unification/unification.ts` (both use `V2.Do`).

**Docs mismatch:** `.github/copilot-instructions.md` and `src/elaboration/ARCHITECTURE.md` refer to `inference.v2/` and `checking.v2/` directories those paths **do not exist** in this tree — inference/checking modules are under `inference/` and `check.ts`.
