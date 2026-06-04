---
tags:
  - verification
  - concept
  - principle
  - sat
  - arithmetic
  - strings
  - row-types
  - quantifiers
  - backend
  - unification
  - milestone
  - ffi
---
# Required theory support

Yap's verification fragment — liquid refinements over a dependently typed core — requires decision procedures for several theories. These requirements are independent of any particular solver backend; they held when Z3 was the engine, they hold for the in-house CDCL(T) stack, and they constrain any future backend.

## Core theories

**EUF (Equality + Uninterpreted Functions):** Congruence reasoning over function applications. Refinements assert equalities and disequalities between terms; the solver must close over congruence. This is the ground floor for any SMT-style backend.

**Linear integer/real arithmetic:** Refinements express bounds, ordering, and arithmetic relationships. Mixed integer/real support handles both discrete (array indices, counts) and continuous (ratios, measurements) domains. Non-linear operators (`*`, `/`, `%`) stay in the IR as uninterpreted or partially reduced; full non-linear theory is deferred.

**Guarded quantifiers with instantiation:** Yap's `forall` refinements produce universally quantified VCs. The solver must instantiate these via trigger-based E-matching or similar heuristics — pure ground reasoning is insufficient.

## Extended theories (phased)

**Strings:** Equality, concatenation, length, prefix/suffix/contains. Currently uninterpreted; a dedicated solver aligning with string primitives in the language is a milestone target.

**Row containment:** Structural row reasoning aligned with `subtype.contains` — the verifier's row comparison. Z3 has no row theory, which is one of the strongest justifications for the IVL/owned-solver direction: row reasoning must be first-class, not encoded as uninterpreted sorts.

## Design implications

The row theory requirement was a key driver for the [[z3-replacement.adr]]: no existing SMT solver natively handles Yap's structural row shapes. An owned engine can host a theory plugin that shares the same row rewriting and containment logic used in elaboration, rather than encoding rows as opaque terms and losing structural information at the translation boundary.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[theory-plugin-interface]] — All theories needed
- MOTIVATES → [[z3-replacement.adr]] — Row theory gap drove the decision

**Incoming**
- [[verification-backend.thread]] ← RELIES_ON — Theory requirements
- [[m2-implementation]] ← VALIDATES — Covers EUF + arithmetic + quantifiers

<!-- connections:end -->
