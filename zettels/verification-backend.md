---
tags:
  [
    verification,
    infrastructure,
    in-progress,
    backend,
    sat,
    ffi,
    compiler,
    milestone,
    principle,
    codegen,
    testing,
    dependent,
    arithmetic,
    row-types,
  ]
---
# VerificationBackend

**ivl worktree (ivl-sat-solver branch):** `VerificationServiceV2` in `src/verification/V2/service.ts` no longer takes a Z3 context. `createTranslationTools` produces IVL terms/formulas. `VerificationArtefacts.vc` is `IVL.Formula`. The in-house CDCL(T) solver (`src/verification/solver/`) handles satisfiability. Z3 remains available via `z3.adapter.ts` as a fallback/cross-check but is not on the default path.

**main worktree:** still on Z3 — `VerificationServiceV2` takes `Context<"main">` from `z3-solver`, `translate.ts` builds Z3 `Expr` directly, `VerificationArtefacts.vc` is `Expr`.

**Direction:** a `VerificationBackend` with `solve: (vc: Formula, obligations: Obligation[]) => SolveResult` so the solver can be swapped without touching VC generation. The ivl worktree routes through CDCL(T) directly; a formal pluggable backend trait is still design work.
