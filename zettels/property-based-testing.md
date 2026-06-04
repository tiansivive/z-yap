---
tags:
  [
    testing,
    exploration,
    type-system,
    elaboration,
    unification,
    normalization,
    solver,
    goal,
    infrastructure,
    planned,
  ]
refs:
  - url: https://github.com/dubzzz/fast-check
    note: fast-check — TypeScript property-based testing with shrinking
  - url: https://doi.org/10.1145/351240.351266
    note: "Claessen & Hughes — QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs"
---

# Property-based testing

Property-based testing verifies invariants over randomly generated inputs, complementing Yap's snapshot-driven approach with algebraic properties that hold across the input space.

**NbE round-trip.** For any well-typed term `t`, evaluating to `NF.Value` and reading back should produce a term α-equivalent to the original (modulo reduction). This is the fundamental soundness property of normalization by evaluation. A generator for well-typed `EB.Term` trees — built bottom-up with type-guided construction — would exercise the evaluator, readback, and unifier simultaneously.

**Unification idempotence.** Unifying a type with itself produces an empty substitution. Unifying `A` with `B` then applying the substitution to both should yield α-equivalent types. Row unification has additional properties: extension order should not affect the result, and row variables should unify consistently across multiple constraints.

**Solver soundness.** For any IVL formula `φ`, if `solver.check()` returns `sat`, the model should satisfy every asserted literal. If `unsat`, extracting the conflict clause and negating it should make the formula satisfiable (or at least remove that specific conflict). The `DSL` module already provides the combinators needed to build random formulas.

**Pattern coverage.** For a variant type with known tags, the pattern compiler should produce decision trees that cover every tag exactly once. Randomly generated variant types + pattern sets would test both the coverage check and the decision-tree builder.

**Generators.** `fast-check` supports compositional `Arbitrary` definitions. The key generators would be: well-typed terms (for NbE), row types (for unification), IVL formulas (for solver), and pattern matrices (for coverage). Each requires type-guided construction to produce meaningful inputs rather than random noise.

Related: [[testing-strategy]], [[fuzz-testing]], [[snapshot-testing]], [[nbe]], [[unification]], [[cdcl-t-solver]], [[exhaustiveness-checking]], [[row-types]]

<!-- connections:start -->

## Connections

**Outgoing**
- TARGETS → [[unification]]
- TARGETS → [[nbe]]
- TARGETS → [[cdcl-t-solver]]
- TARGETS → [[row-types]]
- EXTENDS → [[snapshot-testing]]

**Incoming**
- [[testing-strategy]] ← INCLUDES
- [[testing.thread]] ← INCLUDES

<!-- connections:end -->
