---
tags:
- concept
- syntax
- elaboration
- checking
- type-system
- implemented
- inference
- dependent
- normalization
- parser
- ast
---
# Type annotations

The `expr : Type` form — Yap's mechanism for switching from inference to checking mode. The annotation type is checked against Type (ensuring it's a valid type), evaluated to a normal form, and then the annotated expression is **checked** against that normal form rather than inferred.

This is the bidirectional hook: without an annotation, the elaborator must synthesize a type from the expression's structure. With an annotation, it can check the expression against a known type, enabling the elaborator to push type information downward into subexpressions. This is critical for dependent types where synthesis alone cannot pin types (e.g., a bare lambda has no way to synthesize its domain type without an expected Pi).

The source annotation form (`expr : Type`) does not survive into EB.Term as a direct translation — its effect is purely elaboration-time: it determines the mode (check vs infer) and the expected type, then produces the same core term that checking would produce.

EB.Term's `Ann` constructor pairs a term with a quoted type annotation, giving the core a fully typed representation where type information persists past elaboration. Any downstream pass can recover the type of an annotated node locally, without re-inference — the annotation is a quoted `EB.Term` that can be evaluated in the consumer's own context.

Modality stripping preserves user-written modalities on annotated types: `stripModalities` ensures that annotations with modality information do not lose that information when the inferred type is used downstream.

<!-- connections:start -->

## Connections

**Outgoing**
- COERCES_TO → [[pi-types]] — Term validated against annotation
- ENABLES → [[bidirectional-checking]] — Switches infer → check mode
- RELIES_ON → [[nf-value]] — Annotation evaluated to NF before checking
- RELIES_ON → [[pi-types]] — Annotation often provides expected Pi type
- COMPOSES_WITH → [[modalities]] — stripModalities preserves user modalities

**Incoming**
- [[fst-closure-annotation]] ← FIXES — Ann now carries EB.Term instead of NF.Value

<!-- connections:end -->
