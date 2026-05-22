---
tags:
  [
    unification,
    elaboration,
    normalization,
    dependent,
    row-types,
    mechanism,
    research,
    paper,
    reference,
    monad,
    implemented,
    inference,
  ]
---
# Abel & Pientka — Higher-order dynamic pattern unification

[Higher-Order Dynamic Pattern Unification for Dependent Types and Records](https://doi.org/10.1007/978-3-642-21691-6_5). Andreas Abel, Brigitte Pientka. TLCA 2011 (LNCS 6690).

Constraint-style algorithm for λΠΣ (dependent types plus typed records): pattern constraints are solved eagerly; non-pattern fragments are delayed until instantiation narrows them. Σ-types are reduced via isomorphisms so remaining work stays on the Π side.

Yap's metavariable solving follows NbE-valued equality and substitution update in `src/elaboration/unification/unification.ts` (flex ↔ rigid binding, λ/Π/Σ/Mu cases), driven by `src/elaboration/shared/context.ts` and the elaboration monad in `src/elaboration/shared/monad.v2.ts`—related in spirit to Abel–Pientka but not a line-by-line port. The paper is the usual reference for how far automatic HO pattern discipline reaches in dependently typed implementations versus postponement.
