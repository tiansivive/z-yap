---
tags:
  [
    research,
    speculative,
    elaboration,
    inference,
    unification,
    solver,
    recursion,
    quantifiers,
    decision,
    problem,
    language,
  ]
---
# Logic Programming

**Codebase:** Elaboration uses **deterministic unification** and constraint solving (`src/elaboration/unification/`, `src/elaboration/solver/`), not backtracking goal search. Logic-programming idioms (miniKanren, Prolog, narrowing, relational search) do not appear in Yap sources today.

**Status:** Speculative — relational metaprogramming or inhabitant search would need a concrete design and explicit integration with refinements (`src/verification/`) or GRAM before leaving **speculative**.

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[elaboration]] — miniKanren-like relational fragments
- USES → [[unification]] — Relational reasoning via unification

<!-- connections:end -->
