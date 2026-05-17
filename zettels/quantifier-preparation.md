---
tags:
  [verification, quantifiers, mechanism, planned, backend, reference, normalization, ast, ir, sat, strings, row-types, milestone, inference, project, codegen]
---
# Quantifier preparation

**Design:** `docs/SMT-SOLVER.md` “Pass 2. Quantifier preparation” lists prenex moves, Skolemizing existentials under universal prefixes, attaching triggers, and hoisting string/row side conditions — preceding boolean CNF and CDCL(T).

**Codebase:** No standalone normalization/skolem/trigger pipeline files under `src/verification/` (no `solver/normalize.ts`, `skolem.ts`, `quantifiers/triggers.ts`). Existentials from synthesis/block typing are threaded through `quantify`’s recursive handling of `NF.Existential` in `translate.ts`; universal guards come directly from liquid translations at obligation sites (`check.ts`, `subtype.ts`). Any additional pre-solving passes are Z3’s responsibility on the emitted `Expr` graph.
