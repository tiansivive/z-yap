---
tags:
  [verification, mechanism, planned, backend, reference, project, unification, ast, ir, sat, ffi, normalization, inference, milestone, arithmetic]
---
# EUF theory

**Planned:** `docs/SMT-SOLVER.md` describes a Yap-owned EUF layer: hash-consed e-nodes, union-find/congruence closure (`intern`/`merge` pseudocode, explanation sets), wired to triggers for quantifiers. Planned location remains `src/verification/solver/euf/` alongside the eventual CDCL(T) scheduler.

**Boundary today:** Milestone 1 IVL (`src/verification/solver/ivl.ts`) already carries uninterpreted `App`, row/string/unit sorts, and atomic equalities—not yet a standalone CC engine nor theory propagation loop.

**Bridge:** `src/verification/solver/z3.adapter.ts` still lowers those shapes to solver-native constructs for `check` until M2 owns propagation.

**Legacy direct encoding:** `src/verification/V2/logic/translate.ts` constructs `z3-solver` values (`Z3.Array.const` selectors, etc.) wherever translation bypasses IVL helpers; parity work will shrink this path once IVL saturation finishes.

Supporting notes: [`congruence-closure.md`](congruence-closure.md), [`e-matching.md`](e-matching.md), glossary [`smt-solver-glossary.md`](smt-solver-glossary.md).
