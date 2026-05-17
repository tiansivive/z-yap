---
tags:
- research
- reference
- rewriting
- pattern
- ast
- mir
- lowering
- tooling
- decision
- implemented
---
# Stratego (Influence)

Stratego — programmable rewriting **strategies** (combinators, controlled rule application). Current docs hub: [Spoofax / Stratego reference](https://spoofax.dev/references/stratego); legacy **Stratego/XT**: [strategoxt.org](https://strategoxt.org/).

**Verified in Yap:** GRAM’s DPO engine exposes composition primitives matching that mindset — `seq`, `choice`, `repeat`, `try_`, `derive` in `src/GRAM/grs/strategy.ts`; passes wire rules via `Strategy.seq` (see `src/GRAM/passes/saturate.ts` exporting a composed pass).

This is **strategy combinators over graphs**, not Stratego syntax or the Spoofax toolchain. Surface `where`-syntax in Yap (`z-yap/zettels/where-clauses.md`) is Haskell-ish sugar, not evidence of Stratego parsing.
