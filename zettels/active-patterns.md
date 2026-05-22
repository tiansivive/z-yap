---
tags:
- concept
- pattern
- syntax
- language
- exploration
- speculative
- mechanism
- sugar
- row-types
- type-system
- reference
- needs-design
- elaboration
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Active patterns

F# feature: user-defined recognizers that decompose values in pattern matching. Partial active patterns can fail (returning `None`); complete active patterns partition the input into cases.

Similar to [[view-patterns]] but with an explicit success/failure protocol. The partial variant interacts naturally with Yap's [[variant-types]] — a partial active pattern returns `| #some result | #none Unit`.

Like [[view-patterns]] and [[pattern-synonyms]], this is a pattern-matching ergonomics feature. The distinguishing aspect is the partiality protocol, which connects to [[exhaustiveness-checking]]: a complete active pattern preserves exhaustiveness guarantees while a partial one requires a fallback branch. This maps directly to the [[open-closed-variants]] distinction — a complete active pattern produces a closed variant, a partial one an open variant.

Implementation would flow through [[match]] and [[pattern-matching-compilation]], with the active pattern desugared to a function call whose result is matched structurally.

Related: [[match]], [[view-patterns]], [[pattern-synonyms]], [[exhaustiveness-checking]], [[variant-types]], [[open-closed-variants]].
