---
tags:
  [
    verification,
    infrastructure,
    reference,
    deprecated,
    backend,
    compiler,
    sat,
    normalization,
    mir,
    project,
    tooling,
    testing,
    principle,
    pattern,
  ]
---
# Solver module layout

**Superseded by the IVL/CDCL(T) solver stack — see [[z3-replacement.adr]].** Original Z3-era content preserved below for reference.

`src/verification/solver/` is the in-repo SMT-style solver stack over **IVL** (internal verification language).

**Top level:** `solver.ts` (assert/check, wires theories), `normalize.ts`, `skolem.ts`, `cnf.ts` (Tseitin), `trace.ts`. The former Z3 bridge was removed after IVL/v2 solver parity work.

**IVL:** `ivl/types.ts` (`IVL.Sort`, `IVL.Term`, `IVL.Formula`, `IVL.RowTerm` with `Empty` / `Extend` / `Var`), `ivl/build.ts`, `ivl/dsl.ts`, `ivl/print.ts`.

**CDCL:** `cdcl/core.ts`, `cdcl/watched.ts`.

**Theories:** `theories/theory.ts`; `theories/euf/` (arena + congruence closure); `theories/arithmetic/` (normalize, bounds, simplex tableau, branch); `quantifiers/` (ematch, triggers, solver).

**Pipeline:** VC formulas from elaboration (`src/elaboration/module.ts` adds artefacts) translate to IVL via `src/verification/V2/logic/translate.ts`, then `normalize` → `skolemize` → `tseitin` → CDCL + EUF + arithmetic + quantifiers. Tests: `src/verification/solver/__tests__/` and `src/verification/__tests__/check.test.ts` (Z3 cross-check).

**Layering:** VC utilities in `src/verification/V2/` stay independent of SAT internals; theories plug in through shared literal / arena interfaces in `solver.ts`.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[cdcl-t-solver]] — Internal module structure
- APPLIES_TO → [[theory-plugin-interface]] — Separation of concerns
- ENCODES → [[cdcl-t-solver]] — IR / SAT / theories / explanation separation

**Incoming**
- [[verification-backend.thread]] ← INCLUDES
- [[z3-replacement.adr]] ← SUPERSEDES

<!-- connections:end -->
