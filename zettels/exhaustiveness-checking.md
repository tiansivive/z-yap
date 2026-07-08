---
tags:
  [
    type-system,
    elaboration,
    inference,
    pattern,
    problem,
    incomplete,
    needs-design,
    testing,
    syntax,
    ast,
    migration,
    dependent,
    recursion,
    tooling,
  ]
---
# Exhaustiveness checking

Language-level `match` elaboration (`src/elaboration/inference/match.ts`): alternatives are inferred, pairwise constrained to a common result type (`tell("constraint", { assign … })`). Coverage proofs—showing branches cover all constructors of a variant or all inhabitants of a type—are a design target alongside the existing inference path; comments note TODOs (e.g. variant typing, narrowing the scrutinee under patterns).

Distinct use of “exhaustive”: internal code uses ts-pattern `.exhaustive()` on host-language `match` arms (e.g. `src/elaboration/pretty/pretty.ts`, `normalization/evaluation.v2.ts`) — TypeScript exhaustiveness over EB/NF variants, not user-visible pattern exhaustiveness.

Surface-language exhaustiveness/redundancy diagnostics remain **incomplete** (`needs-design`): lowering can emit runtime non-exhaustive fallbacks, but elaboration does not yet report missing or redundant arms.

Related: [[open-closed-variants]], [[dependent-pattern-matching]], [[data-declarations]], [[variant-types]].

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[match]] — Safety gap
- RELIES_ON → [[open-closed-variants]] — Open vs closed determines strategy
- RELIES_ON → [[pattern-matching-compilation]] — Coverage from decision tree
- APPLIES_TO → [[match]] — Surface match coverage
- USES → [[variant-types]] — Tag sets determine coverage
- INFORMS → [[dependent-pattern-matching]] — Refined types affect coverage

**Incoming**
- [[pattern-matching.thread]] ← INCLUDES
- [[inductive-types]] ← INFORMS — Known constructors enable coverage
- [[data-declarations]] ← ENABLES — Named constructors enable coverage
- [[gadts]] ← INFORMS — Impossible branches via index constraints
- [[dependent-pattern-matching]] ← INFORMS — Refined types affect coverage
- [[view-patterns]] ← INFORMS — Views can simplify coverage
- [[active-patterns]] ← INFORMS — Complete patterns preserve coverage
- [[open-closed-variants]] ← INFORMS — Primary discriminant for coverage
- [[fuzz-testing]] ← INFORMS
- [[negative-testing]] ← INFORMS
- [[redundant-match-arms]] ← EXTENDS — Redundancy half: an irrefutable arm shadows the rest; a diagnostic, not a typing concern

<!-- connections:end -->
