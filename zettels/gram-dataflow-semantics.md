---
tags:
- concept
- graph
- ir
- compiler
- principle
- performance
- backend
---

# Dataflow semantics (GRAM)

GRAM's graph expresses a partial order of data dependencies, not a total execution order. Edges mean "this node's value is needed to compute that node" — nothing more.

Two `resumption` nodes feeding a `primop` have no ordering edge between them. Two struct field projections from the same scrutinee are independent. The graph encodes *what depends on what*, not *what runs when*.

**Consequence for backends:**
- A sequential backend (JS, C) reads the graph and chooses a topological sort — imposing the total order it needs.
- A parallel backend (HVM, GPU) reads the same graph and forks independent subgraphs.
- A lazy backend reads the graph and only evaluates on demand.

The sequencing choice belongs to the backend, not the IR. This is the key difference from MIR's block-graph, where `Jump` terminators impose a fixed control-flow order that all backends must respect.

**Explicit sequencing when needed:** If a true ordering constraint exists (side effects, shared mutable state), it can be expressed via an explicit `:sequenced` or `:happens_before` edge. Absence of such an edge means independence.
