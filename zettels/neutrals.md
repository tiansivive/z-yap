---
tags:
- concept
- normalization
- elaboration
- unification
- dependent
- implemented
- inference
- type-system
- ir
- ast
- metavariable
- modality
- ffi
- recursion
---
# Neutral terms

Stuck computation in Yap's NbE. A neutral term is an NF.Value that cannot reduce further because its head is unknown — typically an unsolved meta-variable, a free variable, or a blocked elimination.

Yap uses a single-wrapper representation: `{ type: "Neutral"; value: Value }`. There is no separate head+spine structure — a neutral application is `Neutral(App(head, arg, icit))`, a stuck match is `Neutral(App(λ-closure, scrutinee))`, a blocked projection or injection is `Neutral(App(λ-closure, base))`. Nested neutral wrapping accumulates for deeply stuck spines; `unwrapNeutral` strips layers when needed.

This design trades structural clarity (a head+spine would make the stuck head immediately visible) for simplicity (one wrapper, one pattern to match). The trade-off works because Yap's unification and forcing mechanisms handle neutrals uniformly — they don't need to distinguish spine structure from head structure.

Neutrals arise from:
- **Unsolved metas**: `Neutral(Var(meta))` — the canonical case. Solving the meta (via unification/zonking) unsticks the term.
- **Free variables**: rigid variables introduced by binders during type checking.
- **Blocked elimination**: projection/injection on a neutral base; match on a neutral scrutinee.
- **Mu application**: applying a Mu-binder Abs produces a neutral App rather than unfolding, preventing infinite expansion during normalization.

The flex/rigid distinction in unification operates on neutrals: a flex neutral has an unsolved meta at its head (solvable), while a rigid neutral has a bound variable (structural).
