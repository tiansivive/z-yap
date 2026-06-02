---
adr-id: D-002
tags:
  [
    adr,
    accepted,
    decision,
    lowering,
    rewriting,
    compiler,
    graph,
    ir,
    infrastructure,
    implemented,
    principle,
  ]
---
# GRAM as a property graph

**Decision:** GRAM's compilation IR is an open-vocabulary **property graph** (`src/GRAM/graph.ts`) — tagged nodes, labeled edges, per-node and per-edge provenance — not an S-expression tree or any nested-list encoding.

## Scope

All passes (`translate`, `eta`, `saturate`, `shiftReset`, `pattern`, `closure`) operate on graph values via the immutable ops in `graph.ts`. DPO rewriting (`src/GRAM/grs/`) matches pinned subgraphs by node identity and edge patterns. Sexp pretty-printing exists for debug display only (`display.ts`) and carries no interchange semantics.

## Rationale

1. **Sharing and cycles are first-class** — graph IR represents diamond and cyclic structure directly; nested-list encodings force synthetic IDs or duplicates and push graph bookkeeping into ad hoc metadata.
2. **DPO requires identity** — rule application matches subgraphs by node and edge identity; tree encodings have to materialise identity in side-channels.
3. **Open vocabulary** — tags and labels are extension points (`vocabulary.ts`); new passes contribute tags without changing the substrate. A fixed-arity tree grammar would impose closed positional structure on every node kind.
4. **Additive enrichment** — passes only add nodes and edges; this is a property of the graph operations, not an external invariant to enforce on a tree shape.

## Consequences

- The architectural principles [[gram-additive-enrichment]], [[gram-dataflow-semantics]], and [[compilation-by-selection]] follow from the graph substrate. Each is harder to express, and easier to break, in a tree IR.
- Translation (`translate.ts`) emits graph nodes directly from `EB.Term`; there is no intermediate tree form.
- The display layer is one-way: graphs render to structured text for human inspection; no parser reconstructs graphs from sexps.
- Whole-graph queries (capture-set analysis, ancestor walks, cross-subgraph joins) are deferred to a richer substrate ([[logram]]); the graph IR exposes local traversal primitives only.

See [[gram-as-s-expressions]] for the rejected alternative.
