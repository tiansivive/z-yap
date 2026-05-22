---
tags:
- concept
- type-system
- row-types
- pattern
- exploration
- needs-design
- elaboration
- inference
- unification
- structural
- mechanism
- language
- principle
- question
- sugar
refs:
- src: src/elaboration/inference/variants.ts
  note: "Variant type inference with row tails"
- src: src/elaboration/unification/rows.ts
  note: "Row unification handles open vs closed"
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Open vs closed variants

Yap's [[variant-types]] can be open (row variable tail, extensible) or closed (no tail, fixed set of constructors). The distinction emerges from [[row-polymorphism]]: `| #a A | #b B` is closed; `| #a A | #b B | r` is open.

This directly affects [[exhaustiveness-checking]]: closed variants have a known constructor set and can be fully covered by pattern matching. Open variants have an unknown extension and require a fallback branch (a wildcard or `otherwise` clause).

When exhaustiveness checking is added, the open/closed distinction becomes the primary discriminant. For closed variants, the checker can verify all tags are covered. For open variants, the checker can verify a fallback exists. Both are useful — neither requires the other.

Yap can infer whether a variant is open or closed from context. When the full type is known (annotation, return type, closed literal), the variant is closed. When a row variable remains, it's open. The type system already tracks this via [[unification]] and row solving; the exhaustiveness checker would consume this information.

This also connects to [[data-declarations]]: a `data` declaration could produce a closed variant by default (no row tail), giving the exhaustiveness checker a known constructor set without the user manually closing the row.

Related: [[variant-types]], [[row-polymorphism]], [[exhaustiveness-checking]], [[match]], [[data-declarations]], [[rows-universal-substrate]], [[active-patterns]].
