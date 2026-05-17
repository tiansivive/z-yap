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

**Yap:** Implicits are first-class in elaboration (`icit` on binders in pretty-printing via `@yap/shared/implicitness`; contexts accumulate entries in `src/elaboration/module.ts`). That is **informally** context-indexed checking, not a proof that Yap implements Petricek–Orchard–Mycroft’s calculus. See local zettel `implicits-as-coeffects.md` for deliberate analogy; no separate coeffect-indexed judgment appears in `src/elaboration/checking.v2/` as a standalone formalism.

**Status:** `speculative` (conceptual bridge, not a claimed mechanization of the paper).
