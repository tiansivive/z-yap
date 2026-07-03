---
adr-id: D-010
tags:
  - adr
  - accepted
  - decision
  - implemented
  - representation
  - variant
  - row-types
  - pattern
  - elaboration
  - normalization
  - lowering
  - gram
  - verification
  - runtime
refs:
  - code:tiansivive/yap#10
---
# Variant values use a fixed runtime discriminant

**Decision:** A tagged variant value is represented at runtime as a struct with fixed fields `{ __tag: Atom(tag), payload: value }`. The variant type remains a tag-keyed row, `Variant [ tag: PayloadType | rest ]`.

## Scope

This decision covers value introduction, pattern matching, normalization, verification, and lowering for tagged variant values. It does not change the type-level representation of variants, row-polymorphic variant typing, or the surface syntax for tagged values.

## Rationale

Variant values need a stable discriminant that the compiler can dispatch on independent of payload type. Encoding the tag as a record label makes construction and elimination disagree: pattern dispatch needs a uniform place to read the chosen arm, while the payload label varies with the tag and cannot serve as a fixed field.

The fixed struct shape separates two roles:

- `__tag` is the runtime discriminant.
- `payload` is the value matched by the selected arm's payload pattern.

The type stays tag-keyed because each arm can have a distinct payload type. A type-level `payload` field would erase the sum structure that row variants provide.

## Consequences

Pattern compilation reads `__tag` for variant branch selection and projects `payload` before matching the arm body. NbE `meet` mirrors the same split: select the arm by tag, then meet the arm pattern with the payload and bind the remaining inactive variant row as empty.

Verification treats tagged terms as variant-introducing values, not ordinary records. A tagged term synthesizes a closed single-arm `Variant` type, and checking a tagged term against a broader variant type resolves the arm by tag before checking the payload.

The representation is deliberately a struct-shaped value rather than a separate core term constructor. That keeps records and variants on the same row-backed substrate while making the runtime discriminant explicit.

This decision leaves efficient backend dispatch open. Integer tags and jump-table selection are backend and optimization concerns, tracked separately from the semantic value representation.

<!-- connections:start -->

## Connections

**Outgoing**
- DEFINES → [[variant-types]] — Runtime value representation for row variants
- DEFINES → [[tagged-values]] — Tagged introduction writes the fixed discriminant shape
- CLARIFIES → [[bridge-struct-dispatch]] — Variant switches read the same discriminant while struct switches project
- RELIES_ON → [[rows-universal-substrate]] — Runtime value remains row/struct backed
- CONSTRAINS → [[gram-pattern-pass]] — Variant branch selection targets __tag and arm matching targets payload

**Incoming**
- [[typed-dispatch-equality]] ← FOLLOWS — D-010 keeps symbolic tag dispatch while equality design waits
- [[pipeline-stabilization.thread]] ← INCLUDES
- [[pattern-matching.thread]] ← INCLUDES

<!-- connections:end -->
