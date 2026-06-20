---
adr-id: D-009
tags:
  - adr
  - accepted
  - decision
  - verification
  - validity
  - liquid
  - solver
  - sat
  - ivl
  - quantifiers
  - qf-euflia
  - architecture
  - in-progress
refs:
  - adr:D-001
  - src: src/verification/validity.ts
  - src: src/verification/solver/v2/solver.ts
---
# VC validity before SAT

**Decision:** Yap-generated verification conditions are discharged through a validity layer before calling the raw satisfiability solver.

## Scope

The raw CDCL(T) backend keeps its `sat` / `unsat` / `unknown` API over IVL formulas. Verification-facing code interprets generated VCs as obligations, structurally consumes guarded Liquid binders, and calls the solver on counterexample queries of the form `assumptions and not goal`.

This decision applies to VCs produced by Yap's refinement pipeline. It does not redefine the raw solver API, solver tests, or general SMT reference zettels.

## Rationale

Liquid-style refinement checking is a validity problem. A generated VC may be satisfiable while still failing verification, because satisfiability only says some model makes the formula true. Verification needs absence of counterexamples.

Guarded universals in Yap VCs encode typing environments: binders, selfification equalities, and path assumptions. A validity discharge pass can thread those assumptions to leaf obligations, preserving the intended Liquid fragment and reducing most solver calls to quantifier-free EUF plus linear arithmetic.

Keeping this layer outside the SAT solver preserves separation of concerns:

- VC generation owns bidirectional typing and refinement structure.
- IVL owns the solver-neutral formula representation.
- Validity discharge owns VC polarity and guarded-binder traversal.
- CDCL(T) owns raw satisfiability and theory consistency.

## Consequences

Raw `sat` from `Solver.check(vc)` is not a verification success. Verification code must report `valid` when the counterexample query is `unsat`, `invalid` when the counterexample query is `sat`, and `unknown` when the backend cannot decide.

Full MBQI and incremental abstraction extension remain useful for general quantified SMT support, but they are not the primary mechanism for nested Liquid VCs. The solver can remain simpler than Z3-class general-purpose engines while still serving Yap's restricted verification fragment.

The proof-of-concept integration lives in the integration pipeline helper and the unconstrained-identity refinement test. CLI and explorer verification entry points should be audited to use the same validity result before treating solver output as a user-facing verdict.

<!-- connections:start -->

## Connections

**Outgoing**
- REFRAMES → [[z3-replacement.adr]] — D-001 still stands; D-009 inserts validity between VC IR and raw SAT
- DEFINES → [[vc-validity-discharge]] — Decision defines the verifier-facing layer
- CLARIFIES → [[validity-vs-satisfiability]] — Verification verdict polarity
- CLARIFIES → [[verification-backend]] — Backend validates obligations, raw solver checks satisfiability
- CLARIFIES → [[verification-pipeline]] — Pipeline boundary between VC generation and raw SAT
- REFRAMES → [[solver-v2-universal-refinement-false-sat]] — Identity refinement failure was missing validity discharge on the Yap path

**Incoming**
- [[vc-validity-discharge.session]] ← PRODUCED — D-009 decision record
- [[verification-backend.thread]] ← INCLUDES — Thread item 31 decision record

<!-- connections:end -->
