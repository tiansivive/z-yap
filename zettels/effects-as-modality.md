---
tags:
  - modality
  - effect
  - continuation
  - type-system
  - speculative
  - pattern
  - principle
  - research
---
# Effects as modality

Effect tracking — which side effects a computation may perform — could be a third modality dimension alongside quantity and liquid in Yap's `Modal` wrapper ([[modality-system]]).

## The idea

Currently, `shift`/`reset` are tracked structurally (as `EB.Term` variants with MIR lowering) but not as modal annotations. Algebraic effect or capability annotations could live in `Modal.Annotations` alongside the existing quantity and liquid dimensions, making effect information visible to the same verification pass that handles usage and refinement checking.

## Theoretical grounding

Petricek and Orchard's coeffect framework ([[petricek-orchard]]) provides a model for tracking what a computation needs from its context. Koka's evidence-passing approach ([[koka-influence]]) offers an alternative where effects are tracked as type-level rows rather than modal annotations. The choice between these models — modal dimensions vs. row-typed effects — is open.

## Relationship to existing mechanisms

The `shift`/`reset` lowering ([[shift-reset-mir-lowering]]) and delimited continuation infrastructure operate independently of modalities today. Unifying them under the modal framework would mean effect tracking composes with usage and liquid checking rather than being a separate concern.
