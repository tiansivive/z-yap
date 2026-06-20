---
tags:
  - verification
  - decision
  - mechanism
  - dependent
  - type-system
  - principle
  - research
  - implemented
  - backend
  - validity
  - liquid
  - fragment
  - inference
  - sat
---
# Bidirectional + subtype verification

Yap's VC generation follows a bidirectional refinement type checking discipline in the style of Jhala and Vazou's liquid type checking. Obligations are produced by three judgment forms — `check`, `synth`, and `subtype` — each targeting a different direction of type information flow.

## How it works

**Check** (`check`): Given a term and an expected type (which may carry a refinement), verify the term satisfies the refinement by emitting an obligation for the conjunction of refinement predicates after substitution.

**Synth** (`synth`): Given a term, synthesize its type, which includes any refinements that can be inferred from the term's structure. The synthesized refinement becomes an assumption in downstream checks.

**Subtype** (`subtype`): Given two types, verify that the first is a subtype of the second. For refinement types, this reduces to checking that the first refinement implies the second under the current path condition. This handles structural rows through `subtype.contains`.

## Why bidirectional

Bidirectional flow minimizes annotation burden while keeping VC generation predictable. Checking mode pushes expected types inward (eliminations), synthesis mode pulls types outward (introductions), and subtype mode bridges them. This is the standard approach for liquid/refinement systems and avoids the inference fragility of fully synthesized refinement types.

## Relationship to the solver

All three forms emit `IVL.Formula` obligations through `translate.ts`. Those obligations are verifier-facing validity judgments: guarded binders encode the local typing environment, and [[vc-validity-discharge]] consumes that structure before raw SAT. Obligation labels carry enough provenance to trace results back to source ([[vc-provenance]]).

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[verification-backend]] — VC generation strategy
- USES → [[ivl-boundary]] — Emits IVL.Formula obligations
- PRODUCES → [[vc-provenance]] — Obligations carry provenance
- GROUNDED_IN → [[refinement-types]] — Liquid type theory

**Incoming**
- [[verification-backend.thread]] ← INCLUDES
- [[liquid-vc-fragment]] ← CLARIFIES — Guarded quantifiers come from bidirectional judgments

<!-- connections:end -->
