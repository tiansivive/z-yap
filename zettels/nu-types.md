---
tags:
- concept
- type-system
- recursion
- speculative
- needs-design
- elaboration
- normalization
- unification
- syntax
- ast
- inference
- exploration
- language
- evaluation
- dependent
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Nu types

The planned dual to [[mu-types]] for Yap. Where `μ X. F(X)` is the least fixed point (inductive/well-founded), `ν X. F(X)` is the greatest fixed point (coinductive/productive).

The explored design: `nu` handles recursive data with no finite/infinite distinction at the type level. When checking a variable against a `mu` type, wrapping in `nu` marks it as coinductive. This keeps the surface minimal — same type-level machinery, different semantic commitment.

Current pieces that could be leveraged: the `Mu` binder in EB/NF already handles recursive type abstraction; `unfoldMu` in [[unification]] manages recursive comparison; `muContext` rewrites environment binders. A `nu` extension could mirror this infrastructure with a polarity flag on the recursive binder, or introduce a unified recursive-type binder that distinguishes inductive/coinductive use via an annotation rather than separate AST nodes.

Iteration path: start with `nu` as a binder variant sharing `mu`'s [[unification]] and [[nbe]] paths, add [[productivity-checking]] as a separate concern, explore whether copattern syntax (see [[codata]]) adds ergonomic value beyond what [[structural-records]] provide.

Related: [[mu-types]], [[equirecursive-types]], [[coinductivity]], [[bisimulation-type-equality]], [[termination-checking]].
