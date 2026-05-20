---
tags:
  [verification, mechanism, implemented, backend, reference, project, unification, ast, ir, sat, ffi, normalization, inference, milestone, arithmetic]
---
# EUF theory

**Implemented (M2):** `src/verification/solver/theories/euf/` contains the Yap-owned EUF layer: hash-consed term arena (`arena.ts`) with intern-by-structure and union-find representatives; congruence closure (`cc.ts`) with path compression, union-by-rank, and parent propagation for implied equalities. Wired to the quantifier engine's trigger-based E-matching.

**Legacy direct encoding:** `src/verification/V2/logic/translate.ts` still constructs `z3-solver` values where translation bypasses IVL; `z3.adapter.ts` bridges during transition. See [[m2-implementation]] for integration details.

Supporting notes: [`congruence-closure.md`](congruence-closure.md), [`e-matching.md`](e-matching.md), glossary [`smt-solver-glossary.md`](smt-solver-glossary.md).
