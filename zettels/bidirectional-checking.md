---
tags:
  [
    concept,
    mechanism,
    elaboration,
    type-system,
    inference,
    parser,
    dependent,
    principle,
    ast,
    modality,
    implemented,
  ]
---
# Bidirectional checking

Two elaboration modes over `Src.Term` (`src/elaboration/elaborate.ts`, `src/elaboration/check.ts`):

- **`EB.infer`** — dispatch on `term.type`; produces `AST = [EB.Term, NF.Value, Q.Usages]`. Wraps tracing via `V2.track`; strips modalities from the synthesized type with `stripModalities` (`elaborate.ts`).
- **`EB.check(term, ty)`** — dispatch on `[term, NF.Value]` pairs, primarily **by expected type shape** (implicit `Pi`, `Schema`, `Sigma`, rows at `Type`, `Modal`, etc.). Fallthrough: infer plus implicit insertion and `assign` constraints (`src/elaboration/check.ts`).

Dependent typing leans on annotations and checking branches where synthesis alone does not pin types.

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[dependent-types]] — Natural fit for dependent types with annotations
- INTRODUCES → [[pi-types]] — Types in check mode
- ELIMINATES → [[pi-types]] — Types in infer mode
- DISPATCHES_ON → [[elaboration]] — Check vs infer mode
- DELEGATES_TO → [[constraint-solver]] — At let boundaries
- COERCES_TO → [[pi-types]] — Infer to check mode switch

**Incoming**
- [[yap]] ← USES — Inference strategy
- [[elaboration]] ← USES — Infer synthesises, check pushes inward
- [[idris-2-influence]] ← INSPIRES — TT core
- [[dunfield-krishnaswami]] ← INFORMS — Declarative → algorithmic
- [[typing-rules]] ← COMPOSES_WITH — Mode drives rule selection
- [[provenance-system]] ← THREADS_THROUGH — Checking/inference trace
- [[typing-rules]] ← DISPATCHES_ON — Γ ⊢ e ⇐ A vs Γ ⊢ e ⇒ A
- [[lambda-synthesis-fix]] ← DEPENDS_ON — Fix is in the synth direction
- [[syn-app-ex-modification]] ← RELIES_ON — check provides expected type for extrinsic terms
- [[ast-pipeline]] ← ENABLES — Expected types are NF.Value
- [[annotations]] ← ENABLES — Switches infer → check mode
- [[maplist-schema-unification]] ← FIXES — Match-check quoted return type at wrong de Bruijn level
- [[singleton-types]] ← RELIES_ON — Emerges from bidir checking cases
- [[sigma-checking-infer-constrain]] ← APPLIES_TO — Infer-then-constrain loses bidir info
- [[redundant-match-arms]] ← CONSTRAINS — Scrutinee inference keeps every arm's fields; no reachability pruning of the type

<!-- connections:end -->
