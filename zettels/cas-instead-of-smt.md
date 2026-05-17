---
tags:
  [verification, decision, rejected, inference, elaboration, reference, project, backend, arithmetic, normalization, milestone, tooling, infrastructure, error-handling, type-system, ffi, migration]
---
# CAS instead of SMT

`docs/TODO.md` (modalities / refinements bullet) shows “Implementing CAS instead of SMT?” as struck-through — it was considered, not adopted.

Today the pipeline is SMT-first: `VerificationServiceV2` + `src/verification/V2/logic/translate.ts` + `z3-solver` (`src/verification/V2/service.ts`, `src/verification/V2/types.ts`). `docs/SMT-SOLVER.md` defines a VC IR + in-house CDCL(T) direction, not computer-algebra discharge.

Using a CAS alongside SMT would need a defined split of obligations, sound interfaces to dependent refinements, and fallbacks when no closed form exists — none of that exists as implemented code paths in `src/verification/`.
