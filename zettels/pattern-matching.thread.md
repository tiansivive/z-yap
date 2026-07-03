---
tags:
- thread
- language
- lowering
- elaboration
- compiler
- pattern
- mir
- graph
---
# Pattern Matching

From surface match expressions through elaboration (typing, coverage) to MIR/GRAM
compilation (Maranget decision trees). Elaboration-time exhaustiveness and redundancy
checking is the next frontier alongside the implemented lowering passes.

## Sequence

1. **Match elaboration** [[match]] — incomplete
   Surface match typing. TODOs: dependent narrowing, variant return typing.
   Exhaustiveness diagnostics still to be designed for `match.ts`.

2. **Pattern matching compilation** [[pattern-matching-compilation]] — implemented
   Maranget-style clause matrices for MIR and GRAM. Column heuristic. Variant/
   lit/struct/binder/wildcard. List patterns: extension of the same pipeline.

3. **GRAM pattern translation** [[gram-pattern-translation]] — implemented
   pat:* node translation into graph IR.

4. **GRAM pattern pass** [[gram-pattern-pass]] — implemented
   Maranget decision tree pass on graph IR.

5. **Algorithm choice** [[pattern-algorithm-choice]] — decision
   Maranget chosen over Augustsson/Pettersson. Pettersson DAG sharing as
   possible future optimization.

6. **Maranget paper** [[maranget-paper]] — reference
   Column heuristic, clause matrix decomposition.

7. **Exhaustiveness checking** [[exhaustiveness-checking]] — needs-design
   Surface match coverage and redundancy. Elaboration-time complement to MIR fail blocks.
   _Shared with: row-types (variant coverage depends on row structure)_

8. **Functional patterns** [[functional-patterns]] — speculative
   View/active patterns. Would intersect metavar solving, modalities,
   exhaustiveness decidability.

9. **Typed dispatch equality** [[typed-dispatch-equality]] — deferred
   Dispatch comparison should eventually be elaboration-resolved equality evidence, not backend stringification.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[match]]
- INCLUDES → [[pattern-matching-compilation]]
- INCLUDES → [[gram-pattern-translation]]
- INCLUDES → [[gram-pattern-pass]]
- RELIES_ON → [[pattern-algorithm-choice]] — Settled Maranget decision
- INCLUDES → [[maranget-paper]]
- INCLUDES → [[exhaustiveness-checking]]
- INCLUDES → [[functional-patterns]]
- SHARED_WITH → [[row-types.thread]] — exhaustiveness-checking depends on row/variant structure
- INCLUDES → [[dependent-pattern-matching]]
- INCLUDES → [[with-abstraction]]
- INCLUDES → [[case-tree-elaboration]]
- INCLUDES → [[view-patterns]]
- INCLUDES → [[pattern-synonyms]]
- INCLUDES → [[active-patterns]]
- RELIES_ON → [[open-closed-variants]] — Concept: variant openness
- INCLUDES → [[design-open-closed-variant-semantics]] — Design work item
- INCLUDES → [[narrowing-vs-residuation]]
- INCLUDES → [[two-tier-pattern-compilation]]
- INCLUDES → [[pull-tab]]
- INCLUDES → [[tagged-dispatch]]

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[gram-evolution.thread]] ← SHARED_WITH — gram-pattern-pass, gram-pattern-translation
- [[explorer-audit.thread]] ← SHARED_WITH — Struct dispatch, row binders
- [[dependent-match-implication-constraints]] ← INFORMS — Branch-local assumptions for dependent matches

<!-- connections:end -->
