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
