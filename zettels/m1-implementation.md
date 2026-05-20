---
tags:
  - verification
  - ir
  - implemented
  - code
  - milestone
  - mechanism
  - ast
  - solver
  - normalization
  - sat
  - implementation
  - ivl
refs:
  plans:
    - .cursor/plans/SMT Solver M1 IR-50b94189.plan.md
    - .cursor/plans/Milestone 1 IVL Boundary-50b94189.plan.md
  docs:
    - docs/SMT-SOLVER.md
  src:
    - src/verification/solver/ivl/types.ts
    - src/verification/solver/ivl/build.ts
    - src/verification/solver/ivl/print.ts
    - src/verification/solver/ivl/dsl.ts
    - src/verification/solver/ivl/index.ts
    - src/verification/solver/z3.adapter.ts
    - src/verification/solver/normalize.ts
    - src/verification/solver/cnf.ts
    - src/verification/solver/skolem.ts
  tests:
    - src/verification/solver/__tests__/normalize.test.ts
    - src/verification/solver/__tests__/cnf.test.ts
    - src/verification/solver/__tests__/solver.test.ts
---
# M1 implementation — IR boundary

IVL (Intermediate Verification Language) replaces direct Z3 expression construction with a Yap-owned, backend-neutral formula representation. The namespace was renamed from `VC` to `IVL` during implementation for clarity.

## What was built

**IVL types** (`ivl/types.ts`): `Sort` (Bool, Int, Real, BitVec, Array, Uninterpreted, Row, String, Unit), `Term` (Var, Lit, App, Select, Store, Ite), `Formula` (Atom, Not, And, Or, Implies, Iff, Forall, Exists, Let). All types are immutable tagged unions dispatched via ts-pattern.

**Smart constructors** (`ivl/build.ts`): Canonical builder functions that enforce structural invariants (e.g. double negation elimination, flattening nested And/Or).

**S-expr printer** (`ivl/print.ts`): Renders IVL terms/formulas as s-expressions for debugging and test snapshots.

**DSL helpers** (`ivl/dsl.ts`): Convenience layer for test authoring — pre-built sorts, variable constructors, formula combinators.

**Z3 bridge adapter** (`z3.adapter.ts`): Translates IVL formulas to Z3 expressions so the existing verification pipeline keeps working while the in-house solver is built. This is the translation boundary — it preserves the Z3 backend during the transition period.

**VC normalization** (`normalize.ts`): Formula simplification pass — constant folding, double negation, trivial conjunction/disjunction elimination.

**Boolean lowering** (`cnf.ts`): Tseitin-style CNF transformation. Theory atoms stay opaque; boolean structure becomes clauses with fresh proxy variables.

**Skolemization** (`skolem.ts`): Existential elimination under universal prefixes, producing Skolem functions.

## Deferred

Full translation boundary rewrite (`translate.ts` → IVL emission) deferred. The Z3 adapter bridges the gap: obligations still originate as Z3 expressions through the existing pipeline, but the solver path now goes through IVL.
