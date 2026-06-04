---
tags:
  [
    planned,
    elaboration,
    ast,
    normalization,
    inference,
    lowering,
    mir,
    pattern,
    mechanism,
    compiler,
    unification,
    display,
    migration,
    type-system,
    backlog,
  ]
---

# Spineful applications

**`EB.Term` applications today are binary**: `{ type: "App"; icit; func; arg }` with nested left-associated apps (`src/elaboration/syntax/term.ts`). Constructor helpers (`EB.Constructors.App`, `.Struct`, `.Variant`, …) all build that shape.

**Spine form** would store an explicit **head** plus **argument spine** (vector), avoiding left-chain recovery for arity, pretty-printing, and unification head dispatch. Bidirectional inference and NbE literature often describe **spines** explicitly.

Migration cost: pervasive **`App`** consumers — inference (`EB.Application`), normalization and unification, lowering (`src/lowering/`), snapshots, **`NF`** neutrals — plus any external tooling assuming binary trees.

Often discussed alongside **dedicated internal row constructors**; overlapping blast radius, not a strict prerequisite ordering.

<!-- connections:start -->

## Connections

**Outgoing**
- REVISES → [[application]] — Head + spine
- ADDRESSES → [[application]] — Nested App complexity

**Incoming**
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->
