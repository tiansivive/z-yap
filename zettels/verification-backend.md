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

Older wiring threaded **`VerificationServiceV2`** with **`translate.ts`** straight into **`z3-solver`** **`Expr`**; today **`translate.ts`** emits **IVL** (**`VerificationArtefacts.vc`** / obligations as **`IVL.Formula`** — `src/verification/V2/types.ts`). Primary solving targets the **CDCL(T)** modules under **`src/verification/solver/`**. **`z3.adapter.ts`** re-encodes IVL into Z3 for oracle runs, regressions, or paths that still allocate a **`Context`**.

**Direction:** a narrow **`VerificationBackend`** API (`solve(vc, obligations) → …`) so engines swap without rewriting check/synth/subtype ([[verification-pipeline]], [[verification-backend.thread]]).
