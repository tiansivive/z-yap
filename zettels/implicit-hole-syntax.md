---
tags:
  - syntax
  - sugar
  - implicits
  - inference
  - elaboration
  - parser
  - language
  - backlog
  - planned
  - type-system
  - compiler
---

# Implicit-hole syntax

An explicit surface marker for "infer this in-scope implicit" would let users refer to an implicit requirement without spelling the full binder. A sketch like `$arg` would elaborate to an implicit binder/application site whose type is solved by the same unification and implicit-resolution machinery as ordinary inserted metas.

The feature overlaps named implicit application and implicit lookup by type, so the syntax should not become a second implicit system. It is a user-facing handle for existing metavariable/resolution behavior.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[implicit-resolution]] — Surface marker for existing implicit resolution behavior

**Incoming**
- [[surface-syntax-backlog]] ← INCLUDES — Surface handle for implicit metavariable resolution

<!-- connections:end -->
