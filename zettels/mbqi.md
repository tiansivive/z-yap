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
    - src/verification/solver/v2/quantifier/mbqi/round.ts
    - src/verification/solver/v2/quantifier/mbqi/universe.ts
    - src/verification/solver/v2/quantifier/mbqi/candidates.ts
    - src/verification/solver/v2/quantifier/mbqi/grounding.ts
    - src/verification/solver/v2/quantifier/round.ts
  tests:
    - src/verification/solver/v2/quantifier/__tests__/quantifier.test.ts
---
# Bounded MBQI (model-based quantifier instantiation)

Fallback instantiation engine for quantifiers that E-matching cannot reach. Triggers require function applications containing the bound variables; pure arithmetic quantifiers such as `∀v. v = 1 ⇒ v > 10` have none, so an E-matching-only regime saturates with zero lemmas and the solver wrongly reports SAT. Bounded MBQI closes that gap.

**Algorithm** (`v2/quantifier/mbqi/`): enumerate ground terms by sort from two sources — the EUF arena (terms the congruence closure already knows) and the quantifier bodies themselves (so constants like `1` in `v = 1` are candidates even before any ground assertion mentions them). Generate substitutions as the cartesian product over binder sorts, capped at 10 ground terms per sort. Deduplicate against the instantiation-key set shared with E-matching. Each grounded body is simplified as a tagged `Simplification`: vacuous truth, contradiction witness, or residual formula encoded as a CNF lemma through abstraction lookup.

**Dispatch** (`v2/quantifier/round.ts`): E-matching runs first; when it produces no new lemmas, an MBQI round runs before the solver declares SAT. Any lemmas it produces feed the next solver round through the same v2 monadic state.

MBQI emits `{ tag: "mbqi" }` trace events, so instantiation choices are visible in trace replay alongside E-matching rounds.

**Deviation from full MBQI** ([[ge-de-moura-quantifiers]]): no counterexample-guided refinement — witness terms are not constructed from the arithmetic model; enumeration is restricted to ground terms already present in the problem. This is sound and adequate for Yap's VCs because they are generated from local program structure, so the relevant constants always appear in the formula. Generation and per-sort bounds follow the Z3/cvc5 convention of bounding instantiation to avoid divergence.

`mbqi/round.ts` is a `Core.G` computation that reads the current arena, quantifier state, and encoding through the solver monad, updates quantifier bookkeeping when it emits lemmas, and emits its trace event from inside the computation.

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
