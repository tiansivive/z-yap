---
tags:
- thread
- row-types
- type-system
- elaboration
- unification
- verification
- parser
- mir
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
    IVL row **sort**/**RowTerm** scaffolding exists; **`translate.ts`/`term()`** still throws on **concrete row literals** — Milestone 4 work is lowering + theory, not swapping IR ([[milestone-4-rows]]).

15. **Sigma checking fix** [[sigma-checking-infer-constrain]] — implemented
    `check([struct, Sigma])` infers for values, applies sigma closure, then re-checks
    against the resulting type. Preserves bidirectional checking for singleton types.

16. **Sigma/codata syntax proposal** [[sigma-codata-syntax-proposal]] — needs-design
    Separate sigils for sigma (dependent type-level refs) and codata (value-level self-ref).
    Candidates: `:`, `&`, `*`, `\`, `^`. Decision deferred pending codata/nu commitment.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[row-polymorphism]]
- INCLUDES → [[row-data-structure]]
- INCLUDES → [[row-rewriting]]
- INCLUDES → [[row-unification]]
- INCLUDES → [[row-unification-mechanism]]
- INCLUDES → [[rows-universal-substrate]]
- INCLUDES → [[structural-row-based-types]]
- INCLUDES → [[structural-records]]
- INCLUDES → [[tuples]]
- INCLUDES → [[variant-types]]
- INCLUDES → [[injection]]
- INCLUDES → [[projection]]
- INCLUDES → [[tagged-values]]
- INCLUDES → [[lists]]
- INCLUDES → [[dedicated-row-constructors]]
- RELIES_ON → [[row-theory]] — Structural row reasoning principle
- INCLUDES → [[label-lookup]]
- INCLUDES → [[data-declarations]]
- RELIES_ON → [[open-closed-variants]] — Concept: variant openness
- INCLUDES → [[customizable-data-types]]
- INCLUDES → [[indexing-strategies]]
- INCLUDES → [[sigma-checking-infer-constrain]] — Sigma checking bug
- INCLUDES → [[sigma-codata-syntax-proposal]] — Syntax proposal
- INCLUDES → [[design-open-closed-variant-semantics]] — Design work item
- INCLUDES → [[design-row-theory-verification]] — Design work item

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[verification-backend.thread]] ← SHARED_WITH — milestone-4-rows / row-theory
- [[pattern-matching.thread]] ← SHARED_WITH — exhaustiveness-checking depends on row/variant structure
- [[pipeline-stabilization.thread]] ← SHARED_WITH — Row/schema unification bug
- [[structural-data-traversal-syntax]] ← INFORMS — Traversal sugar targets row-backed structural data
- [[lacks-exclusion-type-operator]] ← INFORMS — Lacks constraints belong with row reasoning

<!-- connections:end -->
