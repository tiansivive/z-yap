---
tags:
  - implemented
  - lowering
  - graph
  - ir
  - compiler
  - ffi
  - closure
  - primitive
  - rewriting
  - mechanism
  - codegen
---

# GRAM PAP pass

A builtin GRAM pass that transforms unsaturated `EXTERNAL` nodes into explicit partial application (PAP) nodes. Runs after `saturate`, which marks externals with `saturated: false` when arity is not met.

**Rationale**: The GRAM → MIR bridge should be mechanical — it sees nodes and translates them directly. Semantic enrichment belongs in GRAM passes, not bridge logic. Rather than teaching the bridge to emit closure wrappers when it encounters unsaturated externals, GRAM emits PAP nodes that the bridge translates.

**Structure** (dedicated PAP node):

- **GRAM vocabulary**: `Tags.PAP`, `Labels.MATERIALIZES`, `Labels.CAPTURED`
- **Pass**: two-phase structure following `closure.ts` pattern:
  1. **DPO rule** (`papRule`): matches `EXTERNAL { saturated: false }`, adds `PAP { remaining }` node with `:materializes` edge
  2. **Imperative pass** (`wireCaptures`): copies `:arg` edges to `:captured` edges (GRS cannot express variable-length aggregate patterns)
- **Pipeline position**: After `saturate`, before `shift-reset` and `closure`
- **Bridge**: emits MIR closure wrapper chain:
  - Outermost closure captures the partial args
  - Nested wrappers accumulate one arg each via environment extension
  - Innermost wrapper invokes the external (direct call for foreigns, primop for primops)

**Graph structure** (example: `$add 1`):

```
[5] external {"name":"$add","arity":2,"args":1,"saturated":false}
  :arg -> [3] {"index":0}      // the literal 1
  :callee -> [4]               // the $add reference
[6] pap {"remaining":1}
  :materializes -> [5]         // points to EXTERNAL
  :captured -> [3] {"index":0} // captures arg 1
```

<!-- connections:start -->

## Connections

**Outgoing**
- RESOLVES → [[bridge-unsaturated-external]] — PAP pass eliminates unsaturated externals before bridge
- FOLLOWS → [[ffi-saturation-gram]] — Runs after saturate marks unsaturated externals
- RELIES_ON → [[saturation]] — Consumes `saturated: false` payload from saturate pass
- COMPOSES_WITH → [[closure-conversion]] — May emit closure structure or compose with closure pass
- PRESERVES → [[gram-to-mir-bridge]] — Keeps bridge mechanical: GRAM adds semantics, bridge translates

**Incoming**
- [[pap-analysis-payload-predicates]] ← REPLICATES — User-written rule aims to match builtin behavior
- [[gram-evolution.thread]] ← INCLUDES — Thread member

<!-- connections:end -->
