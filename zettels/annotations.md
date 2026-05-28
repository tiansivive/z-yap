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

The annotation form does not survive into EB.Term — there is no "annotation" constructor in the core syntax. The annotation's effect is purely elaboration-time: it determines the mode (check vs infer) and the expected type, then produces the same core term that checking would produce.

Modality stripping preserves user-written modalities on annotated types: `stripModalities` ensures that annotations with modality information do not lose that information when the inferred type is used downstream.
