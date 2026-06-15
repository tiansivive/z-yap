---
tags:
  - bug
  - verification
  - solver
  - sat
  - quantifiers
  - arithmetic
  - ivl
  - testing
---
# Solver v2 universal refinement false SAT

**Status:** Open  
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

Z3 reports `unsat`; v2 currently reports `sat`. This is a replacement blocker because v2 is accepting a VC that the current oracle rejects.

## Notes

This is distinct from [[euf-congruence-propagation-bug]]. The formula is a quantified arithmetic/refinement obligation rather than an EUF congruence closure case.

<!-- connections:start -->

## Connections

**Outgoing**
- AFFECTS → [[quantifier-engine]] — Universal refinement obligation needs quantifier reasoning
- AFFECTS → [[arithmetic-theory]] — Refutation depends on arithmetic inconsistency

**Incoming**
- [[solver-v1-z3-removal]] ← PRESERVES — Former-oracle disagreement remains as integration test.fails bug
- [[solver-v2-monadic-port.implementation]] ← DEFERRED_TO — Z3 replacement blocker
- [[verification-backend.thread]] ← INCLUDES — Thread item 28
- [[global-pending-queue]] ← INCLUDES — Pending v2 parity bug

<!-- connections:end -->
