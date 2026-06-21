---
tags:
  - bug
  - resolved
  - verification
  - solver
  - sat
  - ivl
  - validity
  - arithmetic
  - testing
---
# Block-scoped let VC parity bug

**Status:** Resolved. The block-local let obligation discharges as valid; the suspicious self-referential VC no longer appears.  
**Discovered:** 2026-06-15  
**Resolved:** 2026-06-21  
**Test:** `src/__tests__/integration/refinement-types.test.ts` — `block-local let obligations verify through validity discharge`

## Resolution

The temporary Z3-oracle `test.fails` was retired. The same program now asserts `valid` via `Verdict.expect(result, "compute", "valid")`. The contradictory `(= doubled (* doubled 2))` shape is gone; an unrefined `Num -> Num` block-local computation produces a dischargeable obligation. The [[vc-validity-discharge]] path resolves the block-local-let case that was previously contrasted as "VC-generation first".

## Original defect (historical)

The v2 solver differed from Z3 on the VC generated for:

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

Z3 reports `unsat`; v2 currently reports `sat` for the current generated formula. The formula shape is the primary concern: an unrefined `Num -> Num` block-local computation should be reviewed at VC generation before treating the raw solver divergence as the main issue.

## Notes

There are likely two separable follow-ups:

- The verification pipeline should be checked for block-local let VC generation; an unrefined `Num -> Num` function should not obviously produce a contradictory VC.
- Validity discharge does not by itself explain this case. First establish the intended VC for the source program, then evaluate whether any remaining raw solver divergence is a general SMT issue.

<!-- connections:start -->

## Connections

**Outgoing**
- AFFECTS → [[translation-boundary-vc]] — Generated IVL shape appears suspicious
- AFFECTS → [[arithmetic-theory]] — Divergence involves arithmetic equalities

**Incoming**
- [[solver-v1-z3-removal]] ← PRESERVES — Former-oracle disagreement remains as integration test.fails bug
- [[solver-v2-monadic-port.implementation]] ← DEFERRED_TO — Former-oracle divergence and VC-generation review item
- [[verification-backend.thread]] ← INCLUDES — Thread item 29
- [[global-pending-queue]] ← INCLUDES — Pending v2/VC parity bug
- [[vc-validity-discharge]] ← RESOLVES — Block-local let obligation discharges as valid

<!-- connections:end -->
