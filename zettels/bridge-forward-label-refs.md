---
tags:
  - bug
  - bugfix
  - implemented
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - row-types
  - data-access
---

# Bridge forward label references

A label reference may point at a field that follows it: `{ a: :b + 1, b: 10 }` references `:b` from `a`. Resolving labels in field order binds backward references (`:width` in a later `area`) but leaves a forward reference pointing at a name that has no binding yet. The asymmetry is an artifact of order-dependent resolution, not of the reference itself.

Resolving labels as graph edges before lowering removes the asymmetry: every reference resolves against a complete graph regardless of field order (see [[gram-label-resolution-pass]]). What remains is an evaluation-order question, not a resolution one — a forward reference to an *eagerly-evaluated* sibling would read an uninitialised slot. Requiring define-before-use for eager data references rejects that case, while deferred references (under a lambda) and backward references stay sound (see [[recursive-struct-binding]]). Topological ordering of fields by dependency is the alternative that would admit forward eager references, traded away for a mechanical lowering.

<!-- connections:start -->

## Connections

**Outgoing**
- DISCOVERED_BY → [[bridge-label-closure-gap]] — Surfaced during #9 investigation
- APPLIES_TO → [[gram-to-mir-bridge]] — Struct field emission ordering

**Incoming**
- [[bridge-label-resolution]] ← LACKS — Current left-to-right pass handles backward refs only
- [[gram-label-resolution-pass]] ← ADDRESSES — Removes forward/backward asymmetry
- [[recursive-struct-binding]] ← AVOIDS — Define-before-use removes dependency ordering
- [[gram-struct-node]] ← ADDRESSES — Flat node removes the resolution ordering asymmetry
- [[gram-label-resolution-pass]] ← FIXES — Edge resolution removes the forward/backward asymmetry

<!-- connections:end -->
