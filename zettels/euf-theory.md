---
tags: [verification, mechanism, implemented, backend, reference, project, unification, ast, ir, sat, ffi, normalization, inference, milestone, arithmetic]
---
# EUF theory

**Concept:** equality with uninterpreted functions — congruence closure over a union-find of terms; axiomatic substrate for industrial SMT solvers such as **Z3** ([[de-moura-bjorner-z3]]).

**Implemented in Yap (M2):** `src/verification/solver/theories/euf/` — hash-consed arena (`arena.ts`), congruence closure (`cc.ts`) with path compression, union-by-rank, merge-driven equality propagation; integrated with **`quantifiers/`** E-matching. Same algorithmic core Z3 exposes as one theory plug-in inside its CDCL(T) loop.

**VC path:** refinement checking builds **IVL** atoms in **`translate.ts`** ([[verification-pipeline]]); this module is **solve-time** EUF over those atoms, not “Z3-only” or “IVL-only” as a mathematical object.

Supporting notes: [`congruence-closure.md`](congruence-closure.md), [`e-matching.md`](e-matching.md), glossary [`smt-solver-glossary.md`](smt-solver-glossary.md).
