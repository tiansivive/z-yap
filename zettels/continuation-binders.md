---
tags:
  [
    continuation,
    elaboration,
    inference,
    mechanism,
    implemented,
    ast,
    monad,
    type-system,
    normalization,
    testing,
    codegen,
    lowering,
    reference,
    display,
    rewriting,
    unification,
    effect,
    backend,
    code,
  ]
---
# Continuation Binders

In `src/elaboration/inference/shift.ts`, `shift` introduces continuation variable `$k` by:

1. Fresh flex meta `A` (`NF.Constructors.Flex(ma)`).
2. Fresh meta `skolem` at type `A`, used as the placeholder result `out = Var(skolem)` of the shift expression.
3. `kTy = Pi("$k", Explicit, A, closeVal(ctx, answer.initial))`.
4. `V2.local(ctx => EB.bind(ctx, { type: "Continuation", variable: "$k", resumption: { meta: skolem } }, kTy), EB.check(shift.term, answer.final))`.

`resume` (`same file`) finds the innermost env entry with `name.type === "Continuation"`, checks the payload against `kty.binder.annotation`, evaluates it, updates `nondeterminism.solution[binder.resumption.meta.val]`, and builds `App(Var(Bound idx), arg)`.

After checking the shift body, inference stores `yield* V2.modifySt(set(\`skolems.${skolem.val}\`, tm))` where `tm` is the composed `Shift` term. `NF.generalize` excludes metas satisfying `skolems[m.val]` from the quantification candidate list (`src/elaboration/normalization/generalization.ts`, `allMetas` filter).

In lowering (`src/lowering/lower.ts`), `App(Var(Bound i), arg)` routes to `Continuation.KCall.lower` when `shiftBodyCtx` is active and `ctx.bound.get(i)?.stamp === shiftBodyCtx.kRef.stamp` (stamp equality ties aliases like `let k2 = k` to the same continuation ref).
