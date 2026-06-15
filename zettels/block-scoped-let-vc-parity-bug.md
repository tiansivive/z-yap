---
tags:
  - bug
  - verification
  - solver
  - sat
  - ivl
  - arithmetic
  - testing
---
# Block-scoped let VC parity bug

**Status:** Open  
**Discovered:** 2026-06-15  
**Test:** `src/__tests__/integration/refinement-types.test.ts` — `block scoped inner let VCs match the current Z3 oracle`

## Description

The v2 solver differs from Z3 on the VC generated for:

```yap
let compute: Num -> Num = \x -> {
	let doubled = x * 2;
	let added = doubled + 10;
	return added;
}
```

The current generated IVL contains suspicious self-referential arithmetic constraints:

```lisp
(forall ((x Real))
  (forall ((doubled Real))
    (=>
      (= doubled (* doubled 2))
      ...)))
```

Z3 reports `unsat`; v2 currently reports `sat`. The formula itself may be malformed, but the solver divergence still needs tracking until Z3 can be removed.

## Notes

There are likely two separable follow-ups:

- The verification pipeline should be checked for block-local let VC generation; an unrefined `Num -> Num` function should not obviously produce a contradictory VC.
- The solver should still be evaluated against the generated IVL as it exists today, because replacement parity requires known Z3/v2 divergences to be explicit.

<!-- connections:start -->

## Connections

**Outgoing**
- AFFECTS → [[translation-boundary-vc]] — Generated IVL shape appears suspicious
- AFFECTS → [[arithmetic-theory]] — Divergence involves arithmetic equalities

**Incoming**
- [[solver-v1-z3-removal]] ← PRESERVES — Former-oracle disagreement remains as integration test.fails bug
- [[solver-v2-monadic-port.implementation]] ← DEFERRED_TO — Z3 replacement blocker and VC-generation review item
- [[verification-backend.thread]] ← INCLUDES — Thread item 29
- [[global-pending-queue]] ← INCLUDES — Pending v2/VC parity bug

<!-- connections:end -->
