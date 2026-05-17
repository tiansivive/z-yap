---
tags:
- research
- reference
- row-types
- type-system
- elaboration
- inference
- pattern
- language
- implemented
- syntax
---
# Elm / OCaml (Influence)

[Elm](https://elm-lang.org/) — pure FP for UI; sums and records as idiomatic structural data. [OCaml](https://ocaml.org/) — rows, polymorphic variants, and structural sums in the type system ([labels / polymorphic variants](https://ocaml.org/docs/labels-and-polymorphic-types)).

**Verified in Yap:** Row-shaped surface syntax and inference route through shared row algebra (`src/shared/rows`) and elaboration (`src/elaboration/inference/rows.ts`, variant/record modules under `src/elaboration/`). That is **direct structural typing**, analogous to OCaml/Elm ergonomics, implemented on Yap’s own core—not a port of either compiler.
