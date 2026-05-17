---
tags:
- normalization
- mechanism
- implemented
- recursion
- elaboration
- inference
- dependent
- runtime
- ir
- ast
- error-handling
- performance
- reference
---
# Knot-Tying (Recursive Evaluation)

**Imported recursion (`EB.Var` free):** For `{ type: "Var", variable: { type: "Free" } }`, `evaluateTerm` builds `entry` at `ctx.env.length` with placeholder `nf: NF.Var(Bound lvl)`, extends `ctx.env`, pushes a **`Cont`** that assigns `entry.nf = result`, then evaluates `imports[name][0]` in the extended context (`evaluation.v2.ts`). The placeholder cell is mutated once the body’s NF is known.

**Block `Let`:** same pattern — `entry.nf` starts as **`NF.Var({ type: "Bound", lvl: ctx.env.length })`** (no `Neutral` wrapper yet), continuation assigns the evaluated value before continuing statements (`processStatementsAndPush`).

**µ bindings:** reading `Bound` where the env binder is **`Mu`** returns **`Neutral(entry.nf)`** instead of the plain `nf`, blocking unfolding during normalization (`evaluateTerm` bound-var branch).

See also: [[closures.md]], [[cbv-evaluation.md]], [[nf-value.md]], [[application-evaluation.md]].
