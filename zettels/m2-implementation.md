---
tags:
  - verification
  - sat
  - arithmetic
  - quantifiers
  - implemented
  - code
  - milestone
  - mechanism
  - solver
  - ir
  - implementation
  - ivl
refs:
  src:
    - src/verification/solver/cdcl/core.ts
    - src/verification/solver/cdcl/watched.ts
    - src/verification/solver/theories/theory.ts
    - src/verification/solver/theories/euf/arena.ts
    - src/verification/solver/theories/euf/cc.ts
    - src/verification/solver/theories/arithmetic/rational.ts
    - src/verification/solver/theories/arithmetic/bounds.ts
    - src/verification/solver/theories/arithmetic/branch.ts
    - src/verification/solver/theories/arithmetic/normalize.ts
    - src/verification/solver/theories/arithmetic/simplex.ts
    - src/verification/solver/theories/arithmetic/solver.ts
    - src/verification/solver/quantifiers/triggers.ts
    - src/verification/solver/quantifiers/ematch.ts
    - src/verification/solver/quantifiers/solver.ts
    - src/verification/solver/solver.ts
    - src/verification/solver/trace.ts
  tests:
    - src/verification/solver/__tests__/cdcl.test.ts
    - src/verification/solver/__tests__/arithmetic.test.ts
    - src/verification/solver/__tests__/quantifier.test.ts
    - src/verification/solver/__tests__/solver.test.ts
    - src/verification/solver/__tests__/trace.test.ts
---
# M2 implementation — EUF + quantifiers + linear arithmetic

Built the in-house CDCL(T) solver stack on top of M1's IVL representation. The solver is self-contained — no Z3 dependency for the solving loop.

## CDCL core (`cdcl/`)

**SAT engine** (`core.ts`): Two-watched-literal BCP, VSIDS-style decision heuristic, 1UIP conflict analysis with non-chronological backjumping, clause learning. Trail-based assignment with level tracking. Theory integration points: `assert` called inline during BCP for each assigned literal, `checkTheories` called before every decision.

**Watched literals** (`watched.ts`): Lazy two-watch scheme — no state rewinding on backtrack beyond trail indices. Watch replacement on falsification.

## EUF theory (`theories/euf/`)

**Term arena** (`arena.ts`): Hash-consed e-node pool. Terms interned by structure; each node carries a union-find representative. Shared across all theories.

**Congruence closure** (`cc.ts`): Union-find with path compression and union-by-rank. Parent propagation: after merge, scan parent applications for newly implied equalities. Produces equality/disequality propagations for the SAT core.

## Arithmetic theory (`theories/arithmetic/`)

**Rationals** (`rational.ts`): Arbitrary-precision rational arithmetic (bigint numerator/denominator, auto-reduced).

**Normalization** (`normalize.ts`): Rewrites IVL arithmetic atoms into `c₁x₁ + c₂x₂ + … ≤ k` linear normal form. Non-linear terms stay opaque.

**Simplex** (`simplex.ts`): Fixed-tableau solver with sliding bounds per Dutertre & de Moura. Pivot and update operations. Feasibility checking propagates through the tableau for both basic and non-basic variables.

**Bounds** (`bounds.ts`): Per-variable lower/upper bound tracking with justification (which literal tightened the bound).

**Branch-and-bound** (`branch.ts`): Integer feasibility — when a non-integer assignment is found for an integer variable, emit a disjunctive split `x ≤ ⌊v⌋ ∨ x ≥ ⌈v⌉`.

**Theory solver** (`solver.ts`): Wires normalization + simplex + bounds into the `Theory` interface. Both literal polarities registered so negated atoms tighten bounds correctly.

## Quantifier engine (`quantifiers/`)

**Triggers** (`triggers.ts`): Extract trigger patterns from quantified formulas. Each trigger is a set of terms containing the bound variables.

**E-matching** (`ematch.ts`): Walks the EUF arena matching trigger patterns against ground terms modulo the current congruence relation. Produces substitutions.

**Instantiation loop** (`solver.ts`): Per-round quantifier processing. For each active quantifier, E-match its triggers, produce ground lemma instances, encode them as CNF clauses, and assert into the SAT core. Complementary atom encoding handles the case where the negated atom form isn't directly in the atom table.

