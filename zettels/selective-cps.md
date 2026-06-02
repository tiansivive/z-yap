---
tags:
  [
    continuation,
    lowering,
    codegen,
    compiler,
    mir,
    speculative,
    rejected,
    pattern,
    effect,
    type-system,
    elaboration,
    inference,
    backend,
    code,
    reference,
    performance,
    rewriting,
  ]
---
# Selective CPS (rejected alternative)

**Rejected by [[direct-style-lowering.adr]].** This zettel preserves the description of selective continuation-passing-style as the alternative lowering strategy considered for delimited control.

**Selective CPS** (CPS only under effectful or delim-cont regions) is a standard way to avoid the whole-program administrative noise of a global CPS transform. Continuation arguments are inserted only along control paths that may invoke the continuation; pure regions retain direct-style shape.

The strategy is reachable as an alternate backend if some target requires uniform tail structure across all call sites; any such path would have to stay consistent with answer-type metavariable behaviour in `src/elaboration/inference/reset.ts` / `shift.ts` so the two lowerings agree on capture semantics. As of today, no target needs it: Yap's direct-style block-and-jump lowering covers all backends.
