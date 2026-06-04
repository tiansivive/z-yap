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

<!-- connections:start -->

## Connections

**Outgoing**
- SPECIALIZES → [[mir-lowering]] — GPU/HVM targets
- TRANSLATES_TO → [[mir-lowering]] — Tagged dispatch on function identity
- FOLLOWS → [[gram-to-mir-bridge]] — Step 2: after bridge validates graph

**Incoming**
- [[closure-conversion]] ← CONTRASTS_WITH — Different lowering strategies
- [[compilation-by-selection]] ← ADDRESSES — Backend-specific (GPU yes, JS no)
- [[gram-next-steps]] ← INCLUDES — Planned pass
- [[lambda-lifting]] ← CONTRASTS_WITH — Lifting keeps fns; defunc replaces with data

<!-- connections:end -->
