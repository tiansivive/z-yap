---
tags:
- thread
- language
- lowering
- elaboration
- compiler
---
# Pattern Matching

From surface match expressions through elaboration (typing, coverage) to MIR/GRAM
compilation (Maranget decision trees). The main gap: exhaustiveness and redundancy
checking at elaboration time.

## Sequence

1. **Match elaboration** [[match]] — incomplete
   Surface match typing. TODOs: dependent narrowing, variant return typing.
   No exhaustiveness warnings.

2. **Pattern matching compilation** [[pattern-matching-compilation]] — implemented
   Maranget-style clause matrices for MIR and GRAM. Column heuristic. Variant/
   lit/struct/binder/wildcard. List patterns NOT implemented.

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
   Surface match coverage and redundancy. Main elaboration-time gap.
   _Shared with: row-types (variant coverage depends on row structure)_

8. **Functional patterns** [[functional-patterns]] — speculative
   View/active patterns. Would intersect metavar solving, modalities,
   exhaustiveness decidability.
