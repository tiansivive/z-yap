---
tags:
  [verification, quantifiers, mechanism, implemented, backend, reference, normalization, ast, ir, sat, strings, row-types, milestone, inference, project, codegen]
---
# Quantifier preparation

**Design:** `docs/SMT-SOLVER.md` "Pass 2. Quantifier preparation" lists prenex moves, Skolemizing existentials under universal prefixes, attaching triggers, and hoisting string/row side conditions — preceding boolean CNF and CDCL(T).

**Implemented (M1/M2):** `src/verification/solver/normalize.ts` (formula simplification), `src/verification/solver/skolem.ts` (existential elimination via Skolem functions), `src/verification/solver/quantifiers/triggers.ts` (trigger extraction from quantified formulas). These run as pre-processing passes before CNF lowering and CDCL(T) solving. String/row side-condition hoisting not yet implemented. See [[m1-implementation]] for the IR passes.
