---
tags:
  [
    verification,
    infrastructure,
    planned,
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

**Today:** `VerificationServiceV2` in `src/verification/V2/service.ts` is a closure over `Context<"main">` from `z3-solver`. It builds `createRuntime`, `createTranslationTools(Z3, …)`, then `createSubtype`, `createCheck`, `createSynth`. Exports `{ check, synth, subtype, getObligations }` — **no** pluggable backend parameter.

**Proposed (`docs/SMT-SOLVER.md` § “Suggested API changes”):** `VerificationBackend` with `solve: (vc: VC.Formula, obligations: Obligation[]) => SolveResult`; factory threads `backend` into a revised `VerificationServiceV2` so `check`/`synth`/`subtype` stay but `Expr` construction becomes VC IR emission and solving moves behind the interface.

**Current hard coupling (same doc, matches code):** `translate.ts` imports Z3 context; `VerificationArtefacts.vc` is `Expr`.
