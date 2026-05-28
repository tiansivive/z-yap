---
tags:
  - verification
  - infrastructure
  - principle
  - backend
  - sat
  - ivl
  - decision
  - compiler
  - milestone
  - dependent
  - row-types
  - hub
---
# Verification backend

Hub: [[verification-backend.thread]]

The verification backend is the subsystem that determines whether obligations emitted by Yap's refinement checking pipeline are satisfiable. It sits below VC emission (`check`/`synth`/`subtype` in `translate.ts`) and above result reporting.

## Architecture

The backend is designed around a **pluggable boundary**: VC emission targets a solver-neutral IR (IVL), and satisfiability engines consume that IR without requiring changes to how obligations are generated. This separation exists so the solving strategy can evolve — or be replaced entirely — without rewriting the bidirectional checking and subtype pipelines that produce obligations.

The current backend is a custom CDCL(T) engine with theory plugins for EUF, linear arithmetic, and guarded quantifiers. A Z3 adapter translates IVL to Z3 expressions for oracle runs and regression cross-checks.

## Key design decisions

- **IVL as the boundary IR** — obligations are `IVL.Formula`, not solver-native expressions. See [[ivl-boundary]].
- **Bidirectional VC generation** — `check`, `synth`, and `subtype` each produce VCs from their respective judgment forms, grounded in Jhala/Vazou-style liquid type checking. See [[bidir-subtype-verification]].
- **Z3 as oracle, not primary** — the adapter preserves backward compatibility and enables differential testing. See [[z3-adapter-strategy]].
- **Owned solver for theory control** — the replacement decision was driven by row theory needs and distribution friction. See [[z3-replacement-decision]].

## Remaining work

- String and row theory plugins ([[milestone-3-strings]], [[milestone-4-rows]])
- UNSAT core and explanation infrastructure ([[milestone-5-explanations]], [[vc-provenance]])
- Narrow `VerificationBackend` API formalization so the pluggable boundary is a typed contract, not just an architectural convention
