---
tags:
  [
    continuation,
    lowering,
    mir,
    compiler,
    mechanism,
    principle,
    research,
    paper,
    reference,
    implemented,
    codegen,
    runtime,
  ]
---
# Danvy & Filinski — shift and reset

[Abstracting Control](https://doi.org/10.1145/91556.91622). Olivier Danvy, Andrzej Filinski. LFP 1990 (ACM).

Defines **shift** and **reset** as delimited-control operators carved out of continuation-passing discipline: typed hierarchies of continuations index how much evaluation context an abstraction may capture (“answer types”).

Lowering compiles surface **reset**/**shift** without whole-program CPS: `src/lowering/continuations/reset.ts`, `src/lowering/continuations/shift.ts`, block graphs and tests under `src/lowering/__tests__/`. Multishot resume wiring is documented in `docs/MIR-LOWERING.md` §7 and `src/lowering/continuations/multishot.mir.md`. Elaboration-side typing/inference hooks live under `src/elaboration/inference/reset.ts` and `src/elaboration/inference/shift.ts`.
