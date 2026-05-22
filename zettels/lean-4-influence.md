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
