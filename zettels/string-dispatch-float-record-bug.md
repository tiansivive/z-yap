---
tags:
  - bug
  - deferred
  - pattern
  - lowering
  - codegen
  - backend
  - runtime
  - equality
  - compiler
  - mir
  - dispatch
  - representation
---
# String dispatch misrepresents floats and records

String-based pattern dispatch is only correct when the string is a faithful representation of the discriminant. It is reliable for atom tags, but it is not a general equality mechanism.

Numeric literal dispatch through C stringification can lose floating-point information when a float is rendered through an integer format. Record values collapse to a generic record or closure label, so distinct records can share the same string. Both cases make branch selection depend on a display artifact rather than typed value equality.

This defect is orthogonal to the variant discriminant representation: variant tags are atoms stored in `__tag`, so their string comparison is symbolic tag comparison. The bug belongs to the broader literal/general dispatch path and should be resolved by typed dispatch equality rather than by extending ad hoc stringification.

<!-- connections:start -->

## Connections

**Outgoing**
- MOTIVATES → [[typed-dispatch-equality]] — Mis-stringified values show why dispatch equality must be typed
- APPLIES_TO → [[gram-to-mir-bridge]] — The defect is in literal/general branch comparison paths

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES
- [[global-pending-queue]] ← INCLUDES — Deferred literal/general dispatch bug
- [[codegen-correctness-gaps]] ← REFERENCES — Sibling lossy-lowering case

<!-- connections:end -->
