---
tags:
  - verification
  - validity
  - sat
  - solver
  - logic
  - concept
  - counterexample
  - ivl
  - refinement
  - liquid
  - reference
  - principle
---
# Validity vs satisfiability

Satisfiability asks whether a formula has at least one model. Validity asks whether a formula holds in every model.

Verification conditions are validity obligations. To prove an obligation `P`, the checker asks the solver whether `not P` is satisfiable. `unsat` means no counterexample exists, so `P` is valid. `sat` means the model is a counterexample, so `P` is invalid. `unknown` means the verifier could not decide the obligation.

This polarity is independent of the raw formula's intuitive truth in a convenient model. A formula such as `forall x. f(x) = 0` is satisfiable because one interpretation maps `f` to the constant-zero function. It is not valid unless every admissible interpretation of `f` has that shape.

Yap's raw `Solver.check(formula)` API reports satisfiability of `formula`. Yap's verification pipeline needs a validity wrapper around generated VCs so raw `sat` is not accidentally treated as “verified”.

<!-- connections:start -->

## Connections

**Outgoing**
- CLARIFIES → [[smt-solver-glossary]] — SAT/UNSAT vs valid/invalid terminology
- CLARIFIES → [[cdcl-t-solver]] — Raw SAT API is not verifier verdict
- CLARIFIES → [[solver-v2-monadic-port.implementation]] — Solver.check remains raw satisfiability

**Incoming**
- [[vc-validity-discharge.session]] ← PRODUCED — Knowledge zettel from validity investigation
- [[vc-validity-before-sat.adr]] ← CLARIFIES — Verification verdict polarity
- [[vc-validity-discharge]] ← USES — Counterexample-query polarity
- [[verification-backend.thread]] ← INCLUDES — D-009 knowledge cluster

<!-- connections:end -->
