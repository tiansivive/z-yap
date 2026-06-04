---
tags:
- decision
- elaboration
- ast
- dependent
- type-system
- syntax
- normalization
- implemented
---
# Unified binder (shared Abs node)

All binder types in Yap share a single `Abs` node, discriminated by `binding.type`: Pi, Sigma, Lambda, Mu, and Let. The same applies in the normal-form domain — `NF.Abs` carries an `NF.Binder` with the same discrimination.

This design follows directly from Yap's "types as terms" principle: since types and programs share the same syntax, there is no reason to separate type-level binders (Pi, Sigma) from term-level binders (Lambda) or recursive binders (Mu) at the AST level. They all bind a variable in a body, carry an annotation, and produce a closure when evaluated.

The discrimination in `binding.type` lets downstream consumers (inference, checking, unification, NbE, lowering) dispatch on binder kind where it matters:
- **Inference** distinguishes Pi (type-level) from Lambda (term-level) to produce different types.
- **Checking** pairs surface Lambda with expected Pi types (icit matching).
- **Unification** handles Pi-Pi, Sigma-Sigma, and Mu-Mu cases with structural comparison under fresh rigids.
- **NbE evaluation** treats Lambda/Pi/Sigma closures uniformly but keeps Mu neutral (no eager unfold).
- **Lowering** erases Pi/Sigma/Mu (type-level) and only generates code for Lambda (runtime closures).

The alternative — separate AST node types per binder kind — would duplicate the shared structure (annotation, body, closure) and prevent uniform traversal, with no semantic benefit given that types and terms already share the same representation.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[eb-term]] — All binders share Abs in EB.Term
- CONSTRAINS → [[nf-value]] — All binders share Abs in NF.Value
- ENABLES → [[dependent-types]] — Types and terms in one binder node
- RELIES_ON → [[types-as-terms]] — Follows from types-as-terms principle
- APPLIES_TO → [[pi-types]] — Pi uses Abs with binding.type Pi
- APPLIES_TO → [[sigma-types]] — Sigma uses Abs with binding.type Sigma
- APPLIES_TO → [[lambda]] — Lambda uses Abs with binding.type Lambda
- APPLIES_TO → [[mu-types]] — Mu uses Abs with binding.type Mu
- ENABLES → [[nbe]] — Uniform closure construction for all binders
- ENABLES → [[unification-algorithm]] — Structural comparison under fresh rigids

**Incoming**
- [[ast-pipeline]] ← RELIES_ON — Single Abs node across all layers
- [[dependent-types]] ← RELIES_ON — All binders share Abs
- [[sigma-architecture]] ← APPLIES_TO — Why sigma shares the Abs node

<!-- connections:end -->
