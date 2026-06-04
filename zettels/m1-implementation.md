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

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[milestone-1-ir-boundary]] — Realizes the milestone
- ADDRESSES → [[milestone-1-ir-boundary]] — Closes the open work item
- IMPLEMENTS → [[vc-ir]] — IVL types/builder realize the VC IR concept
- INSTANTIATES → [[vc-ir]] — Concrete TypeScript module from abstract design
- IMPLEMENTS → [[translation-boundary-vc]] — z3.adapter.ts realizes the boundary
- PRESERVES → [[translation-boundary-vc]] — Keeps Z3 working during transition
- IMPLEMENTS → [[boolean-lowering-cnf]] — cnf.ts realizes Tseitin pass
- IMPLEMENTS → [[vc-normalization]] — normalize.ts realizes formula simplification
- IMPLEMENTS → [[quantifier-preparation]] — skolem.ts realizes skolemization
- USES → [[tseitin-cnf]] — Tseitin algorithm used in cnf.ts
- SUPERSEDES → [[smt-translation]] — IVL replaces direct Z3 encoding
- DEPRECATES → [[smt-translation]] — translate.ts path now legacy
- VALIDATES → [[required-formula-forms]] — IVL covers all required formula shapes
- FOLLOWS → [[z3-replacement.adr]] — First concrete step after the decision
- IMPLEMENTS → [[z3-replacement.adr]] — M1 delivered IVL boundary
- PRODUCES → [[ivl-boundary]] — M1 delivered IVL types
- PRODUCES → [[z3-adapter-strategy]] — Adapter built in M1

**Incoming**
- [[session-m2-completion]] ← PRODUCED — Session delivered M1
- [[m2-implementation]] ← DEPENDS_ON — Structurally built on IVL
- [[m2-implementation]] ← CONSUMES — Solver ingests IVL formulas
- [[verification-backend.thread]] ← INCLUDES
- [[solver-trace]] ← USES — Uses IVL printer for formula rendering
- [[build-simplify-toggle]] ← APPLIES_TO — Modifies Build module from M1
- [[pipeline-explorer]] ← USES — IVLPrint for formula rendering
- [[z3-replacement.adr]] ← PRODUCES

<!-- connections:end -->
