---
tags:
  [verification, quantifiers, mechanism, implemented, backend, reference, normalization, ast, ir, sat, strings, row-types, milestone, inference, project, codegen]
---
# Quantifier preparation

**Pipeline role:** prenex moves, Skolemizing existentials under universal prefixes, attaching triggers, and (eventually) hoisting string/row side conditions — preceding boolean CNF and CDCL(T).

**Implemented (M1/M2):** `src/verification/solver/normalize.ts` (formula simplification), `src/verification/solver/skolem.ts` (existential elimination via Skolem functions), `src/verification/solver/quantifiers/triggers.ts` (trigger extraction from quantified formulas). These run as pre-processing passes before CNF lowering and CDCL(T) solving. String/row side-condition hoisting remains future work once dedicated theories exist. See [[m1-implementation]] for the IR passes.
