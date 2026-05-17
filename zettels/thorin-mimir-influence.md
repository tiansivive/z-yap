---
tags:
  [
    research,
    reference,
    lowering,
    mir,
    continuation,
    codegen,
    backend,
    ir,
    cps,
    principle,
    implemented,
  ]
---
# Thorin / MimIR (Influence)

[Thorin](https://github.com/AnyDSL/thorin) — CPS-oriented higher-order IR in the AnyDSL line. [MimIR](https://github.com/AnyDSL/MimIR) · [overview site](https://mimir.github.io/) — successor IR (graph/sea-of-nodes narratives; CPS appears in MimIR docs).

**Verified Yap stance:** `docs/MIR-LOWERING.md` **rejects global CPS** for MIR (§1.2, §2.2): delimited control (`Shift`/`Reset`) becomes explicit blocks/jumps and state-machine lowering, not Thorin-style ubiquitous continuation arguments.

Use Thorin/MimIR as **contrasting precedent**: CPS-first IR ecosystems vs Yap’s **direct-style MIR + closure conversion** path (`src/lowering/`).
