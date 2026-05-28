---
tags:
- concept
- type-system
- dependent
- elaboration
- syntax
- implemented
- inference
- checking
- normalization
- unification
- modality
- quantifiers
---
# Pi types

Dependent function space — the universal quantifier in Yap's type theory. A Pi type `(x : A) -> B x` binds a variable in the codomain, allowing the return type to depend on the argument value. Non-dependent functions (`A -> B`) are the special case where the body ignores the binder.

Pi shares the `Abs` node with all other binders, discriminated by `binding.type === "Pi"`. The normal-form counterpart is `NF.Abs` with `binder.type === "Pi"` carrying a closure over the codomain.

Surface syntax offers two forms: explicit `(x : A) -> B` via the Pi nonterminal, and non-dependent `A -> B` via Arrow. Both elaborate to the same core `Abs` with a Pi binding. Modalities (multiplicities) attach to the domain type through the ModalType grammar production — they are a property of the domain, not a Pi-specific annotation.

In Yap's bidirectional elaboration, Pi plays a dual role:
- **Inference** checks the domain against Type, extends the context with a Pi binder, and checks the codomain against Type — producing a type-level Pi.
- **Checking** pairs a surface lambda with an expected Pi type by matching icitness, then checks the lambda body against the Pi's codomain applied to a fresh rigid variable.

Implicit Pi (`@` icitness) triggers implicit argument insertion during application inference — the elaborator instantiates implicit Pis with fresh meta-variables before processing the explicit argument.

At lowering, Pi types are erased. The runtime sees Lambda (closures), not Pi. Type-level Abs nodes do not appear in MIR.
