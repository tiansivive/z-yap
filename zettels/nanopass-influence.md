---
tags:
  [
    research,
    reference,
    compiler,
    mir,
    lowering,
    rewriting,
    migration,
    pattern,
    decision,
    infrastructure,
    implemented,
  ]
---
# Nanopass (Influence)

[Nanopass](https://nanopass.org/) — Racket-era framework for **many small passes** over explicitly staged intermediate languages.

**Verified contrast in Yap:** **GRAM** composes small graph passes (`src/GRAM/pipeline/index.ts`: e.g. eta → saturate → closure; each pass is a `Strategy.Pass`). **EB → MIR** lowering is comparatively **monolithic** (`lowerToMir` in `src/lowering/`, invoked as one step from the explorer).

Use Nanopass as vocabulary for why GRAM splits rewrites while MIR lowering stays a single conceptual translation unless/until MIR gains a pass schedule.

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[gram]] — Composable passes
- CONTRASTS_WITH → [[mir-lowering]] — Many vs monolithic

<!-- connections:end -->
