---
tags: [mechanism, type-system, elaboration, language]
---
# Implicit Arguments

Yap's implicit argument system supports two resolution modes:

**1. Unification-driven** — A [[meta-variables|meta]] is inserted at the call site for each implicit parameter. Constraint propagation from the explicit arguments solves the meta. This handles type inference for polymorphic functions (`id 42` → meta solved to `Num`).

**2. Environment lookup** — The `using` statement brings values into an implicit scope. When an implicit parameter's type matches a value in scope, it's resolved by type-directed lookup. Explicit override with `@` syntax.

Key rules:
- Implicits never cross module boundaries
- Multiple values of the same type in scope trigger ambiguity errors
- Unsolved implicits remain abstract (the function becomes polymorphic in that implicit)
