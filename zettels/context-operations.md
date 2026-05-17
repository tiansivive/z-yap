---
tags:
  [
    elaboration,
    type-system,
    mechanism,
    inference,
    unification,
    normalization,
    syntax,
    ast,
    ffi,
    infrastructure,
    reference,
    implemented,
  ]
---
# Context operations

`Context` in `src/elaboration/shared/context.ts`: `env`, `implicits`, `sigma`, `zonker`, `metas`, `imports`, `ffi`, `trace` (`P.Stack<Provenance>`).

- `bind(context, binder, annotation, origin?)` — prepends an env entry with `nf: NF.Constructors.Rigid(env.length)` and `type: [binder, origin, annotation]`.
- `extend(context, binder, value, origin?)` — prepends with `nf: value`; the annotation slot in `type` is still a placeholder (`Error` cast) pending typed metas.
- `augment` — same shape as `bind` but appends to `env` (default `origin: "inserted"`).
- `unfoldMu` — prepends an entry whose `nf` is the annotation directly (µ / recursive-let env shape).
- `muContext` — maps `Let` binders in `env` to `Mu` in-place.
- `prune(ctx, lvl)` — `env` becomes `takeRight(lvl)`.
- `extendSigma(ctx, variable, sigma, isAnnotation?)` — `set` on `ctx.sigma[variable]`.
- `extendSigmaEnv(ctx, row)` — folds an `NF.Row` of extensions into `sigma` (placeholder `term`/`ann` fields in the collected map).
- `lookup(variable, ctx)` — if `Src.Variable` is `{ type: "label" }`, reads `ctx.sigma[variable.value]` and returns `[EB.Var Label, nf, usages]`; otherwise walks `env` for bound names, then `imports`. `resolveImplicit` tries `ctx.implicits` with `U.unify`.

Re-exported as `EB.Context` via `src/elaboration/index.ts`.
