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

Refinements today are concrete `EB.Term` liquids checked during modal inference (`src/elaboration/inference/modal.ts`) and normalized predicates in verification (`src/verification/V2/`). There is no refinement metavariable or hole pipeline yet.

`stripModalities` on inferred types (`src/elaboration/elaborate.ts`) removes `NF.Modal` wrappers from synthesized types; a future refinement-inference design would need templates/holes at that boundary.

`VerificationArtefacts` carry `{ vc; nf? }` (`src/verification/V2/types.ts`) — VC obligations, not deferred refinement placeholders.

“Refinement inference” as metavariable synthesis would extend elaboration + VC generation beyond current behavior.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[refinement-types]] — Inferred refinements
- REVISES → [[modalities]] — Strip → template revision

**Incoming**
- [[verification-backend.thread]] ← INCLUDES

<!-- connections:end -->
