---
tags: [mechanism, type-system, elaboration]
---
# Generalization (Let-Polymorphism)

The mechanism that infers polymorphic types without explicit annotations. After elaborating a let-binding's body:

1. Collect unsolved [[meta-variables|metas]] whose scope level exceeds the binding's level
2. Wrap the inferred type in [[implicits|implicit]] Pi binders for each generalizable meta
3. Wrap the elaborated term in corresponding implicit lambda abstractions

Scope-level filtering ensures only locally-created metas generalize — metas from enclosing scopes remain free. This is Yap's implementation of [[hindley-milner|Hindley-Milner]] let-generalization, extended to work with dependent types and row variables.

Blocked by: metas that escape into the context (appear in other constraints) cannot generalize.
