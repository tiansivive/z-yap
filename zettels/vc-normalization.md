---
tags:
  [
    verification,
    normalization,
    planned,
    sat,
    backend,
    ir,
    arithmetic,
    strings,
    row-types,
    principle,
    milestone,
    compiler,
    quantifiers,
  ]
---
# VC Normalization

**Status:** Described under `docs/SMT-SOLVER.md` (“Pass 1. VC normalization”, “Solver pipeline”, and `normalize.ts` in the proposed `src/verification/solver/` layout). **Not implemented** as a module in this repo — no `src/verification/solver/normalize.ts`.

**Documented goals before CDCL(T):** drop trivial Boolean nodes; flatten nested `And`/`Or`; inline or rewrite `Implies` for later CNF; fold ground arithmetic and string literals; canonicalize row term shape (label order, overwrites).

**Related live code:** row-wise semantic comparison remains in the refinement layer (`subtype.contains` in verification); the doc says row normalization in the solver should stay aligned with that behavior — a design constraint, not an implemented pass.
