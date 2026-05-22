---
tags:
  [
    concept,
    elaboration,
    type-system,
    reference,
    inference,
    dependent,
    principle,
    drift,
    problem,
    pattern,
    testing,
    incomplete,
  ]
---
# Typing rules (documentation)

Operational typing rules are encoded in implementation and tests rather than a standalone judgement-calculus file. **Inference** dispatches on `Src.Term` in `src/elaboration/elaborate.ts` into handlers under `src/elaboration/inference/`; **checking** matches on `NF.Value` / `EB.Term` shape in `src/elaboration/check.ts`. Meta lifecycle, unification, implicits, and module statement order follow the same code paths.

Tests under `src/elaboration/**/__tests__` and snapshots encode expected elaboration shapes — treat them as the contract alongside the modules above.
