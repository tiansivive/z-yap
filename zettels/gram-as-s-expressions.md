---
tags:
  [
    lowering,
    decision,
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
    migration,
  ]
---

# GRAM as S-expressions

**Design stance:** GRAM stores programs as **graphs** (`src/GRAM/graph.ts`) with tagged nodes, labeled edges, and provenance—not as homogeneous S-expression trees.

**Why trees are a poor fit here:** Sharing and cyclic structure are first-class in graph IR; DPO rewriting (`src/GRAM/grs/`) matches pinned subgraphs by node identity and edge patterns. Encoding the same as nested lists forces synthetic IDs or duplicates and pushes graph bookkeeping into ad hoc metadata.

**Display-only:** Sexps remain reasonable for debug snapshots of isolated subtrees; `display.ts` pretty-prints graphs as structured text without claiming an S-expression interchange format.
