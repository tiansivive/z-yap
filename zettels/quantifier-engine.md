---
tags:
  [verification, quantifiers, mechanism, implemented, backend, sat, reference, project, milestone, ffi, arithmetic, inference, ast, ir, tracing, pattern]
---
# Quantifier engine

**Implemented (M2):** `src/verification/solver/quantifiers/` contains trigger extraction (`triggers.ts`), E-matching against the EUF arena (`ematch.ts`), and per-round instantiation (`solver.ts`). Each round walks active quantifiers, matches triggers against ground terms in the congruence closure, produces substitutions, and asserts ground lemma instances as CNF clauses into the SAT core. Complementary atom encoding handles negated atoms not directly in the atom table. MBQI is not yet implemented — only trigger-based instantiation.

**VC generation:** guarded quantifiers in `check`/`subtype` use **`translation.quantify`** → **IVL** **`Build.forall` / `Build.implies`** (`translate.ts`). The **instantiation engine** here is the M2 match to industrial trigger-based QI ([[ge-de-moura-quantifiers]]).
