---
tags:
- concept
- type-system
- language
- exploration
- speculative
- question
- structural
- principle
- needs-design
- row-types
- mechanism
- elaboration
- inference
- unification
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Opaque types

Mechanisms for defining types whose internal representation is hidden from consumers. Haskell's `newtype` wraps an existing type with a new nominal identity at zero runtime cost. ML-family signatures expose abstract types that can only be constructed/destructed by the defining module.

In a structural type system like Yap's, opaque types are inherently in tension with the core design — [[structural-typing]] means any code that sees the structure can use it. Adding opacity requires some form of abstraction boundary: module signatures (see [[module-system-exploration]]), branded types, or phantom tags.

The question is not whether to break structural typing but whether to layer nominal abstraction on top of it for specific use cases (validated data, library invariants). Branded types (a tag field that distinguishes otherwise identical structures) are one lightweight approach that works within the structural framework. See [[nominal-identity]] for the broader exploration.

Separate from the question of type alias transparency in lowering and [[ffi]], which is about lookup and variable resolution rather than abstraction.

Related: [[nominal-identity]], [[structural-typing]], [[module-system-exploration]], [[customizable-data-types]], [[data-declarations]], [[nominal-typing]].
