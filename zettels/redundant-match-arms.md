---
tags:
  - pattern
  - type-system
  - elaboration
  - inference
  - checking
  - row-types
  - structural
  - diagnostics
  - semantics
  - principle
  - concern
  - language
  - needs-design
  - incomplete
refs:
  - thread:pattern-matching
---
# Redundant match arms

A `match` arm that a preceding arm has already made unreachable is redundant. The common case is an **irrefutable** earlier arm — one whose patterns are all binders, wildcards, or complete record destructures, with no refutable column (no literal and no variant tag). Such an arm matches every value the scrutinee type admits, so every arm after it is dead.

Records are products: fixed rows, no width subtyping. Nothing at runtime distinguishes a `{ foo, bar }` value from a `{ z }` value, so several record arms on one scrutinee have no shape to select between. Refutable dispatch needs a column that asks a runtime question — a variant tag or a finite literal — and a bare record destructure asks none. The first such arm answers unconditionally, and the later arms only repeat coverage it already gives.

The scrutinee's type is the intersection of every arm's field requirements. In `match x | { foo: { y }, bar: f } -> f y | { z: { w } } -> w`, `x` must carry `foo`, `bar`, and `z`, even though the second arm never runs. The type faithfully records the fields the program is written to read. Pruning `z` because its arm is unreachable would make a signature depend on a liveness analysis, so adding or deleting a dead arm would silently shift callers' types.

That faithfulness buys stability across edits. Making an earlier arm refutable — turning a field binder into a literal — promotes a shadowed arm to live while the scrutinee type stays fixed, so a change in reachability carries no blast radius through callers. Inference tracks the written patterns; reachability stays a separate layer.

Redundancy is a diagnostic concern. A report on a shadowed arm lets the author drop it — narrowing the scrutinee type — or keep it deliberately. The information is already latent in the compiled form: a Maranget decision tree never routes a leaf to an unreachable clause, which is why a shadowed arm falls away during lowering. Surfacing it reports a fact the compilation already establishes.
