---
tags:
- lowering
- mechanism
- implemented
- mir
- compiler
- ir
- elaboration
- row-types
- codegen
- backend
- dependent
- testing
- graph
---

# Pattern matching compilation (hub)

Maranget-style clause matrix compilation -- decision tree construction from pattern matrices. Implemented in two contexts: MIR (block emission) and GRAM (graph enrichment).

**MIR:** `src/lowering/matching/` -- entry `lower` / `compileSubMatrix` in `index.ts`; columns split into variant (`variant.ts`), literal (`literal.ts`), struct (`struct.ts`), binder/wildcard handling (`shared.ts`). Fail block label `e` with non-exhaustive string literal; merge blocks use parameter-carrying jumps (`j` labels). Tag and value dispatch emit `Branch` terminators (`src/lowering/matching/`).

**GRAM:** Two phases -- (1) `gram-pattern-translation` (translate.ts emits `pat:*` graph nodes from `EB.Pattern`) and (2) `gram-pattern-pass` (Maranget decision tree as `switch`/`leaf`/`fail` graph nodes, linked via `:decision_tree` edge). The original match structure is preserved alongside the operational tree.

**Coverage:** Variant, lit, struct, binder, wildcard. List patterns are a natural extension of the same column-matrix pipeline and remain to be wired through lowering.

**Algorithm:** Column heuristic (fewest wildcards), matrix specialization per head constructor, default matrix for wildcards/binders. Same conceptual algorithm in both MIR and GRAM -- different output representations.

<!-- connections:start -->

## Connections

**Outgoing**
- LOWERS_TO → [[mir-lowering]] — Decision trees → MIR
- DISPATCHES_ON → [[match]] — Pattern shape
- ERASES → [[match]] — Patterns removed after compilation
- USES → [[maranget-paper]] — Decision-tree algorithm
- TRANSLATES_TO → [[mir-lowering]] — Maranget decision trees
- INCLUDES → [[gram-pattern-translation]] — Representation phase
- INCLUDES → [[gram-pattern-pass]] — Compilation phase

**Incoming**
- [[match]] ← LOWERS_TO — Decision trees
- [[maranget-paper]] ← INFORMS — Decision-tree construction
- [[augustsson-paper]] ← INFORMS — Original algorithm (1985)
- [[pettersson-paper]] ← INFORMS — DAG variant (1992)
- [[pattern-algorithm-choice]] ← CONSTRAINS — Algorithm for MIR too
- [[pattern-matching.thread]] ← INCLUDES
- [[case-tree-elaboration]] ← EXTENDS — Semantic decision trees for types
- [[case-tree-elaboration]] ← CONTRASTS_WITH — Type checking vs code generation
- [[view-patterns]] ← DESUGARS_TO — Desugars before clause matrix
- [[pattern-synonyms]] ← DESUGARS_TO — Desugars to structural patterns
- [[exhaustiveness-checking]] ← RELIES_ON — Coverage from decision tree
- [[match]] ← LOWERS_TO — Maranget clause-matrix at MIR level

<!-- connections:end -->
