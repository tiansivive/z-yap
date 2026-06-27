---
tags:
- lowering
- mir
- pattern
- mechanism
- compiler
- research
- paper
- reference
- implemented
- ast
- codegen
---
# Maranget — compiling pattern matching to decision trees (2008)

**Citation:** Luc Maranget. *Compiling pattern matching to good decision trees.* Proceedings of the ACM Workshop on ML, 2008.  
**DOI:** [10.1145/1411304.1411311](https://doi.org/10.1145/1411304.1411311)

Clause matrices, DAG sharing, and “necessity”-motivated heuristics to keep decision trees small and fast for strict languages.

**Yap:** `src/lowering/lower.ts` documents `match.ts` as **Maranget clause-matrix compilation**; implementation lives under `src/lowering/matching/` (`compileSubMatrix`, filters for variant/literal/struct branches, exhaustiveness failure block in `matching/index.ts`). Not a line-by-line port of the OCaml compiler, but the same compilation problem and matrix discipline.

**Status:** `implemented` (lowering pipeline uses this approach by design).

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[pattern-matching-compilation]] — Decision-tree construction
- SUPERSEDES → [[augustsson-paper]] — Better column selection, no body duplication

**Incoming**
- [[pattern-matching-compilation]] ← USES — Decision-tree algorithm
- [[gram-pattern-pass]] ← USES — Decision tree algorithm
- [[pettersson-paper]] ← EXTENDS — DAG sharing over trees (deferred)
- [[pattern-algorithm-choice]] ← USES — Chosen algorithm
- [[pattern-matching.thread]] ← INCLUDES
- [[two-tier-pattern-compilation]] ← USES — decision tree algorithm for the constructor tier
- [[sprite]] ← REFERENCES — definitional trees vs Maranget decision trees

<!-- connections:end -->
