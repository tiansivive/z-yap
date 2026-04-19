---
tags: [concept, type-system, dependent]
---
# Dependent Types

Types that can depend on values. A function's return type can mention its arguments:

```
Vec : Nat -> Type -> Type
append : (n m : Nat) -> Vec n a -> Vec m a -> Vec (n + m) a
```

In yap, dependent types appear as Pi binders where the codomain references the domain variable. This enables types to carry program-level information — lengths, indices, proofs.

Yap's dependent types interact with:
- **[[bidirectional-checking|Bidirectional checking]]** — annotations provide the type information that inference alone cannot derive
- **[[nbe|NbE]]** — definitional equality must evaluate under binders to compare dependent types
- **[[elaboration|Elaboration]]** — implicit arguments and meta-variables are solved via unification under dependent contexts
