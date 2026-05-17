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

**Universes:** there is no separate universe tower in these files—predicative hierarchy is not encoded in the shown `NF.Type`/`Pi` pipeline. Anything beyond that is design documentation, not verified from code here.

Related: [[types-as-terms.md]], [[dependent-types.md]], [[pi-types.md]], [[nf-value.md]].
