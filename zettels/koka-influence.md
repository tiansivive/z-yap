---
tags:
- research
- reference
- effect
- continuation
- cps
- lowering
- mir
- codegen
- principle
- runtime
- speculative
---
# Koka (Influence)

[Koka](https://koka-lang.github.io/koka/doc/) — algebraic effects/handlers; compilation narratives around **selective CPS** and evidence for control effects.

**Verified in Yap:** No “Koka”, “selective CPS”, or Perceus references in `src/` (search). `z-yap/zettels/selective-cps.md` treats selective CPS as **experimental**: inspired “broadly” by languages including Koka, while MIR design **explicitly rejects global CPS** (`docs/MIR-LOWERING.md` §2.2 — shift/reset lowered to explicit blocks/jumps).

**Contrast:** Current lowering docs favor **direct-style MIR + closure conversion**, not Thorin/Koka-style whole-program CPS.
