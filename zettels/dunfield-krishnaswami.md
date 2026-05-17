---
tags:
  [
    inference,
    elaboration,
    type-system,
    dependent,
    mechanism,
    pattern,
    research,
    paper,
    reference,
    implemented,
    monad,
    syntax,
  ]
---
# Dunfield & Krishnaswami — bidirectional checking for higher-rank polymorphism

[Complete and Easy Bidirectional Typechecking for Higher-Rank Polymorphism](https://doi.org/10.1145/2500365.2500582). Jana Dunfield, Neelakantan R. Krishnaswami. ICFP 2013.

Declarative presentation plus a deterministic algorithm pairing **checking** (known type flows inward) with **type synthesis** (type flows outward), linked by subsumption—compact compared with full Damas–Milner inference for higher-rank polymorphism.

Yap follows the same structural split at elaboration: top-level synthesis dispatch is `src/elaboration/elaborate.ts` (`infer`), while checking drives introductions against supplied types in `src/elaboration/check.ts` (`check`). Implicit Π insertion during checking mirrors mode-switch ideas from the paper (see implicit branches early in `check.ts`). Equality remains delegated to NbE-valued unification (`src/elaboration/unification/unification.ts`), analogous to deferring residual constraints rather than folding everything into inference.
