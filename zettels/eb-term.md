---
tags:
- concept
- elaboration
- ast
- syntax
- dependent
- ir
- row-types
- modality
- continuation
- recursion
- inference
- implemented
---
# EB.Term

The elaboration core syntax — Yap's intermediate representation between the surface AST (Src.Term) and the semantic domain (NF.Value). Every term produced by the elaborator is an EB.Term; every term consumed by NbE evaluation is an EB.Term.

EB.Term is a branded type with a monotonically increasing `id` field, giving each node a unique identity throughout the elaboration pipeline. This enables identity-based operations (memoization, provenance tracking, diagnostic labeling) without structural comparison.

Constructors cover the full core language: `Lit`, `Var`, `Abs`, `App`, `Row`, `Proj`, `Inj`, `Match`, `Block`, `Modal`, `Reset`, `Shift`. Surface sugar (struct, schema, variant, array) desugars to `App` of a literal atom to a `Row` — there are no dedicated container constructors. This uniform App+Row encoding means that structural type operations (projection, injection, pattern matching) dispatch on the atom label rather than the constructor, keeping the core language small.

Variables carry their own discriminant: `Bound` (de Bruijn index), `Free`, `Foreign`, `Label` (sigma field reference), and `Meta` (unsolved unknown). Patterns for Match cover `Binder`, `Var`, `Lit`, `Row`, `Struct`, `Variant`, `List`, `Wildcard`. Block statements are `Expression`, `Let`, or `Using`.

All binders (Pi, Sigma, Lambda, Mu, Let) share the single `Abs` node — see unified-binder for the design rationale.
