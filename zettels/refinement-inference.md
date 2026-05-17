---
tags:
- verification
- inference
- elaboration
- modality
- speculative
- normalization
- constraint
- compiler
- testing
- tooling
- pattern
- dependent
---
# Refinement inference

No separate refinement metavariable or hole pipeline exists: refinements are concrete `EB.Term` liquids checked during modal inference (`src/elaboration/inference/modal.ts`) and normalized predicates in verification (`src/verification/V2/`).

`stripModalities` on inferred types (`src/elaboration/elaborate.ts`) removes `NF.Modal` wrappers from synthesized types; the adjacent TODO explicitly mentions needing refinement templates/holes when implementing refinement inference.

Verification artefacts carry only `{ vc; nf? }` (`src/verification/V2/types.ts`), not deferred refinement placeholders.

Anything labeled “refinement inference” here would be new work atop elaboration + VC generation, not present behavior.
