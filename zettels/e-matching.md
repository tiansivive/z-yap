---
tags:
  - verification
  - quantifiers
  - mechanism
  - implemented
  - milestone
  - reference
  - solver
  - sat
---
# Trigger-based E-matching

Instantiation heuristic registered with a guarded quantifier `∀x. P[x]`: solver authors attach pattern terms `trigger := t[x]`. Matching traverses the **EUF DAG / congruence partitions** modulo the current equivalence relation, finds ground instances of pattern `t`, and for each substitution `σ` asserts lemma `P(σ(x))` into the SAT engine ([Ge & de Moura](ge-de-moura-quantifiers.md)).

Quality depends entirely on triggers; bad patterns induce either thrash (too many lemmas) or non-termination absent other simplifications.

**Yap:** Implemented under `src/verification/solver/v2/quantifier/ematch/`, with trigger registration in `v2/quantifier/triggers.ts` and orchestration in `v2/quantifier/round.ts`. `matching.ts` exposes monadic matching operations that read the current arena and EUF representatives through `Core.State.get`; `round.ts` owns trigger-based instantiation, quantifier-state updates, CDCL lemma construction, and the `{ tag: "round" }` trace event. See [[solver-v2-monadic-port.implementation]].

<!-- connections:start -->

## Connections

**Incoming**
- [[m2-implementation]] ← IMPLEMENTS — Trigger matching in quantifiers/ematch.ts
- [[solver-testing]] ← DETAILS
- [[mbqi]] ← CONTRASTS_WITH — Semantic ground-term enumeration vs syntactic trigger matching

<!-- connections:end -->
