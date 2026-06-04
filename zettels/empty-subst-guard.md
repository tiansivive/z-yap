---
tags:
  - decision
  - elaboration
  - inference
  - unification
  - mechanism
  - principle
  - implemented
  - compiler
---
# Empty substitution guard

**Decision:** When resolving an implicit, the solver accepts a candidate only if unification produces an **empty** substitution. If unification succeeds but grounds metavariables beyond the one being resolved, that candidate is rejected and the search continues.

## Semantic meaning

Resolution is **selection** of existing evidence, not **computation** of new type facts. The implicit environment is a pool of available evidence; picking a candidate should identify which piece of evidence satisfies the obligation, nothing more. A candidate that unifies successfully but produces a non-empty substitution was "too powerful" — it answered the question but also changed the state of unrelated metas as a side effect.

## What it prevents

Without the guard, resolving one implicit could accidentally ground metavariables intended for other constraints. This creates coupling between independent obligations: the order in which implicits are resolved would affect which metas get grounded first, making elaboration results sensitive to solver scheduling rather than program structure.

## Provenance

This invariant follows the Idris 2 and Lean approach to implicit resolution. Both systems restrict resolution to avoid premature commitment — a candidate must fit the obligation exactly as stated, without requiring the solver to learn new facts to make it fit.

## Interaction with ordering

The [[assign-before-resolve]] ordering ensures resolution sees fully zonked types, so the empty-subst guard rarely triggers on "almost right" candidates — by the time resolution runs, types are specific enough that the right candidate matches cleanly.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[constraint-solver]] — Resolution acceptance rule
- CONSTRAINS → [[implicit-resolution-solver]] — Selection-not-computation semantics

**Incoming**
- [[assign-before-resolve]] ← COMPOSES_WITH — Complementary invariants
- [[idris-2-influence]] ← INSPIRES — Empty-subst invariant
- [[elaboration-v2.thread]] ← RELIES_ON

<!-- connections:end -->
