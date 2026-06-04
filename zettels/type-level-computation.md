---
tags:
- concept
- type-system
- dependent
- elaboration
- normalization
- implemented
- decision
- principle
- language
- evaluation
- unification
- mechanism
- recursion
- inference
- solver
refs:
- src: src/elaboration/normalization/evaluation.v2.ts
  note: "NbE evaluator handles type-level and term-level uniformly"
- src: src/elaboration/unification/unification.ts
  note: "Type equality via unification on NF.Value"
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Type-level computation in Yap

[[types-as-terms]]: types are terms, [[type-type]], and type-level functions are ordinary dependent functions reduced by [[nbe]]. The type system *is* the type-level language—[[type-families]], promoted data kinds, and type-level pattern matching would be surface conveniences on top of the same λΠ core, not a second evaluation universe.

This design means `let Maybe : Type -> Type = \a -> | #none Unit | #some a` defines a type constructor as a lambda, and `let makeType = \b -> match b | true -> Num | false -> String` computes types from values. Type-level and term-level share the same evaluation, [[unification]], and substitution machinery.

Pragmatic limit: equirecursive type-level computation is capped by a step budget in evaluation (`maxSteps` in `NF.evaluate`). This is an engineering guard against non-termination, not a proof of decidability. The mismatch between Turing-complete type-level computation and the need for decidable type checking is a known tension — [[termination-checking]] or [[sized-types]] could address it in the future.

Compared to Haskell: type-level computation is more uniform (no promotion) but less controlled (no termination). Compared to Agda: similar in spirit (types are terms) but without the termination checker that makes it safe. The key insight is that because Yap has type-level functions, features like [[type-families]], [[functional-dependencies]], and promoted data kinds are not needed as separate mechanisms.

Related: [[types-as-terms]], [[type-type]], [[nbe]], [[dependent-types]], [[equirecursive-types]], [[termination-checking]].

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[types-as-terms]] — Types are terms foundation
- USES → [[type-type]] — Type : Type enables type-level functions
- USES → [[nbe]] — NbE evaluates type-level functions
- USES → [[unification]] — Type equality for computed types
- SUBSUMES → [[type-families]] — Dependent functions subsume closed families
- CONSTRAINS → [[equirecursive-types]] — Step budget limits computation
- EXTENDS → [[dependent-types]] — Types computed from values
- CONTRASTS_WITH → [[ghc-influence]] — No promotion needed

**Incoming**
- [[type-families]] ← EMULATES — Type families as type-level functions
- [[type-families]] ← CONTRASTS_WITH — Separate mechanism vs unified terms
- [[type-families]] ← INFORMS — Capabilities Yap should reproduce
- [[functional-dependencies]] ← EMULATES — Determinacy via dependent functions
- [[functional-dependencies]] ← CONTRASTS_WITH — Annotation vs computation

<!-- connections:end -->
