---
tags:
  [verification, sat, mechanism, implemented, backend, reference, project, milestone, ffi, arithmetic, quantifiers, strings, row-types, inference, tooling, observability, generator]
---
# CDCL(T) solver

**Concept:** DPLL(T) / CDCL(T) — boolean CDCL engine + cooperating theory plugins (Nelson–Oppen style) — is the standard architecture of **Z3**, **cvc5**, and related SMT solvers; this zettel tracks **Yap’s in-tree realization** of the same pattern ([[de-moura-bjorner-z3]], [[barbosa-cvc5]], [[nelson-oppen]]).

**Implemented:** theory plugins (EUF, linear arithmetic, quantifiers), shared term arena, solver-level backtracking, and a one-shot `Solver.run` / `Solver.check` API. Strings and rows remain future theories ([[string-theory]], [[row-theory]]). Full `explain` / obligation-linked UNSAT cores are milestone work ([[milestone-5-explanations]]).

The active in-tree CDCL(T) solver lives in `src/verification/solver/v2/`: SAT core with scan-based BCP, conflict analysis, and non-chronological backjumping (`v2/cdcl/`); theory orchestration (`v2/theory/`); EUF via hash-consed term arena and congruence closure (`v2/euf/`); linear arithmetic via rational simplex (`v2/arithmetic/`); trigger-based quantifier instantiation with E-matching plus bounded MBQI (`v2/quantifier/`). Top-level entry points are `Solver.run(formula)` and `Solver.check(formula)` in `v2/solver.ts`. See [[solver-v2-monadic-port.implementation]] for implementation detail.

**Observability:** v2 emits domain-owned writer events through the solver runtime. `Solver.run(formula)` returns the events and replay artefacts; `v2/trace/replay.ts` renders them as a human-readable small-step debugger trace. See [[solver-trace]].

See also [`smt-solver-glossary.md`](smt-solver-glossary.md) for shorthand (BCP, 1UIP, etc.).

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[verification-pipeline]] — Replaces Z3
- CONSUMES → [[boolean-lowering-cnf]] — CNF clauses
- DELEGATES_TO → [[theory-plugin-interface]] — Theory propagation
- SUPERSEDES → [[smt-translation]] — Replaces Z3 invocation
- DISPATCHES_ON → [[theory-plugin-interface]] — EUF, arithmetic, strings, rows, quantifiers
- TRAVERSES → [[boolean-lowering-cnf]] — SAT decides boolean skeleton
- PRODUCES → [[verification-backend]] — SolveResult (sat/unsat/unknown)
- IMPLEMENTS → [[z3-replacement.adr]] — Custom CDCL(T) replaces Z3
- FOLLOWS → [[inline-theory-assert]] — Core loop follows this pattern

**Incoming**
- [[theory-plugin-interface]] ← ENABLES — Modular theories
- [[verification-backend]] ← WRAPS — Simple API
- [[z3-replacement.adr]] ← MOTIVATES — Own solver needed
- [[milestone-2-euf-quant-lia]] ← PRODUCES — Core solver
- [[nieuwenhuis-oliveras]] ← INFORMS — DPLL(T) architecture
- [[de-moura-bjorner-z3]] ← INFORMS — Industrial reference
- [[barbosa-cvc5]] ← INFORMS — Modern reference
- [[solver-module-layout]] ← APPLIES_TO — Internal module structure
- [[solver-module-layout]] ← ENCODES — IR / SAT / theories / explanation separation
- [[theory-plugin-interface]] ← DISPATCHES_ON — Theories receive literals from SAT
- [[euf-theory]] ← WRAPS — Hash-consed term arena shared across theories
- [[euf-theory]] ← TRAVERSES — Trigger matching over e-class arena
- [[arithmetic-theory]] ← RESOLVES — Simplex feasibility for linear constraints
- [[arithmetic-theory]] ← DISPATCHES_ON — Int → branch-and-bound, Real → simplex
- [[string-theory]] ← REWRITES — Contains/prefix/suffix → concat equalities
- [[row-theory]] ← USES — Emits child obligations for field values
- [[row-theory]] ← DELEGATES_TO — Nested obligation emission
- [[quantifier-engine]] ← INSTANTIATES — Ground substitutions asserted
- [[m2-implementation]] ← IMPLEMENTS — Realizes the CDCL(T) concept
- [[m2-implementation]] ← INSTANTIATES — Concrete core.ts from abstract design
- [[solver-trace]] ← EXPOSES — Makes CDCL(T) execution steps observable
- [[solver-trace]] ← REPORTS — Human-readable execution replay
- [[solver-trace]] ← SNAPSHOTS — 14 snapshot tests capture trace output
- [[z3-replacement.adr]] ← MOTIVATES
- [[fuzz-testing]] ← TARGETS
- [[property-based-testing]] ← TARGETS
- [[solver-testing]] ← DETAILS
- [[mbqi]] ← INSTANTIATES — Ground lemmas asserted as CNF clauses
- [[solver-v2-monadic-port.implementation]] ← IMPLEMENTS — Additive v2 CDCL(T) path

<!-- connections:end -->
