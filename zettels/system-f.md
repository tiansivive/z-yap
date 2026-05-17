---
tags:
- concept
- type-system
- reference
- elaboration
- generalization
- inference
- quantifiers
- dependent
- incomplete
- principle
- parser
- normalization
- monad
- decision
- migration
---
# System F (background)

System F adds type abstraction and ∀-quantified types to the simply typed λ-calculus. ML-style **rank‑1** polymorphism is the fragment where ∀ appears only at the outermost level of a let-bound type scheme.

**What Yap shares (verified)**

- **Type-level lambdas / quantification via Pi:** polymorphic or dependent function types use the same `Abs`+`Pi` representation (`src/elaboration/syntax/term.ts`).
- **Let-polymorphism flavor:** `NF.generalize` in `src/elaboration/normalization/generalization.ts` abstracts metas local to a binding into implicit Pi binders (see file comment block with `fmap` / `stringify` example).
- **Instantiation:** `NF.instantiate` (same module) defaults unconstrained metas.

**What Yap adds (verified)**

- **Dependent types:** Pi bodies and domains are arbitrary `NF.Type`-classified terms, not a separate kind layer only for type variables (`src/elaboration/inference/pi.ts`).
- **Rows and modalities:** record/variant shapes and modal annotations live in the same term language (`grammar.ne` `ModalType`, row processors, `NF.Modal`).

**Not verified here:** impredicativity claims, exact rank‑k fragment of surface Yap, or correspondence to a pure Fω presentation—treat those as external type-theory references, not repo facts.

Related: [[hindley-milner.md]], [[dependent-types.md]], [[type-type.md]], [[types-as-terms.md]].
