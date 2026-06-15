---
tags:
  [
    verification,
    quantifiers,
    mbqi,
    instantiation,
    fallback,
    solver,
    sat,
    mechanism,
    backend,
    arithmetic,
    inference,
    implemented,
    incomplete,
  ]
refs:
  src:
    - src/verification/solver/quantifiers/mbqi.ts
    - src/verification/solver/solver.ts
    - src/verification/solver/trace.ts
  tests:
    - src/verification/solver/__tests__/quantifier.test.ts
---
# Bounded MBQI (model-based quantifier instantiation)

Fallback instantiation engine for quantifiers that E-matching cannot reach. Triggers require function applications containing the bound variables; pure arithmetic quantifiers such as `∀v. v = 1 ⇒ v > 10` have none, so an E-matching-only regime saturates with zero lemmas and the solver wrongly reports SAT. Bounded MBQI closes that gap.

**Algorithm** (`quantifiers/mbqi.ts`): enumerate ground terms by sort from two sources — the EUF arena (terms the congruence closure already knows) and the quantifier bodies themselves (so constants like `1` in `v = 1` are candidates even before any ground assertion mentions them). Generate substitutions as the cartesian product over binder sorts, capped at 10 ground terms per sort. Deduplicate against the instantiation-key set shared with E-matching. Each grounded body is simplified three-ways: `true` (vacuous, dropped), `false` (contradiction witness), or residual formula (encoded as a CNF lemma via the same complementary-atom encoder E-matching uses, asserted into the SAT core).

**Dispatch** (`solver.ts`): two entry points.
1. *Fallback in the CDCL(T) loop* — when an E-matching round produces no new lemmas, an MBQI round runs before declaring SAT; any lemmas it produces feed the next round with an incremented generation.
2. *Pure-quantifier fast path* — formulas whose propositional part is trivially `True` skip Tseitin/CDCL entirely and run MBQI rounds directly; a substitution simplifying to `false` yields UNSAT, all-`true` yields SAT, and the round limit yields `unknown`.

Both paths emit `mbqi-round` (and the fast path `pure-quantifier`) trace steps, so instantiation choices are visible in trace replay alongside E-matching rounds.

**Deviation from full MBQI** ([[ge-de-moura-quantifiers]]): no counterexample-guided refinement — witness terms are not constructed from the arithmetic model; enumeration is restricted to ground terms already present in the problem. This is sound and adequate for Yap's VCs because they are generated from local program structure, so the relevant constants always appear in the formula. Generation and per-sort bounds follow the Z3/cvc5 convention of bounding instantiation to avoid divergence.

<!-- connections:start -->

## Connections

**Outgoing**
- CONTRASTS_WITH → [[e-matching]] — Semantic ground-term enumeration vs syntactic trigger matching
- USES → [[euf-theory]] — Ground-term enumeration by sort from the arena
- INSTANTIATES → [[cdcl-t-solver]] — Ground lemmas asserted as CNF clauses
- EXTENDS → [[milestone-2-euf-quant-lia]] — Post-M2 increment to the quantifier engine
- EXTENDS → [[m2-implementation]] — Builds on M2 quantifier loop, shares instantiation keys

**Incoming**
- [[quantifier-engine]] ← INCLUDES — MBQI is the second stage of the instantiation engine
- [[quantifier-engine]] ← FALLS_BACK_TO — Engaged when an E-matching round produces no lemmas
- [[ge-de-moura-quantifiers]] ← INFORMS — Bounded variant of complete instantiation (CAV 2009)
- [[solver-trace]] ← EXPOSES — mbqi-round and pure-quantifier steps in trace replay
- [[complementary-atom-encoding]] ← APPLIES_TO — Same lemma encoder as E-matching instantiation
- [[verification-backend.thread]] ← INCLUDES

<!-- connections:end -->
