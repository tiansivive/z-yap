---
tags:
  - verification
  - ivl
  - mechanism
  - implemented
  - tooling
  - solver
  - normalization
  - cli
  - infrastructure
  - code
  - implementation
  - display
  - explorer
  - observability
refs:
  src:
    - src/verification/solver/ivl/build.ts
    - src/cli/explore/pipeline.ts
    - src/cli/explore/server.ts
    - src/cli/explore/static/app.js
    - src/cli/explore/static/index.html
    - scripts/cli.ts
---
# Build simplify toggle

Global mutable flag (`Build.simplify`, default `true`) that gates all algebraic simplifications in the IVL formula constructors. When disabled, the `Build` module produces unsimplified formulas, preserving every structural detail of the VC generation output for debugging.

**Gated simplifications**: double negation elimination in `not`; `True`/`False` absorption and `And`/`Or` flattening in `and`/`or`; guard elimination in `implies` (`True =>` and `=> True`); vacuous quantifier elimination in `forall`/`exists` (empty binders, `True` body); singleton conjunction/disjunction unwrapping.

**CLI**: `pnpm yap explore --ivl-no-simplify` sets `Build.simplify = false` before launching the explorer server. The flag is process-global — all pipeline runs in that session see unsimplified formulas.

**Explorer UI**: "IVL simplify" checkbox in the sidebar config panel. Persisted in localStorage. Sent as `ivlSimplify` in the `POST /run` request body. `pipeline.ts` sets `Build.simplify` from the option before each run, so individual runs can toggle simplification without restarting the server.

**Motivation**: Discovered while debugging incorrect IVL output for `(\x -> x) 42`. After fixing the Lambda synthesis bug, the corrected VC simplified to `(= x x)` via `Build.implies(guard, True) => True` propagation through `forall`. The unsimplified form reveals the full VC structure: `(and (= x x) (forall ((x Real)) (=> (= x 42) true)))`.
