---
tags:
  [
    testing,
    verification,
    solver,
    sat,
    implemented,
    infrastructure,
    ivl,
    concern,
    compiler,
  ]
refs:
  - src: src/verification/solver/__tests__/
    note: Solver test suite (7 files)
  - src: src/verification/solver/ivl/dsl.ts
    note: IVL DSL for constructing test formulas
---

# Solver testing

The CDCL(T) solver has 7 test files covering the core pipeline: propositional satisfiability, CNF translation, CDCL search, EUF congruence closure, linear integer arithmetic, quantifier instantiation via e-matching, and proof traces. Tests construct IVL formulas via the `DSL` module and assert sat/unsat results.

Current coverage focuses on correctness of individual theory plugins and basic integration (e.g., EUF + arithmetic in the same formula). Each test file exercises a specific layer:
- `cdcl.test.ts` — propositional CDCL with conflict-driven learning
- `cnf.test.ts` — Tseitin CNF translation
- `solver.test.ts` — full solver with theory combination
- `arithmetic.test.ts` — LIA decision procedure
- `quantifier.test.ts` — e-matching instantiation
- `normalize.test.ts` — formula simplification
- `trace.test.ts` — proof trace generation and snapshot

**Gaps.** No stress testing with large or deeply nested formulas. No adversarial inputs designed to trigger worst-case CDCL behavior (many restarts, deep backjumps). No differential testing against an external solver oracle. No benchmarking of solver performance across formula families. These become relevant as the solver matures and handles more complex verification conditions from real Yap programs.

Related: [[testing-strategy]], [[cdcl-t-solver]], [[e-matching]], [[arithmetic-theory]], [[vc-ir]], [[fuzz-testing]], [[property-based-testing]]
