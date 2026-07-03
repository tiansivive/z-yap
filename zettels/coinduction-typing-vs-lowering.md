---
tags:
  - design
  - decision-pending
  - deferred
  - needs-design
  - coinduction
  - codata
  - productivity
  - type-system
  - gram
  - lowering
  - recursion
  - nu-types
refs:
  - thread:recursion
  - thread:gram-evolution
---

# Where coinduction lives — typing vs lowering

Admitting productive value-level codata — a constructor-guarded stream like `{ ones: { head: 1, tail: :ones } }` — requires a productivity check. There is an open fork on where that check lives.

**(a) In the type system.** Add coinductive `ν` types so productivity is a typing property. GRAM then receives only well-formed coinductive values and lowers them structurally, with no admissibility reasoning of its own.

**(b) At GRAM lowering.** Keep the type layer simpler and extend the label-cycles pass: a constructor-guarded cycle is admitted if productive and lowered to a lazy/thunked form, rejected otherwise.

The tradeoff is type-system surface and guarantees against a smaller type layer that defers the check to lowering. Both admit the same programs; they differ in where the guarantee is discharged and stated. Unguarded ill-founded references — `{ foo: :bar, bar: :foo }`, never productive — stay rejected under either.

The current lowering-time gate collapses both cases: every eager label cycle is rejected, so productive streams and ill-founded self-references are treated alike. Splitting them is the work this decision precedes.

<!-- connections:start -->

## Connections

**Outgoing**
- MAY_RESOLVE_VIA → [[nu-types]] — Option (a): productivity as a typing property
- MAY_RESOLVE_VIA → [[productivity-checking]] — Option (b): productivity check at lowering
- CONTRASTS_WITH → [[codata-vs-coinductive-types]] — The two shapes the decision must separate

**Incoming**
- [[recursion.thread]] ← INCLUDES — Open fork on productivity placement
- [[gram-evolution.thread]] ← INCLUDES — Lowering-time option extends label-cycles
- [[label-cycle-guardedness]] ← MOTIVATES — The lumped eager-cycle rejection is what the decision splits

<!-- connections:end -->
