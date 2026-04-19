---
tags: [mechanism, type-system, row-types, elaboration]
---
# Row Unification

Unification extended to handle row variables — solving constraints on record/variant structure.

When two row types are unified:
1. Match shared labels — unify their types pairwise
2. Collect remaining labels on each side
3. Unify remainders with fresh row variables (or the row tail)

```
{ name: String, age: Int | r1 } ~ { name: String, x: Bool | r2 }
→ unify(String, String), r1 ~ { x: Bool | r3 }, r2 ~ { age: Int | r3 }
```

In yap, row unification runs alongside standard type unification during [[constraint-solving]]. Row variables are meta-variables that range over row tails — they're solved the same way type metas are, via the substitution/zonker.
