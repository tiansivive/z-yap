---
tags:
  [verification, quantifiers, mechanism, planned, backend, sat, reference, project, milestone, ffi, arithmetic, inference, ast, ir, tracing, pattern]
---
# Quantifier engine

**Planned stack:** `docs/SMT-SOLVER.md` proposes two mechanisms on VC IR: trigger-based E-matching against the EUF arena plus bounded MBQI when triggers fail; `quantifierRound()` pseudocode ties instantiation rounds to CDCL(T) search.

**Implemented stack:** No `src/verification/solver/quantifiers/` tree. Quantified VCs are built as Z3 formulas: `translate.quantify` emits `Z3.ForAll` with optional `Z3.Implies` (`src/verification/V2/logic/translate.ts`); similar patterns appear in `check.ts`, `subtype.ts`, `synth.ts`. Trigger extraction / MBQI loops are therefore Z3-internal unless/until VC IR + custom solver lands.
