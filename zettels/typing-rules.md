---
tags:
  [
    concept,
    elaboration,
    type-system,
    reference,
    inference,
    dependent,
    principle,
    drift,
    problem,
    pattern,
    testing,
    incomplete,
  ]
---
# Typing rules (documentation)

There is **no** separate judgement calculus file in this repository (no `spec.md` under versioned paths checked). The maintained operational description is `src/elaboration/ARCHITECTURE.md`: dispatch tables for `infer` (`elaborate.ts` handlers) and `check` (`check.ts` patterns), meta lifecycle, unification overview, implicit pipeline, module statement order.

Implementation follows those tables directly; tests under `src/elaboration/**/__tests__` and snapshots encode expected elaboration shapes.

`ARCHITECTURE.md` also lists `inference.v2/` and `checking.v2/` in a module map — those directories are **not** present in the current tree (migration placeholder vs. reality drift).
