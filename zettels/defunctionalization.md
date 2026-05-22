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

**Status:** `defunctionalization` does not name a pass in `src/lowering/`; production lowering uses closure conversion instead.

**Contrast with current MIR:** Lowering emits indirect calls after closure conversion: `Call` with `{ type: "indirect", callee }` and uniform `(env, arg)` conventions (`src/lowering/functions/`, `materialize.ts`). Defunctionalization would replace first-class function values with tagged data and a single dispatch loop — an alternative lowering shape worth comparing if exploring backends beyond indirect `Call`.
