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

Lowering compiles surface **reset**/**shift** without whole-program CPS: `src/lowering/continuations/reset.ts`, `src/lowering/continuations/shift.ts`, multishot via `src/lowering/continuations/kcall.ts` (indexed `Jump` into a shared resume block, `Branch` dispatch), with tests under `src/lowering/__tests__/`. Elaboration-side typing/inference hooks live under `src/elaboration/inference/reset.ts` and `src/elaboration/inference/shift.ts`.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[shift-reset]] — Foundational theory
- INFORMS → [[answer-type-polymorphism]] — Answer type modification

**Incoming**
- [[arm-paper]] ← EXTENDS — Refinement dimension of ATM

<!-- connections:end -->
