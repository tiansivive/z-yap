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

**Yap:** Implemented in `src/verification/solver/quantifiers/ematch.ts` with trigger registration in `triggers.ts` and orchestration in `quantifiers/solver.ts`, wired into the CDCL(T) loop via the shared EUF arena ([congruence closure](congruence-closure.md)). See [[m2-implementation]].
