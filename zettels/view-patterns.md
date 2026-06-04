---
tags:
- concept
- pattern
- syntax
- exploration
- speculative
- language
- elaboration
- mechanism
- sugar
- type-system
- inference
- compilation
- needs-design
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# View patterns

Patterns that apply a function before matching: match on the result of a computation rather than on the raw value. Haskell: `f (view -> p) = ...` applies `view` to the argument and matches the result against `p`.

Distinct from functional patterns (Curry-style), which involve [[unification]] and search-space exploration. View patterns are simpler — just a function application followed by structural matching. No backtracking, no unification against the pattern.

View patterns could fit Yap as desugared function application before structural matching. The mechanism is straightforward: elaborate the view function application, then match on the result. Main design question is syntax and interaction with [[exhaustiveness-checking]] — a view function can map to a type with fewer constructors, making exhaustiveness easier rather than harder.

The implementation path through Yap's [[match]] and [[pattern-matching-compilation]] is relatively clear: desugar the view application before feeding into the existing clause-matrix compilation. The elaboration cost is one additional function application per view pattern.

Related: [[match]], [[pattern-matching-compilation]], [[pattern-synonyms]], [[active-patterns]], [[exhaustiveness-checking]].

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[match]] — Function-applied matching
- CONTRASTS_WITH → [[pattern-synonyms]] — Runtime computation vs static alias
- CONTRASTS_WITH → [[active-patterns]] — No failure protocol vs explicit failure
- INFORMS → [[exhaustiveness-checking]] — Views can simplify coverage
- DESUGARS_TO → [[pattern-matching-compilation]] — Desugars before clause matrix
- INFORMS → [[ghc-influence]] — Haskell ViewPatterns extension

**Incoming**
- [[active-patterns]] ← EXTENDS — View patterns with failure protocol
- [[pattern-matching.thread]] ← INCLUDES

<!-- connections:end -->
