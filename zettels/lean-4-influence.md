---
tags:
- research
- reference
- elaboration
- normalization
- unification
- monad
- metavariable
- compiler
- inference
- tracing
- implemented
---
# Lean 4 (Influence)

[Lean 4](https://lean-lang.org/) — fast theorem-prover implementation; metavariable/zonking idioms and pass-oriented elaboration are widely cited in DT circles.

**Verified in Yap:** **Zonking** is first-class data: `zonker` substitutions thread through `src/elaboration/module.ts`, `src/elaboration/shared/monad.v2.ts` (accumulator channel `"zonker"`), NF pretty-printing, and the explorer’s meta debug pane (`src/cli/explore/pipeline.ts`). That naming and plumbing track **Lean-flavored** elaboration vocabulary even without per-line Lean citations.

NbE-related work lives under `src/elaboration/normalization/` (evaluate / quote); how closely Yap's definitional equality matches Lean's algorithm is an open comparison point for anyone auditing `evaluation.v2.ts` and `unification.ts`.

Related: [[case-tree-elaboration]], [[inductive-types]].

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[nbe]] — NbE architecture
- INSPIRES → [[meta-variables]] — Instantiation strategy
- INSPIRES → [[elaboration-monad]] — Pipeline discipline
- INSPIRES → [[zonking]] — Substitution application
- INFORMS → [[glued-evaluation]] — Lean's elaborator uses dual-rep
- INFORMS → [[nbe-acceleration]] — Lean-style elaborator perf shapes the design space

**Incoming**
- [[case-tree-elaboration]] ← INFORMS — Lean 4's DPM approach
- [[inductive-types]] ← INFORMS — Lean's inductive types
- [[case-tree-elaboration]] ← INFORMS — Lean 4's case trees

<!-- connections:end -->
