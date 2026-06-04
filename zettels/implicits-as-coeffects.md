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

Coeffects reading (graded contexts carrying “what must be available”) is exploratory: implicit resolution reuses the ordered `implicits` snapshot and first-match unify loop, while modality usage (`Q.Multiplicity`, verification modalities) follows separate elaboration paths.

Possible convergence: treat snapshots as lexical capability traces and relate them to modality inference as checking v2 stabilizes.

Hub: [[implicits.md]], [[implicit-environment.md]], [[implicits-as-coeffects-exploration]].

<!-- connections:start -->

## Connections

**Outgoing**
- REVISES → [[implicit-resolution]] — Coeffect-based approach

**Incoming**
- [[petricek-orchard]] ← INSPIRES — Context-dependence calculus
- [[implicits-as-coeffects-exploration]] ← EXTENDS — Deeper exploration of the design sketch

<!-- connections:end -->
