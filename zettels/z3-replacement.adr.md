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

**Status:** Implemented. `VerificationServiceV2` produces `IVL.Formula`; `src/verification/solver/v2` runs the owned stack. The `z3-solver` dependency, Z3 adapter, and root-level v1 solver implementation have been removed.

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
| Lowering | Normalize, Skolemize, separate formulas, Tseitin CNF | `src/verification/solver/v2/formulas/`, `src/verification/solver/v2/encoding/` |
| SAT core | CDCL with BCP, conflict analysis, non-chronological backjump | `src/verification/solver/v2/cdcl/` |
| Theories | EUF (congruence closure), LIA (simplex), quantifiers (E-matching + MBQI) | `src/verification/solver/v2/euf/`, `arithmetic/`, `quantifier/`, `theory/` |

Top-level API: one-shot `Solver.run(formula)` and `Solver.check(formula)` in `src/verification/solver/v2/solver.ts`. Full obligation-linked explanations remain milestone work.

## Implemented (M1 + M2)

- **IVL IR** — types, build DSL, printer (`ivl/types.ts`, `build.ts`, `print.ts`, `dsl.ts`).
- **CNF translation** — Tseitin equisatisfiable encoding (`v2/encoding/cnf.ts`).
- **CDCL core** — boolean search with clause learning (`v2/cdcl/`).
- **EUF theory** — hash-consed term arena, congruence closure (`v2/euf/`).
- **Arithmetic theory** — linear normalization, rational simplex (`v2/arithmetic/`).
- **Quantifier engine** — trigger registration, E-matching instantiation, bounded MBQI (`v2/quantifier/`).
- **Trace replay** — writer-event collection plus small-step debugger replay (`v2/trace/`).

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

<!-- connections:start -->

## Connections

**Outgoing**
- MOTIVATES → [[vc-ir]] — Backend-neutral IR needed
- MOTIVATES → [[cdcl-t-solver]] — Own solver needed
- SUPERSEDES → [[smt-translation]] — Z3 dependency removed
- SUPERSEDES → [[z3-adapter-strategy]] — Adapter removed after v2 parity tests replaced the temporary oracle harness
- PRESERVES → [[verification-pipeline]] — Shape unchanged
- SUPERSEDES → [[verification-artefacts-revised]]
- SUPERSEDES → [[solver-module-layout]]
- SUPERSEDES → [[milestone-5-explanations]]
- MOTIVATES → [[cdcl-t-solver]]
- MOTIVATES → [[vc-ir]]
- PRODUCES → [[m1-implementation]]
- PRODUCES → [[m2-implementation]]

**Incoming**
- [[solver-v1-z3-removal]] ← IMPLEMENTS — Removed Z3 dependency and adapter
- [[milestone-1-ir-boundary]] ← FOLLOWS — First step
- [[cas-instead-of-smt]] ← CONTRASTS_WITH — Alternative rejected
- [[verification-backend.thread]] ← INCLUDES
- [[session-m2-completion]] ← FOLLOWS — Continues Z3 replacement
- [[m1-implementation]] ← FOLLOWS — First concrete step after the decision
- [[cdcl-t-solver]] ← IMPLEMENTS — Custom CDCL(T) replaces Z3
- [[m1-implementation]] ← IMPLEMENTS — M1 delivered IVL boundary
- [[m2-implementation]] ← IMPLEMENTS — M2 delivered EUF + quantifiers + LIA
- [[required-theory-support]] ← MOTIVATES — Row theory gap drove the decision
- [[ivl-boundary]] ← IMPLEMENTS — IVL is the core deliverable
- [[solver-v2-effect-runtime.adr]] ← IMPLEMENTS — Additive v2 runtime advances the owned solver path

<!-- connections:end -->
