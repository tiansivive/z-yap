---
tags:
  - verification
  - infrastructure
  - principle
  - backend
  - sat
  - validity
  - liquid
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

The verification backend is the subsystem that determines whether obligations emitted by Yap's refinement checking pipeline are valid. It sits below VC emission (`check`/`synth`/`subtype` in `translate.ts`) and above result reporting.

## Architecture

The backend is designed around layered boundaries: VC emission targets a solver-neutral IR (IVL), validity discharge interprets generated VCs as obligations, and raw satisfiability engines consume counterexample queries without requiring changes to how obligations are generated. This separation exists so the solving strategy can evolve without rewriting the bidirectional checking and subtype pipelines that produce obligations.

The current raw solver is a custom CDCL(T) engine with theory plugins for EUF, linear arithmetic, and guarded quantifiers.

## Key design decisions

- **IVL as the boundary IR** — obligations are `IVL.Formula`, not solver-native expressions. See [[ivl-boundary]].
- **Bidirectional VC generation** — `check`, `synth`, and `subtype` each produce VCs from their respective judgment forms, grounded in Jhala/Vazou-style liquid type checking. See [[bidir-subtype-verification]].
- **Validity before SAT** — generated VCs are discharged as counterexample queries before raw solver results become verifier verdicts. See [[vc-validity-before-sat.adr]].
- **Owned solver for theory control** — the replacement decision was driven by row theory needs and distribution friction. See [[z3-replacement.adr]].

## Remaining work

- String and row theory plugins ([[milestone-3-strings]], [[milestone-4-rows]])
- Complete validity-wrapper audit across CLI, explorer, and module verification verdict paths ([[vc-validity-discharge]])
- UNSAT core and explanation infrastructure ([[milestone-5-explanations]], [[vc-provenance]])
- Narrow `VerificationBackend` API formalization so the pluggable boundary is a typed contract, not just an architectural convention

<!-- connections:start -->

## Connections

**Outgoing**
- SPECIALIZES → [[verification-pipeline]] — Backend subsystem of the pipeline
- WRAPS → [[cdcl-t-solver]] — Simple API
- ENABLES → [[vc-provenance]] — Unsat-core reporting

**Incoming**
- [[verification-pipeline]] ← DELEGATES_TO — Satisfiability checking
- [[cdcl-t-solver]] ← PRODUCES — SolveResult (sat/unsat/unknown)
- [[verification-backend.thread]] ← RELIES_ON — Hub zettel
- [[ivl-boundary]] ← ENABLES — Pluggable boundary for backend swap
- [[bidir-subtype-verification]] ← IMPLEMENTS — VC generation strategy
- [[z3-adapter-strategy]] ← IMPLEMENTS — One backend consumer
- [[vc-validity-before-sat.adr]] ← CLARIFIES — Backend validates obligations, raw solver checks satisfiability

<!-- connections:end -->
