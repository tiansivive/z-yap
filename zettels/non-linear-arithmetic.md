---
tags:
  [verification, arithmetic, decision, planned, normalization, ast, backend, reference, project, inference, sat, ffi, milestone, elaboration, dependent, syntax]
---
# Non-linear arithmetic

**Surface / VC emission:** primitives **`$mul`**, **`$div`**, **`$mod`** exist (`src/shared/lib/primitives.ts`) and reach **IVL** through **`translate.ts`** `External` handling (historical Z3 path in [[smt-translation]]).

**Solver policy (design):** treat full non-linear arithmetic as a long-term extension; keep `*`, `/`, `%` in VC IR; support linearizable cases first; rely on aggressive NbE ground folding so non-linear atoms are rarer.

**In-house solver:** `src/verification/solver/theories/arithmetic/` targets **linear** (real) arithmetic (simplex + branch-and-bound). Non-linear atoms are not handled by that theory plugin.

**Heavy oracles:** **Z3**, via **`z3.adapter`** on translated IVL, remains the usual fallback for richer non-linear fragments when tooling opts into it ([[de-moura-bjorner-z3]]).
