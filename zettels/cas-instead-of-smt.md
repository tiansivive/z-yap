---
tags:
  [verification, decision, rejected, inference, elaboration, reference, project, backend, arithmetic, normalization, milestone, tooling, infrastructure, error-handling, type-system, ffi, migration]
---
# CAS instead of SMT

Computer-algebra discharge (CAS instead of SMT) was considered early on and rejected in favor of SMT.

The pipeline is SMT-first: `VerificationServiceV2` + `src/verification/V2/logic/translate.ts` + `z3-solver` on main (`src/verification/V2/service.ts`, `src/verification/V2/types.ts`); the ivl branch adds IVL + in-house CDCL(T) (`src/verification/solver/`).

A CAS sidecar would need a defined obligation split, sound interfaces to dependent refinements, and fallbacks when no closed form exists — out of scope for current `src/verification/` paths.
