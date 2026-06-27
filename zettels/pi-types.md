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

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[dependent-types]] — Universal quantification with dependency
- GENERALIZES → [[lambda]] — Arrow → is non-dependent Pi
- FORMS → [[lambda]] — Π is formation rule for functions
- DUAL_OF → [[sigma-types]] — Universal vs existential
- COMPOSES_WITH → [[sigma-types]] — Dependent function returning dependent record
- COMPOSES_WITH → [[refinement-types]] — Refined domains/codomains

**Incoming**
- [[mir]] ← ERASES — Types not preserved in MIR
- [[refinement-types]] ← SUBSUMES — Refined T subtype of T
- [[refinement-types]] ← COERCES_TO — Forget rule strips predicate
- [[modalities]] ← APPLIES_TO — Quantity on domain
- [[modalities]] ← COERCES_TO — Modal stripping during inference
- [[lambda]] ← INTRODUCES — Intro form for functions
- [[application]] ← ELIMINATES — Elim form for functions
- [[type-erasure]] ← ERASES — Removes type information
- [[annotations]] ← COERCES_TO — Term validated against annotation
- [[shift-reset]] ← COMPOSES_WITH — k has Pi type
- [[answer-type-polymorphism]] ← GENERALIZES — Monomorphic → polymorphic answer
- [[implicit-resolution]] ← COMPOSES_WITH — Implicit Pi triggers insertion
- [[smt-translation]] ← ERASES — Functions → uninterpreted
- [[dynamic-reflection]] ← COERCES_TO — Safe cast via proof
- [[typing-rules]] ← FORMS — Type-theoretic foundation
- [[system-f]] ← INFORMS — Parametric polymorphism foundation
- [[unification-algorithm]] ← IMPLEMENTS — Pi-Pi equality checking case
- [[elaboration-context]] ← THREADS_THROUGH — Binder extension
- [[dependent-types]] ← FORMS — Universal quantification with dependency
- [[verification-pipeline]] ← ERASES — Functions → uninterpreted
- [[bidirectional-checking]] ← INTRODUCES — Types in check mode
- [[bidirectional-checking]] ← ELIMINATES — Types in infer mode
- [[bidirectional-checking]] ← COERCES_TO — Infer to check mode switch
- [[modalities]] ← COMPOSES_WITH — Graded function arguments
- [[refinement-types]] ← COMPOSES_WITH — Refined function domains/codomains
- [[answer-type-polymorphism]] ← USES — Polymorphic answer type is a Pi
- [[smt-translation]] ← ERASES — Functions → uninterpreted in SMT
- [[lambda]] ← DISPATCHES_ON — Explicit λ vs implicit λ{} icit matching
- [[lambda-synthesis-fix]] ← DEPENDS_ON — Pi type return closure construction
- [[test-coverage-gaps]] ← BLOCKS — Dependent arg test blocked by Bool parsing + dependent match/checking coverage
- [[unified-binder]] ← APPLIES_TO — Pi uses Abs with binding.type Pi
- [[standard-closure]] ← ENABLES — Pi codomains are standard closures
- [[annotations]] ← RELIES_ON — Annotation often provides expected Pi type
- [[dependent-types]] ← INCLUDES — Universal quantifier
- [[type-type]] ← ENABLES — Domain/codomain checked at Type
- [[sigma-architecture]] ← CONTRASTS_WITH — Row-of-labels vs single de Bruijn variable
- [[sigma-value-semantics]] ← MIRRORS — Pi codomain analogy

<!-- connections:end -->
