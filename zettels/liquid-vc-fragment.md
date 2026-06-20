---
tags:
  - verification
  - liquid
  - validity
  - fragment
  - qf-euflia
  - quantifiers
  - type-system
  - refinement
  - solver
  - ivl
  - reference
  - implemented
refs:
  external:
    - https://goto.ucsd.edu/~rjhala/papers/liquid_types.html
    - https://arxiv.org/pdf/1701.03320
  src:
    - src/verification/V2/logic/translate.ts
    - src/verification/V2/check.ts
    - src/verification/V2/subtype.ts
    - src/verification/V2/utils/refinements.ts
---
# Liquid VC fragment

Liquid Types abbreviates **Logically Qualified Data Types**: refinements are drawn from logical qualifiers and checked with automated SMT reasoning rather than arbitrary dependent proof search.

Yap follows that split. Elaborated refinement predicates become IVL verification conditions through `check`, `synth`, and `subtype`; the generated formulas may contain nested guarded universals, but those binders encode typing environments and implication guards, not a request to solve arbitrary quantified SMT benchmarks directly.

The intended checking discipline is:

1. Generate a guarded VC from the bidirectional refinement judgment.
2. Interpret the VC as a validity obligation.
3. Traverse the guarded universal structure as an environment of symbolic values and path assumptions.
4. Discharge each leaf by asking the raw SMT solver for a counterexample to the leaf goal.

Under that discipline, the raw solver mostly sees quantifier-free EUF plus linear arithmetic obligations. The surface VC syntax can still mention `forall`; the fragment restriction lives in how those binders are generated and discharged.

The first-order restriction keeps selfification and predicate translation away from higher-order values. Row, string, and non-linear arithmetic theory support are separate backend extensions; they do not change the core Liquid separation between VC generation, validity discharge, and SAT solving.

<!-- connections:start -->

## Connections

**Outgoing**
- GROUNDED_IN → [[liquid-haskell-influence]] — Yap fragment follows the Liquid split
- CONSTRAINS → [[vc-validity-discharge]] — Guarded binders are consumed as environment structure
- CLARIFIES → [[refinement-types]] — Refinements target a restricted Liquid VC discipline
- CLARIFIES → [[bidir-subtype-verification]] — Guarded quantifiers come from bidirectional judgments

**Incoming**
- [[vc-validity-discharge.session]] ← PRODUCED — Knowledge zettel from validity investigation
- [[liquid-haskell-influence]] ← INFORMS — Logically Qualified Data Types and Liquid checking discipline
- [[verification-backend.thread]] ← INCLUDES — D-009 knowledge cluster

<!-- connections:end -->
