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
  plans:
    - .cursor/plans/SMT Solver M2 Core-50b94189.plan.md
    - .cursor/plans/M2 Missing Pieces-50b94189.plan.md
  docs:
    - docs/SMT-SOLVER.md
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
  tests:
    - src/verification/solver/__tests__/cdcl.test.ts
    - src/verification/solver/__tests__/arithmetic.test.ts
    - src/verification/solver/__tests__/quantifier.test.ts
    - src/verification/solver/__tests__/solver.test.ts
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

Entry point: `solve(formulas)`. Normalizes, skolemizes, CNF-lowers, registers theories, runs CDCL(T) loop with quantifier rounds interleaved.

## Implementation decisions

1. **Theory.assert inline during BCP**: Each literal assignment immediately informs theories, not batched after propagation. `checkTheories` runs before every decision — this catches theory conflicts that BCP alone can't see.

2. **Dual polarity registration for arithmetic**: Both `x+y ≤ 5` and its negation `x+y > 5` are registered as atoms with corresponding bound updates. Without this, negated arithmetic literals had no effect on the simplex tableau.

3. **Complementary atom encoding in quantifier lemmas**: When the quantifier engine instantiates `∀x. f(x) ≠ 1` as `f(a) ≠ 1`, it needs the literal for `f(a) ≠ 1`. If only `f(a) = 1` is in the atom table, `encodeLemma` finds the complementary atom and negates its literal rather than failing.
