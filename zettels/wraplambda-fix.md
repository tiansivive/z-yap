---
tags:
  - bugfix
  - implemented
  - elaboration
  - inference
  - normalization
  - compiler
  - type-system
  - dependent
---

# wrapLambda fix

`(\x => \(y: String) -> y) "hello"` crashed with `Cannot read properties of undefined` in `evaluation.v2.ts` when evaluating a bound variable whose index exceeded the environment length.

**Root cause:** `wrapLambda` in `src/elaboration/implicits.ts` wraps elaborated terms in implicit lambda binders to match generalized Pi types. Two bugs combined:

1. **`Rigid(0)` for all levels.** Each implicit binder should be opened with `Rigid(lvl)` where `lvl` is the current de Bruijn level. Using `Rigid(0)` made all binders share the same identity. When a later binder's annotation referenced an earlier one (e.g. `Π(a: Type) => Π(x: a) => ...` where `x`'s annotation is the variable `a`), the wrong rigid was substituted.

2. **Unextended context.** The same `ctx` was passed to every recursive call. Inner binders couldn't resolve references to outer binders because the environment never grew.

**Visibility:** Invisible when all implicit annotations are constants (`Type`, `Row`) — no annotation references a binder variable. Only triggers with dependent annotation chains, which arise from unconstrained implicit generalization (see [[implicit-generalization-semantics]]).

**Fix:** Use `EB.bind(ctx, binding, pi.binder.annotation)` before recursing; use `NF.Constructors.Rigid(lvl)` where `lvl = ctx.env.length`.

**File:** `src/elaboration/implicits.ts`.
