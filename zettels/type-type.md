---
tags:
- type-system
- dependent
- concept
- decision
- elaboration
- inference
- normalization
- syntax
- implemented
- ast
- parser
- unification
- verification
- display
- error-handling
---
# `Type` and `Type : Type`

**Core value:** `NF.Type` is the normal-form literal `Lit(Atom("Type"))` (`src/elaboration/normalization/syntax/term.ts`).

**Surface:** the `Type` atom token elaborates through `src/elaboration/inference/literal.ts`: for `value.type === "Atom"` the inferred **type** is `NF.Constructors.Lit(Lit.Atom("Type"))`, i.e. the same `NF.Type` constant—so the object-level `Type` token is typed by `Type` in the elaborator’s sense.

**Use as classifier:** Pi formation checks domain and codomain against `NF.Type` (`src/elaboration/inference/pi.ts`). Many `check.ts` branches require `NF.Patterns.Type` for type-level tuples, variants, etc.

**Universes:** the elaborator uses a single classifier constant `NF.Type` (`Lit(Atom("Type"))`); Pi formation and checking branches key off that constant in `src/elaboration/inference/pi.ts` and `src/elaboration/check.ts`. A predicative hierarchy or separate universe tower would be an extension beyond what those modules encode today.

Related: [[types-as-terms.md]], [[dependent-types.md]], [[pi-types.md]], [[nf-value.md]], [[type-level-computation]], [[indexed-families]].
