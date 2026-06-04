---
tags:
- concept
- elaboration
- metavariable
- inference
- unification
- implemented
- normalization
- type-system
- ast
- compiler
- substitution
- dependent
---
# Meta-variables

The internal unknowns of Yap's elaboration. A meta-variable represents a value or type that is not yet determined — it will be solved by unification, constraint solving, or left unsolved (producing an error or a polymorphic binding).

Representation: each meta carries a numeric ID (monotonically allocated via a supply) and a de Bruijn level recording the scope in which it was created. The level is critical for generalization — only metas created at or above the current scope boundary are eligible for generalization into implicit Pis.

Meta-variables appear in both EB.Term (as `Var` with `Meta` kind) and NF.Value (as `Var` with `Meta` kind, often wrapped in `Neutral`). In normal form, an unsolved meta is a neutral term — computation is stuck waiting for a solution.

Solutions live in the zonker (`ctx.zonker`), a substitution map from meta IDs to NF.Values. When a meta is solved (via unification's `bind`), the solution is recorded in the zonker. Subsequent evaluation and quoting chase the zonker to resolve metas, and traversals like `collectMetasNF` skip already-zonked metas.

Metas arise from multiple sources: hole elaboration (user-written `_`), implicit argument insertion (implicit Pi parameters), type inference (unknown function domains), and constraint generation. The elaboration monad threads the meta store and supply through the computation.

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[unification]] — Metas are solved by unification
- PRODUCES → [[neutrals]] — Unsolved metas produce neutral terms
- THREADS_THROUGH → [[elaboration-monad]] — MutState.supply, ctx.metas

**Incoming**
- [[unification]] ← SOLVES — Unification resolves metas to concrete types
- [[generalization]] ← USES — Generalizes unsolved metas into implicit Pis
- [[implicits]] ← USES — Inserts metas at call sites for implicit params
- [[elaboration-monad]] ← USES — Monad state component manages the meta store
- [[holes]] ← INSTANTIATES — Fresh meta per hole
- [[continuation-binders]] ← USES — Skolem-like metas
- [[zonking]] ← RELIES_ON — Applies subst to metas
- [[zonking]] ← ZONKS — Resolves unknowns
- [[nondeterminism]] ← INSTANTIATES — Solution combinations
- [[idris-2-influence]] ← INSPIRES — Contextual metas
- [[agda-influence]] ← INSPIRES — Pattern unification
- [[lean-4-influence]] ← INSPIRES — Instantiation strategy
- [[mcbride-nuttin]] ← INFORMS — Contextual metavariables
- [[flex-flex-unification]] ← RESOLVES — Binds left to right
- [[flex-rigid-unification]] ← RESOLVES — Binds to rigid
- [[row-unification-mechanism]] ← INSTANTIATES — Fresh row metas
- [[substitution-system]] ← ZONKS — Maps IDs to solutions
- [[sigma-bindings]] ← INSTANTIATES — Fresh metas per field
- [[nondeterminism-multishot]] ← INSTANTIATES — Solution combinations
- [[variable-evaluation-dispatch]] ← RESOLVES — Skolems → zonker → neutral
- [[src-to-eb-transformation]] ← INSTANTIATES — Holes, implicit args
- [[hindley-milner]] ← INFORMS — Unification-based inference
- [[row-polymorphism]] ← INSTANTIATES — Fresh row variables (open tails)
- [[implicit-resolution]] ← INSTANTIATES — Insertion creates fresh unknowns
- [[elaboration-monad]] ← THREADS_THROUGH — MutState manages meta store
- [[continuation-binders]] ← ENCODES — Resumption as meta in MutState.skolems
- [[string-theory]] ← INSTANTIATES — Fresh witnesses for decomposition
- [[explorer-cross-highlighting]] ← USES — Meta IDs as cross-tab join keys
- [[module-zonker-fix]] ← ADDRESSES — Prevents leaked meta re-generalization
- [[holes]] ← INSTANTIATES — Each hole allocates fresh metas
- [[holes]] ← CONTRASTS_WITH — User-facing vs internal machinery
- [[blocks]] ← RELIES_ON — Generalization operates on unsolved metas
- [[quoting]] ← RELIES_ON — Chases zonker for solved metas
- [[variable-evaluation-dispatch]] ← RELIES_ON — Meta resolution: skolem/zonker/neutral

<!-- connections:end -->
