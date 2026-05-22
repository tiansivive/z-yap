---
tags:
  [
    continuation,
    lowering,
    codegen,
    compiler,
    mir,
    speculative,
    pattern,
    principle,
    effect,
    type-system,
    elaboration,
    inference,
    backend,
    code,
    migration,
    reference,
    problem,
    performance,
    rewriting,
    decision,
  ]
---
# Selective CPS

**Selective CPS** (CPS only under effectful/delim-cont regions) is a standard way to avoid whole-program administrative noise. Yap’s shift/reset pipeline instead lowers delimited control to a **block + jump state machine** with `Alloc`/`Read`/`Jump`/`Branch`, not a global CPS transform.

Contrast: `src/lowering/continuations/` implements that direct-style lowering; closure conversion follows separately (`src/lowering/functions/`).

Selective CPS remains a hypothetical alternate backend if some target wants uniform tail structure; any such path would need to stay consistent with answer-type metavariable behavior (`src/elaboration/inference/reset.ts`, `shift.ts`).
