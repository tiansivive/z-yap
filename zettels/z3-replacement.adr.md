---
adr-id: D-001
tags:
  [
    adr,
    accepted,
    decision,
    verification,
    solver,
    sat,
    ir,
    ivl,
    compiler,
    infrastructure,
    implemented,
    reference,
    milestone,
  ]
refs:
  - src: src/verification/solver/
    note: "IVL IR, CNF, CDCL core, EUF, arithmetic, quantifier engine"
---
# Z3 replacement

**Decision:** Replace the `z3-solver` npm dependency as Yap's primary verification backend with a custom **Intermediate Verification Language (IVL)** and an in-tree **CDCL(T)** satisfiability engine.

**Status:** Implemented on the default verification path. `VerificationServiceV2` produces `IVL.Formula`; `src/verification/solver/` runs the owned stack. `z3.adapter.ts` remains for cross-check and fallback only.

## Scope (what changes, what does not)

**Keep:**

- `check`, `synth`, `subtype`, obligation recording, refinement-driven VC generation, first-order refinement over the core language.

**Allow:**

- Replacing direct `z3-solver` expression construction with Yap-owned IVL nodes.
- Changing `VerificationArtefacts.vc` from solver-native `Expr` to `IVL.Formula`.
- Normalization, Skolemization, and boolean lowering passes before search.

**Do not:**

- Remove expressible predicates or narrow refinement expressiveness to ease the solver.
- Replace VC generation with an unrelated verification method.

## Rationale

1. **Theory control** — Yap's verification fragment mixes EUF, linear arithmetic, guarded quantifiers, and (eventually) strings and row containment. An owned engine lets theory plugins align with `subtype.contains`, row shapes, and NbE-ground terms instead of fighting Z3's opaque heuristics.
2. **No native dependency** — `z3-solver` binds to Z3 binaries; distribution, CI, and WASM targets suffer. TypeScript CDCL(T) removes FFI friction.
3. **Type-system integration** — IVL terms mirror elaboration/normal-form structure; translation, tracing, and counterexample display can share one AST instead of round-tripping through Z3 sorts.
4. **Observability** — Generator-based `Trace` steps expose BCP, theory propagation, and E-matching decisions for the pipeline explorer and tests.

## Architecture (four layers)

| Layer | Role | Location |
| ----- | ---- | -------- |
| VC IR | Solver-neutral formulas from `translate.ts` | `src/verification/solver/ivl/` |
| Lowering | Normalize, Skolemize, Tseitin CNF | `normalize.ts`, `skolem.ts`, `cnf.ts` |
| SAT core | CDCL with 2WL, 1UIP, non-chronological backjump | `cdcl/core.ts`, `cdcl/watched.ts` |
| Theories | EUF (congruence closure), LIA (simplex + branch), quantifiers (E-matching) | `theories/`, `quantifiers/` |

Top-level API: `solve(formula)` and `Solver.create()` in `solver.ts`. Optional `origin` on `assert` for provenance (full obligation linking is milestone work).

## Implemented (M1 + M2)

- **IVL IR** — types, build DSL, printer (`ivl/types.ts`, `build.ts`, `print.ts`, `dsl.ts`).
- **CNF translation** — Tseitin equisatisfiable encoding (`cnf.ts`).
- **CDCL core** — boolean search with clause learning (`cdcl/`).
- **EUF theory** — hash-consed term arena, congruence closure (`theories/euf/`).
- **Arithmetic theory** — linear normalization, rational simplex, integer branch-and-bound (`theories/arithmetic/`).
- **Quantifier engine** — trigger registration, E-matching instantiation (`quantifiers/ematch.ts`, `triggers.ts`, `solver.ts`).
- **Z3 adapter** — `formulaToZ3` / `solve` for regression cross-check (`z3.adapter.ts`).

See [[m1-implementation]] and [[m2-implementation]] for milestone detail; [[cdcl-t-solver]] for mechanism overview.

## Remaining

| Area | Notes |
| ---- | ----- |
| String theory | Dedicated solver (not EUF-only `String` sort); see [[string-theory]], [[milestone-3-strings]] |
| Row theory | Align with `subtype.contains` / structural rows; see [[row-theory]], [[milestone-4-rows]] |
| Non-linear arithmetic | Keep `*`, `/`, `%` in IR; linearize or defer; see [[non-linear-arithmetic]] |
| Explanations / UNSAT cores | Obligation-linked cores and models; see [[milestone-5-explanations]] |

## Superseded documentation

Z3-era zettels that described `Expr`-based artefacts, planned-only solver layout, or `docs/SMT-SOLVER.md` as authority are tagged `deprecated` and linked via [[connections]] `SUPERSEDES` edges from this decision.
