---
tags:
  - bug
  - resolved
  - verification
  - solver
  - sat
  - validity
  - liquid
  - quantifiers
  - arithmetic
  - ivl
  - testing
  - limitation
---
# Solver v2 universal refinement false SAT

**Status:** Reframed. The Yap verification-path failure is resolved by [[vc-validity-discharge]]. The raw v2/Z3 discrepancy remains a general quantified-SMT completeness limitation, scoped by [[quantifier-instantiation-boundary]].  
**Discovered:** 2026-06-15  
**Test:** `src/__tests__/integration/refinement-types.test.ts` — `negative lambda postcondition rejects unconstrained identity`

## Description

The v2 solver accepts the verification condition generated for:

```yap
let negIdentity: Num -> Num [| \n -> n > 0 |] = \x -> x
```

The generated IVL obligation is equivalent to requiring every real value to be positive:

```lisp
(forall ((x Real))
  (and
    (= x x)
    (forall ((v Real)) (=> (= v x) (> v 0)))))
```

Z3 reports `unsat`; v2 currently reports `sat` when the printed formula is sent directly to the raw solver.

## Reframing

The original test treated the raw satisfiability result for the whole generated IVL formula as the verification verdict. Yap-generated refinement VCs are validity obligations, so the verifier-facing check is a counterexample query over the guarded environment.

For the inner postcondition, validity discharge accumulates the symbolic binder and selfification guard, then asks whether `x` can violate `x > 0`. That counterexample query is satisfiable, so the VC is `invalid`; this is the expected result for the unconstrained identity implementation.

The printed universal formula is still a useful stress test for general quantified SMT. If the raw solver is asked to decide that formula directly, bounded MBQI may miss the refuting instance. That belongs with general quantifier-engine completeness work, not with the ordinary Liquid VC path.

## Notes

This is distinct from [[euf-congruence-propagation-bug]]. The formula is a quantified arithmetic/refinement obligation rather than an EUF congruence closure case.

<!-- connections:start -->

## Connections

**Outgoing**
- AFFECTS → [[quantifier-engine]] — Universal refinement obligation needs quantifier reasoning
- AFFECTS → [[arithmetic-theory]] — Refutation depends on arithmetic inconsistency

**Incoming**
- [[solver-v1-z3-removal]] ← PRESERVES — Historical raw quantified-SMT discrepancy preserved after Z3 removal
- [[solver-v2-monadic-port.implementation]] ← DEFERRED_TO — Raw quantified-SMT discrepancy later reframed by D-009
- [[verification-backend.thread]] ← INCLUDES — Thread item 28
- [[global-pending-queue]] ← INCLUDES — Resolved/reframed queue item
- [[vc-validity-before-sat.adr]] ← REFRAMES — Identity refinement failure was missing validity discharge on the Yap path
- [[vc-validity-discharge]] ← RESOLVES — Resolves the Yap verification-path interpretation

<!-- connections:end -->
