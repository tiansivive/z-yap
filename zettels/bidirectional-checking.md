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
- **`EB.check(term, ty)`** — dispatch on `[term, NF.Value]` pairs, primarily **by expected type shape** (implicit `Pi`, `Schema`, `Sigma`, rows at `Type`, `Modal`, etc.). Fallthrough: infer plus implicit insertion and `assign` constraints (`src/elaboration/ARCHITECTURE.md` checking table).

Dependent typing leans on annotations and checking branches where synthesis alone does not pin types.
