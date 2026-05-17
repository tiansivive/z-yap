---
tags:
  [
    lowering,
    concept,
    speculative,
    mir,
    codegen,
    runtime,
    closure,
    compiler,
    ir,
    backend,
    planned,
    reference,
  ]
---

# Defunctionalization

**Status:** No `defunctionalization` references in `/Users/t.vilaverde/Workspace/panlogion/yap/` source; not an implemented Yap pass.

**Contrast with current MIR:** Production lowering uses indirect calls after closure conversion: `Call` with `{ type: "indirect", callee }` and uniform `(env, arg)` conventions (`docs/MIR-LOWERING.md` §3.4, §5). Defunctionalization would replace first-class function values with tagged data and a single dispatch loop—an alternative lowering shape, not present in `src/lowering/` today.
