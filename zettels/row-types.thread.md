---
tags:
- thread
- row-types
- type-system
- elaboration
- unification
- verification
---
# Row Types

Structural data through the full pipeline: R.Row as shared substrate for records,
tuples, variants, injection/projection; row unification and rewriting; surface type
features; verification-side row theory. Rows are Yap's universal compound-type
mechanism.

## Sequence

1. **Row data structure** [[row-data-structure]] — implemented
   R.Row AST, helpers, Empty/Extension/Variable.

2. **Row unification** [[row-unification]], [[row-unification-mechanism]] — implemented
   Dispatch table for Row.unify, flex/rigid row variables.

3. **Row rewriting** [[row-rewriting]] — implemented
   Private `rewrite` helper in `rows.ts`.

4. **Row polymorphism** [[row-polymorphism]] — implemented
   Parametric tails, flex/Schema/assign story.

5. **Structural records** [[structural-records]] — implemented
   Schema-backed record types.

6. **Tuples** [[tuples]] — implemented
   Positional row-backed types.

7. **Variants** [[variant-types]] — implemented
   Sum types via row extension.

8. **Injection / Projection** [[injection]], [[projection]] — implemented
   Introduction and elimination for row-backed types.

9. **Tagged values** [[tagged-values]] — implemented
   Distinct introduction path for variant values vs row extension.

10. **Lists** [[lists]] — implemented
    Array + Indexed exceptions to the row substrate.

11. **Label lookup** [[label-lookup]] — implemented
    Row label resolution mechanism.

12. **Design foundations** [[rows-universal-substrate]], [[structural-row-based-types]] — reference
    Principled design decisions documenting rows as universal substrate.

13. **Dedicated EB.Term constructors** [[dedicated-row-constructors]] — planned
    Refactor away from nested App(Lit(Atom(...)), Row(...)). Touches lowering,
    NbE, unify, snapshots.

14. **Row theory (verification)** [[row-theory]] — needs-design
    SMT/verification-side row solver and translation. Row literals currently
    error in translate.ts.
