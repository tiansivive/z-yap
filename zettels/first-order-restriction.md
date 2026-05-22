---
tags:
  [
    verification,
    type-system,
    modality,
    sat,
    ivl,
    solver,
    concept,
    principle,
    mechanism,
    dependent,
    implemented,
    decision,
  ]
---
# First-order restriction

Yap's verification operates in a first-order fragment: refinement predicates, VC formulas, and IVL terms must stay within a decidable SMT-class logic (QF-EUFLIA — quantifier-free equality, uninterpreted functions, linear integer arithmetic). Function-sorted terms are excluded from atoms because SMT solvers have no decision procedure for extensional function equality.

The restriction appears at three points in the pipeline:

1. **[[selfification]]** — the `isFirstOrder` guard prevents self-equality refinements (`v = x`) from being added to function-typed variables. Without this, `(= f f)` atoms on function sorts would enter the IVL formula and be interned into the EUF arena.

2. **Pi subtyping** (`src/verification/V2/subtype.ts`) — when checking `(a → b) <: (a' → b')`, the `isFirstOrder` guard on the parameter annotation decides whether to extract the liquid predicate and emit `∀x. φ(x) ⇒ body_vc`. Higher-order parameters skip refinement quantification and check only structural subtyping.

3. **Translation** — the sort system in IVL distinguishes `Type` (first-order) from `Fn` (higher-order). The `Fn` sort exists for structural representation but formulas should not contain atoms with `Fn`-sorted terms.

The `isFirstOrder` predicate (`src/verification/V2/utils/refinements.ts`) is the shared boundary: it unwraps `Modal` and `Neutral` wrappers, then returns `false` for Pi, Lambda, and Sigma types. All verification code that needs to decide whether a type is refinable uses this single predicate.

This aligns with the standard treatment in the [[liquid-haskell-influence]] lineage — see [[knowles-flanagan-2010]], [[vazou-mechanizing-refinement-types-2024]], [[vazou-refinement-reflection-2018]].