## Top-level solver (`solver.ts`)

Entry point: `solve(formulas)`. Normalizes, skolemizes, CNF-lowers, registers theories, runs CDCL(T) loop with quantifier rounds interleaved. A parallel `createTraced()` entry point returns a generator-based `TracedSolverInstance` that yields `Step` events for observability (see [[solver-trace]]).

## Theory tracing (`theory.ts`)

The `Theory` interface exposes both `assert`/`check` (silent) and `assertTrace`/`checkTrace` (generator-based) methods. The traced variants yield `TheoryStep` sub-events — `EUFTrace.Step` for congruence closure internals and `ArithTrace.Step` for simplex internals — consumed by the trace replay renderer.

## Implementation decisions

Extracted as standalone ADR zettels for reuse and independent traversal:

1. [[inline-theory-assert]] — Theory.assert inline during BCP, not batched after propagation.
2. [[dual-polarity-registration]] — Both polarities registered as atoms for arithmetic bound tracking.
3. [[complementary-atom-encoding]] — Quantifier lemma encoder resolves complement atoms lazily.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[milestone-2-euf-quant-lia]] — Realizes the milestone
- ADDRESSES → [[milestone-2-euf-quant-lia]] — Closes the open work item
- DEPENDS_ON → [[m1-implementation]] — Structurally built on IVL
- CONSUMES → [[m1-implementation]] — Solver ingests IVL formulas
- IMPLEMENTS → [[cdcl-t-solver]] — Realizes the CDCL(T) concept
- INSTANTIATES → [[cdcl-t-solver]] — Concrete core.ts from abstract design
- IMPLEMENTS → [[euf-theory]] — Realizes EUF via CC
- ENCODES → [[euf-theory]] — Hash-consed arena representation
- IMPLEMENTS → [[arithmetic-theory]] — Realizes simplex arithmetic
- ENCODES → [[arithmetic-theory]] — Rational bounds + fixed tableau representation
- IMPLEMENTS → [[quantifier-engine]] — Realizes quantifier instantiation
- DELEGATES_TO → [[quantifier-engine]] — Solver delegates rounds to quantifier loop
- IMPLEMENTS → [[theory-plugin-interface]] — Realizes the Theory API contract
- IMPLEMENTS → [[watched-literals]] — Two-watch in watched.ts
- IMPLEMENTS → [[bcp]] — Unit propagation in core.ts
- IMPLEMENTS → [[one-uip]] — 1UIP conflict analysis in core.ts
- IMPLEMENTS → [[congruence-closure]] — CC in euf/cc.ts
- IMPLEMENTS → [[e-matching]] — Trigger matching in quantifiers/ematch.ts
- VALIDATES → [[required-theory-support]] — Covers EUF + arithmetic + quantifiers
- USES → [[nieuwenhuis-oliveras]] — DPLL(T) architecture directly implemented
- USES → [[dutertre-arithmetic]] — Fixed-tableau simplex directly implemented
- USES → [[ge-de-moura-quantifiers]] — E-matching directly implemented
- USES → [[nelson-oppen]] — Theory combination via shared equalities
- IMPLEMENTS → [[z3-replacement.adr]] — M2 delivered EUF + quantifiers + LIA

**Incoming**
- [[session-m2-completion]] ← PRODUCED — Session delivered M2
- [[verification-backend.thread]] ← INCLUDES
- [[session-trace-observability]] ← DEPENDS_ON — Built on top of the M2 solver
- [[solver-trace]] ← DEPENDS_ON — Structurally built on the M2 solver
- [[solver-trace]] ← CONSUMES — Trace consumes solver generator output
- [[z3-replacement.adr]] ← PRODUCES
- [[inline-theory-assert]] ← DETAILS — Extracted from M2 record
- [[dual-polarity-registration]] ← DETAILS — Extracted from M2 record
- [[complementary-atom-encoding]] ← DETAILS — Extracted from M2 record
- [[mbqi]] ← EXTENDS — Builds on M2 quantifier loop, shares instantiation keys
- [[solver-v2-monadic-port.session]] ← FOLLOWS — Ports M2 solver into the v2 architecture

<!-- connections:end -->
