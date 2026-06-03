---
tags:
  - mechanism
  - lowering
  - graph
  - compiler
  - infrastructure
  - pattern
  - implemented
  - modality
  - rewriting
---
# GRAM Kernel pass

A descriptor in the GRAM pipeline that discovers user-defined rules from modal annotations, orders them by structural dependency, and runs them through the existing DPO engine.

## Discovery

The pass queries the host graph for `modal` nodes carrying gram annotations and follows each `:gram_rule` edge to its `EB.Term` payload. The term evaluates via NbE against the elaborated module context, yielding an `NF.Value` whose structure matches the `Rule` schema. Rules are deduplicated by binder identity, so multiple annotation sites referencing the same rule produce one rule run. Transitive closure picks up rule binders referenced from within other rules' lambda bodies.

## Ordering

`requires` and `produces` derive directly from the rule values: `requires` is the set of tags mentioned in LHS patterns, `produces` is the set of tags introduced in RHS constructors. Kahn's algorithm yields a valid sequence or reports a cycle. Static-pipeline output vocabulary forms the initial available set, so user rules whose LHS depends on tags from `closure` or `pattern` sort after those static stages contribute their vocabulary.

## Execution

The engine in `src/GRAM/grs/match.ts` and `src/GRAM/grs/rewrite.ts` accepts a predicate-application strategy. The Kernel pass installs one that calls `NF.apply` on `NF.Value` closures instead of invoking TS callbacks. Payloads cross the boundary through a structural `Payload ⇆ NF.Value` bridge — atoms, records, lists, and primitives map directly; opaque or non-reducing values stay opaque, and the engine treats a stuck predicate as a non-match.

The pass operates additively per [[gram-additive-enrichment]] — RHS constructors only add nodes and edges, never remove existing structure.
