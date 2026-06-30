---
tags:
  - mechanism
  - decision
  - lowering
  - graph
  - gram
  - ir
  - row-types
  - representation
  - compiler
  - dependent
  - in-progress
refs:
  - thread:pipeline-stabilization
---

# GRAM struct node

In GRAM a record value is a single `struct` node with one `:field{label}` edge per field — the value-level twin of the `pat:struct` pattern node. An open row carries a `:tail` edge to a row variable; a closed row carries none.

This replaces the cons-list encoding inherited from core, where a record value is a chain of `row:ext` nodes linked by `:rest` and terminated by `row:empty`. The chain is the right shape for row-polymorphic *types* — open tails, scoped-label unification — but those concerns are discharged before GRAM, where the type layer is gone. For a value the chain imposes a spine with no semantic basis: no node *is* the record, label lookup walks the chain, and the chain's order manufactures a forward/backward asymmetry that unordered rows do not have.

A flat node removes all three. The record is one node, so a reference to it — capture, knot-tying — and a reverse lookup from a field both reach it in one hop. Label lookup is a single labeled edge. Fields are simultaneous and unordered, so resolving a reference has no order to get wrong.

The node is value-level only. Record types (schemas) and the other row-based families keep the cons-list; the `struct` node is emitted for the `Struct`-atom value form alone. Tuples share that form upstream and are not distinguished here.

<!-- connections:start -->

## Connections

**Outgoing**
- CONTRASTS_WITH → [[rows-universal-substrate]] — Flat value node vs row cons-list
- MIRRORS → [[gram-pattern-translation]] — Value-side twin of pat:struct :field edges
- ADDRESSES → [[bridge-forward-label-refs]] — Flat node removes the resolution ordering asymmetry
- ADDRESSES → [[bridge-label-closure-gap]] — One record node to capture and project from
- RELIES_ON → [[gram-to-mir-bridge]] — Bridge emits Alloc Record from it

**Incoming**
- [[gram-label-resolution-pass]] ← USES — Frame is the struct node's field edges
- [[recursive-struct-binding]] ← RELIES_ON — The knot object is the struct node's Alloc
- [[pipeline-stabilization.thread]] ← INCLUDES
- [[gram-evolution.thread]] ← INCLUDES

<!-- connections:end -->
