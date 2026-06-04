---
tags:
  [
    mechanism,
    elaboration,
    monad,
    ffi,
    tracing,
    inference,
    normalization,
    unification,
    display,
    error-handling,
    infrastructure,
    implemented,
  ]
---
# Elaboration context

`export type Context` in `src/elaboration/shared/context.ts`:

| Field       | Role |
| ----------- | ---- |
| `env`       | Stack of `{ type: [Binder, Origin, NF.Value]; nf; name }` for de Bruijn typing |
| `implicits` | `Array<[EB.Term, NF.Value]>` from `using` — implicit search pool |
| `sigma`     | `Record<string, Sigma>` for `:label` field lookup |
| `zonker`    | `Sub.Subst` — solved meta substitution |
| `metas`     | `Record<number, { meta: EB.Meta; ann: NF.Value }>` registry |
| `imports`   | Top-level names → prior `EB.AST` |
| `ffi`       | Name → `{ arity; compute }` native hooks |
| `trace`     | `P.Stack<Provenance>` for errors |

Constraints are **not** stored on `Context`; they accumulate in the `Elaboration` collector via `V2.tell("constraint", …)`. Meta generation logs through `V2.tell("meta", …)` while `freshMeta` (`shared/supply.ts`) allocates `val`.

APIs: `lookup`, `bind`, `extend`, `resolveImplicit`, etc.

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[elaboration]] — Central context
- INCLUDES → [[implicit-environment]] — Δ in context
- THREADS_THROUGH → [[elaboration-monad]] — Reader component
- THREADS_THROUGH → [[lambda]] — Binder extension
- THREADS_THROUGH → [[pi-types]] — Binder extension
- THREADS_THROUGH → [[match]] — Binder extension

**Incoming**
- [[implicit-environment]] ← THREADS_THROUGH — ctx.implicits
- [[module-system]] ← PRODUCES — Interface tables
- [[sigma-bindings]] ← THREADS_THROUGH — ctx.sigma map
- [[context-operations]] ← ENABLES — Bind, extend, augment, prune
- [[provenance-system]] ← THREADS_THROUGH — ctx.trace stack
- [[repl]] ← THREADS_THROUGH — Persistent ctx
- [[elaboration-monad]] ← THREADS_THROUGH — Reader component
- [[v2-track]] ← THREADS_THROUGH — Extends ctx.trace per step
- [[blocks]] ← INTRODUCES — Local scope via let bindings
- [[ffi]] ← ENCODES — External functions as Var(Foreign)
- [[module-system]] ← THREADS_THROUGH — ctx.imports
- [[elaboration-v2.thread]] ← INCLUDES
- [[standard-closure]] ← RELIES_ON — Captures ctx at binding time
- [[blocks]] ← RELIES_ON — Statement threading extends context
- [[sigma-bindings]] ← RELIES_ON — ctx.sigma is a context component
- [[knot-tying]] ← RELIES_ON — Environment extension for placeholders
- [[length-recursive-debruijn]] ← RELIES_ON — De Bruijn depth management

<!-- connections:end -->
