---
tags:
- thread
- recursion
- type-system
- unification
- elaboration
- normalization
- problem
- planned
---
# Recursion

Mu types, equirecursive equivalence, mutual recursion in struct rows, and surface
loop sugar. The core gap: occurs-check currently throws instead of producing mu
types.

## Sequence

1. **Mu types** [[mu-types]] — incomplete
   Mu binders in AST/NF. Recursive let wrapping. Evaluation defers mu-heads.
   Occurs-check -> mu NOT implemented (explicit throw).

2. **Mu type unification** [[mu-type-unification]] — implemented
   Unification by unfolding. Structural comparison of mu-wrapped types.

3. **Equirecursive types** [[equirecursive-types]] — needs-design
   Bisimulation-based equivalence, fuller story vs current unify + evaluation.

4. **Mutual recursion** [[mutual-recursion]] — incomplete
   Mutual deps in struct rows via inSigmaContext: implemented. Top-level mutual
   across lets: sequential only. TODO: sigma-as-stack for nested rows.

5. **Recursive types spec** [[missing-spec-recursive-types]] — needs-design
   Written calculus for mu, occurs-check recovery, equirecursive fragment.

6. **Loop sugar** [[loop-sugar]] — deferred
   `for`/`while` surface syntax. Independent future concern.

7. **Codata vs coinductive types** [[codata-vs-coinductive-types]] — needs-design
   Codata (observations, computed fields, streams) vs coinductive types (greatest
   fixed point, bisimulation, productivity). Yap's immediate need is codata records;
   full coinductive type theory is a separate commitment.

8. **Sigma/codata label ref duality** [[sigma-vs-codata-label-refs]] — needs-design
   `:label` serves two roles: sigma (deferred, parametric, type-level) and codata
   (eager, fixed point, value-level). The connection to mutual recursion — flat-row
   sigma parallels mutually recursive letrec. Syntax split under consideration.
