---
tags:
  - mechanism
  - lowering
  - graph
  - gram
  - elaboration
  - row-types
  - ir
  - compiler
  - dependent
  - bridge
  - planned
  - needs-design
refs:
  - thread:pipeline-stabilization
---

# GRAM label resolution pass

A `:label` field reference resolves into the nearest enclosing row, the same way a bound variable resolves into its binder. In GRAM this is a dedicated pass that walks each `row:ext` chain carrying a stack of enclosing rows, and for every `var:label` node wires a `:refers_to` edge to the referenced field's value node — mirroring how bound-variable references already gain a `:refers_to` edge during translation.

Once the edge exists, label resolution is edge-following, identical to bound-variable dereferencing. This subsumes name-keyed resolution against a scope map populated while emitting fields: a name map populated in field order resolves backward references but not forward ones, because the asymmetry comes entirely from *when* a name enters the map. Resolving up front as graph edges removes the ordering dependency — forward, backward, and self references resolve uniformly against a complete graph.

The dependency structure between fields becomes explicit graph edges. Cycle detection (a field reaching itself through `:refers_to`) and dependency ordering are then graph traversals rather than separate analyses, and downstream MIR emission consumes a graph where labels are already resolved rather than carrying its own resolution logic.

The scope stack is the value-level counterpart of the sigma label environment: nested rows shadow outer labels, so a reference resolves to the innermost enclosing row that binds the name.

<!-- connections:start -->

## Connections

**Outgoing**
- SUPERSEDES → [[bridge-label-resolution]] — Edge resolution replaces the order-dependent name map
- ADDRESSES → [[bridge-label-closure-gap]] — Resolves self-refs nested under match scope
- ADDRESSES → [[bridge-forward-label-refs]] — Removes forward/backward asymmetry
- MIRRORS → [[label-lookup]] — Graph counterpart of ctx.sigma name resolution
- RELIES_ON → [[gram-to-mir-bridge]] — Keeps bridge label emission mechanical
- USES → [[mutual-recursion]] — Sigma row scope stack for nested rows
- USES → [[gram-struct-node]] — Frame is the struct node's field edges

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES
- [[gram-evolution.thread]] ← INCLUDES

<!-- connections:end -->
