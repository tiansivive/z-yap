---
tags:
- elaboration
- inference
- modality
- effect
- dependent
- type-system
- principle
- rewriting
- compiler
- pattern
- migration
- tracing
- monad
- reference
- infrastructure
- tooling
status: speculative
---
# Implicits as coeffects (design sketch)

Observable behavior today: each `resolve` constraint snapshots `implicits: EB.Context["implicits"]` at emission (`implicits.ts`), and `solver.ts` resolves against that ordered list with empty-subst-only acceptance.

Coeffects reading (graded contexts carrying “what must be available”) is **not** implemented as a distinct checker phase — modality usage elsewhere (`Q.Multiplicity`, verification modalities) is separate from implicit plumbing.

Possible convergence: treat snapshots as lexical capability traces and relate them to modality inference once elaboration/checking splits stabilize (see repo migration notes under `brainstorming/` if present).

Hub: [[implicits.md]], [[implicit-environment.md]].
