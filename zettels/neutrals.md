---
tags:
- normalization
- mechanism
- implemented
- elaboration
- inference
- unification
- dependent
- type-system
- ir
- ast
- modality
- ffi
- recursion
- reference
- code
---
# Neutrals (`NF.Neutral`)

`NF.Value` uses a **single wrapper** `{ type: "Neutral"; value: Value }` (`src/elaboration/normalization/syntax/term.ts`), not a separate head+spine record. `unwrapNeutral` strips nested `Neutral` layers (`evaluation.v2.ts`).

Typical neutral **heads** inside: `Var` (incl. unsolved **`Meta`** via `Neutral(Var(meta))` in the meta-var branch of `evaluateTerm`), or **spined** shapes built with `NF.Constructors.App` under `Neutral`.

**Examples from `reduceAndPushStack`:** applying to a neutral pushes `Neutral(App(head, arg, icit))`. **µ:** `Abs` with `Mu` binder reifies as neutral `App`. **Stuck match:** `NF.Constructors.StuckMatch` is `Neutral(App(λ $scrutinee. body, scrutinee))` (`syntax/term.ts`). **Blocked projection/injection:** `projectValue` / `injectValue` return `Neutral(App(λclosure, base))` when row structure is unknown or head is neutral.

**Modal / flex:** `NF.Patterns.Flex` and zonker-driven `force` interact with neutrals during unification-facing code paths (`evaluation.v2.ts`).

See also: [[application-evaluation.md]], [[nf-value.md]], [[nbe.md]], [[de-bruijn-levels.md]].
