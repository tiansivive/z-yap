---
tags:
  [
    lowering,
    rejected,
    graph,
    ir,
    ast,
    syntax,
    rewriting,
    compiler,
    infrastructure,
    reference,
    display,
  ]
---

# GRAM as S-expressions (rejected alternative)

**Rejected by [[gram-graph-ir.adr]].** This zettel preserves the description of the alternative encoding considered for the GRAM compilation IR.

S-expression storage would encode the IR as homogeneous nested lists with positional structure, akin to Lisp-family ASTs. Compilation passes would walk and rewrite trees; node identity would be carried via synthetic IDs or path coordinates.

**Why trees are a poor fit for GRAM:** Sharing and cyclic structure are first-class in the GRAM workload. DPO rewriting matches pinned subgraphs by node identity and edge patterns; tree encoding forces synthetic IDs or duplicates and pushes graph bookkeeping into ad hoc metadata. Open-vocabulary tagging — new passes contribute new tag/label kinds — sits awkwardly on top of fixed-arity tree grammars.

**Where sexps remain useful:** as a display format only. `display.ts` pretty-prints graphs as structured text for human inspection without claiming an S-expression interchange format.

<!-- connections:start -->

## Connections

**Incoming**
- [[gram-graph-ir.adr]] ← REJECTS — Tree encoding loses identity, sharing, cycles

<!-- connections:end -->
