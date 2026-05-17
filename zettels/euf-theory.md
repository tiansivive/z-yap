---
tags:
  [verification, mechanism, planned, backend, reference, project, unification, ast, ir, sat, ffi, normalization, inference, milestone, arithmetic]
---
# EUF theory

**Planned:** `docs/SMT-SOLVER.md` describes a Yap-owned EUF layer: hash-consed e-nodes, union-find congruence closure, `intern`/`merge` pseudocode, integration with trigger-based quantifier matching. Intended location: `src/verification/solver/euf/` — not present.

**Implemented encoding:** `src/verification/V2/logic/translate.ts` represents function values as `Z3.Array.const(…)` and application as `.select(…)`. Uninterpreted sorts are declared ad hoc (`String`, `Unit`, `Row`, `Schema`, `External:{name}`, etc.). Equality and congruence reasoning for those apps are handled inside Z3, not via a dedicated Yap congruence-closure module.
