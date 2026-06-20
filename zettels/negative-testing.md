---
tags:
  [
    testing,
    exploration,
    type-system,
    elaboration,
    verification,
    goal,
    compiler,
    concern,
    infrastructure,
    planned,
  ]
---

# Negative testing

Yap's test suite is predominantly positive — it checks that correct programs elaborate and type-check successfully. Systematic negative testing would verify that incorrect programs fail with the right diagnostics at the right stage.

**Type errors.** Programs with type mismatches, arity errors, missing record fields, or ill-formed variant injections should produce specific elaboration errors. Currently some inference tests check for thrown errors, but there is no organized catalog of expected-failure cases.

**Parse errors.** Malformed syntax should produce parse failures (Nearley: zero results or ambiguity; tree-sitter: error nodes). Testing parse error *messages* and *recovery* matters for editor integration and LSP.

**Unsatisfiable refinements.** Programs annotated with contradictory refinement predicates (e.g., `Num [|\v -> v > 0 && v < 0 |]`) should be flagged by the solver as unsatisfiable. The CDCL solver returns `unsat` but the diagnostic path from solver result back to user-facing error could use dedicated test coverage.

**Non-termination.** Yap's NbE evaluator uses a step budget as a runtime guard. Programs that trigger infinite evaluation should hit the budget and produce a clear error rather than hanging. Step-budget edge cases (large but finite computations vs genuinely divergent ones) are worth testing explicitly.

**Scope errors.** References to unbound variables, duplicate `let` bindings, `using` declarations for values not in scope — each has a specific error path in elaboration that benefits from test coverage.

**First baseline.** The audit identifies a compact first pass: wrong annotation, missing/extra record field, heterogeneous list, bad variant payload, invalid dependent field reference, resume without shift, nested reset delimiter behavior, contravariance reverse case, refinement-polymorphism failure, higher-order refinement failure, false-branch flow sensitivity, nonlinear refinement boundary, and verification `unknown` propagation.

Related: [[testing-strategy]], [[match]], [[refinement-types]], [[termination-checking]], [[exhaustiveness-checking]], [[cdcl-t-solver]]

<!-- connections:start -->

## Connections

**Outgoing**
- TARGETS → [[match]]
- TARGETS → [[refinement-types]]
- TARGETS → [[termination-checking]]
- INFORMS → [[exhaustiveness-checking]]

**Incoming**
- [[testing-strategy]] ← INCLUDES
- [[testing.thread]] ← INCLUDES
- [[semantic-assertions-with-regression-snapshots]] ← INFORMS — Expected failures need explicit assertions

<!-- connections:end -->
