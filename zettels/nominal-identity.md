---
tags:
- concept
- type-system
- principle
- decision
- exploration
- speculative
- question
- unification
- row-types
- structural
- language
- inference
- elaboration
- normalization
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Nominal identity

Whether Yap should support any form of nominal typing alongside its structural core. Nominal identity means two types with the same structure are considered distinct if they have different names.

Yap's current position: structural throughout. Type identity comes from shape and [[unification]], not from declaration names. This is a deliberate design choice that simplifies the type system and enables [[row-polymorphism]]. See [[structural-typing]] and [[nominal-typing]] for the existing contrast.

Arguments for some nominal support: enforcing invariants (a validated email vs a raw string), preventing accidental structural coincidence, enabling better error messages. Arguments against: complicates [[unification]], introduces a second notion of type identity, fights the structural philosophy.

One middle ground: branded types or phantom tags — structural types with a tag field that distinguishes them nominally without a separate nominal type system. This could be encoded today with [[variant-types]] tags or row labels. Another option: [[data-declarations]] could optionally generate opaque wrappers (see [[opaque-types]]) that hide the structural representation behind a module boundary.

Exploration area, not a planned feature.

Related: [[structural-typing]], [[nominal-typing]], [[data-declarations]], [[opaque-types]], [[module-system]].

<!-- connections:start -->

## Connections

**Outgoing**
- CONTRASTS_WITH → [[structural-typing]] — Two notions of type identity
- INFORMS → [[data-declarations]] — Whether data decls carry nominal identity
- INFORMS → [[opaque-types]] — Opacity requires some nominal notion
- INFORMS → [[module-system-exploration]] — Module boundaries as abstraction
- EXTENDS → [[nominal-typing]] — Explores adding nominal identity to Yap
- CONTRASTS_WITH → [[row-polymorphism]] — Nominal fights structural extensibility

**Incoming**
- [[data-declarations]] ← INFORMS — Sugar syntax does not require nominality
- [[opaque-types]] ← RELIES_ON — Opacity requires nominal notion
- [[module-system-exploration]] ← INFORMS — Modules introduce nominal boundaries

<!-- connections:end -->
