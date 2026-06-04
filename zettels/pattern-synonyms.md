---
tags:
- concept
- pattern
- syntax
- language
- sugar
- exploration
- speculative
- row-types
- structural
- mechanism
- reference
- paper
- elaboration
- needs-design
refs:
- title: "Pattern Synonyms"
  authors: Pickering, Érdi, Peyton Jones
  year: 2016
  url: https://doi.org/10.1145/2976002.2976013
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Pattern synonyms

User-defined patterns that abstract over constructor matching. `pattern Pair x y = (x, y)` lets you match with `Pair` without it being a real constructor. Can be bidirectional (usable as both pattern and expression) or unidirectional.

A UX feature that doesn't change Yap's fundamental semantics. In a [[structural-typing]] system, pattern synonyms provide a way to name common row shapes and match on them by name — essentially aliases for structural patterns.

Pattern synonyms are a strong candidate for Yap surface sugar: lightweight desugaring with high ergonomic payoff for library authors exposing clean matching APIs over complex structural types. The trade-off is surface-language complexity—each new pattern form is another concept users learn.

Bidirectional pattern synonyms in Yap would need to be consistent with [[structural-records]] and [[variant-types]]: a pattern synonym that works both as a destructor (in match arms) and a constructor (in expressions) must have a well-typed inverse. In a structural setting, this is often straightforward since the structure is the identity.

Related: [[match]], [[view-patterns]], [[active-patterns]], [[variant-types]], [[structural-records]], [[data-declarations]].

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[match]] — Named patterns for structural types
- COMPOSES_WITH → [[structural-typing]] — Naming structural shapes
- COMPOSES_WITH → [[variant-types]] — Named variant patterns
- COMPOSES_WITH → [[structural-records]] — Named record patterns
- INFORMS → [[data-declarations]] — Pattern names supplement data decls
- DESUGARS_TO → [[pattern-matching-compilation]] — Desugars to structural patterns
- INFORMS → [[ghc-influence]] — GHC PatternSynonyms extension

**Incoming**
- [[view-patterns]] ← CONTRASTS_WITH — Runtime computation vs static alias
- [[pattern-matching.thread]] ← INCLUDES

<!-- connections:end -->
