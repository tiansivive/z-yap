---
tags:
- elaboration
- modality
- effect
- inference
- research
- paper
- reference
- pattern
- speculative
- type-system
- dependent
---
# Petricek, Orchard & Mycroft — coeffects (ICFP 2014)

**Citation:** Tomas Petricek, Dominic Orchard, Alan Mycroft. *Coeffects: A Calculus of Context-Dependent Computation.* ICFP 2014.  
**DOI:** [10.1145/2628136.2628160](https://doi.org/10.1145/2628136.2628160)

Type system for **coeffects**: annotations describe how a computation depends on context (whole-context and per-variable shapes), with indexed comonad semantics; examples include liveness, dataflow parameters, platform capabilities.

**Yap:** Implicits are first-class in elaboration (`icit` on binders via `@yap/shared/implicitness`; `ctx.implicits` grows via module `using` and block evaluation). Resolution is first-match unification over that ordered list (`solver.ts` / `resolveImplicit`), not a separate coeffect-indexed typing judgment in `checking.v2/`. See [[implicits-as-coeffects.md]] for the deliberate analogy to graded contexts.

**Status:** `speculative` (conceptual bridge, not a claimed mechanization of the paper).
