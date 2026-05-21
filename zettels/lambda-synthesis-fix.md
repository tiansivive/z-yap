---
tags:
  - verification
  - type-system
  - dependent
  - implementation
  - implemented
  - code
  - normalization
  - elaboration
  - checking
  - inference
  - ivl
  - solver
  - bugfix
  - mechanism
refs:
  src:
    - src/verification/V2/synth.ts
  related:
    - src/verification/V2/check.ts
    - src/verification/V2/subtype.ts
    - src/verification/solver/ivl/build.ts
---
# Lambda synthesis fix

Bug fix in `synth.ts`: the `EB.CtorPatterns.Lambda` branch was constructing a Pi type whose return closure captured the Lambda's *term body* instead of the *synthesized type of the body*. This produced a value-dependent Pi type `(x: Num) -> x` instead of the correct refinement-dependent Pi type `(x: Num) -> {Num | v = x}`.

**Symptom**: `(\x -> x) 42` generated the IVL formula `(and (= x x) (forall ((x Real)) (=> (= x 42) false)))` — the `forall` clause contained `false` because the application rule yielded an existential whose body was the value `42` (not the type `Num`), and subtyping `42 <: Num` in the refinement position produced `Build.false_()`.

**Root cause**: `NF.Constructors.Closure(ctx, tm.body)` used the raw term body as the Pi return. The fix captures `bodyType` (the synthesized type of the body), quotes it back to a core term via `NF.quote(ctx, ctx.env.length + 1, bodyType)`, and uses that quoted term in the closure: `NF.Constructors.Closure(ctx, bodyTypeQuoted)`.

**Effect on VCs**: With the fix, subtyping `{Num | v = x} <: {Num | v = x}` produces `Build.implies((= x 42), (= x x))` which is `True` under the guard, so the entire `forall` simplifies away, leaving `(= x x)`.
