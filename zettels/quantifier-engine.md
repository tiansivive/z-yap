---
tags:
  [verification, quantifiers, mechanism, implemented, backend, sat, reference, project, milestone, ffi, arithmetic, inference, ast, ir, tracing, pattern]
---
# Quantifier engine

**Implemented (M2):** `src/verification/solver/quantifiers/` contains trigger extraction (`triggers.ts`), E-matching against the EUF arena (`ematch.ts`), and per-round instantiation (`solver.ts`). Each round walks active quantifiers, matches triggers against ground terms in the congruence closure, produces substitutions, and asserts ground lemma instances as CNF clauses into the SAT core. Complementary atom encoding handles negated atoms not directly in the atom table. MBQI is not yet implemented — only trigger-based instantiation.

**Legacy Z3 path:** `translate.quantify` still emits `Z3.ForAll` in the old pipeline. See [[m2-implementation]] for integration details.
