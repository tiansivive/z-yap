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

**Module layout:** inference handlers under `src/elaboration/inference/` (re-exported from `index.ts`); checking in `src/elaboration/check.ts`. Older migration prose sometimes names `inference.v2/` / `checking.v2/` — those directory names are placeholders; the live code uses `inference/` + `check.ts`.

<!-- connections:start -->

## Connections

**Outgoing**
- SUPERSEDES → [[v1-elaboration-pipeline]] — Fresh implementation
- MIRRORS → [[v1-elaboration-pipeline]] — Same theory, new code
- OBSOLETES → [[tmp-pipeline-stub]] — The live pipeline replaced the planned tmp.ts stubs; the stubs never materialised
- FOLLOWS → [[v1-elaboration-pipeline]] — Sequential development
- MIRRORS → [[v1-elaboration-pipeline]] — Same theory, fresh implementation

**Incoming**
- [[tree-sitter-parser]] ← PRODUCES — CST.SyntaxNode
- [[elaboration-monad]] ← ENABLES — V2 pipeline
- [[lsp]] ← USES — Incremental analysis
- [[elaboration-v2.thread]] ← INCLUDES
- [[test-coverage-gaps]] ← DETECTS — Missing modal inference coverage; match checking needs direct semantic assertions

<!-- connections:end -->
