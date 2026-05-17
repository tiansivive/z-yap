---
tags:
  [
    display,
    elaboration,
    ast,
    syntax,
    normalization,
    testing,
    tooling,
    inference,
    modality,
    continuation,
    codegen,
    infrastructure,
    implemented,
  ]
---
# Pretty printing (`EB.Display`)

`src/elaboration/pretty/pretty.ts` exports `Display`:

- `Display.Term(term, ctx, opts?)` — `PP.render` of `doc(term, ctx, opts)`; drives REPL/tests/snapshots alongside `NF.display`.
- `DisplayContext` — `Pick<EB.Context, "env" | "zonker" | "metas">` plus optional `resolutions`, `skolems` (`V2.MutState["skolems"]`).
- `doc` — `ts-pattern` match on `EB.Term`: literals, vars (Bound / Free / Foreign / Label / Meta with zonker/skolem resolution), `Abs` (λ, Π, Σ, µ), `App`, `Row`, `Proj`, `Inj`, `Match`, `Block`, `Modal`, `Reset`, `Shift`; ends with `.exhaustive()`.
- Also `Constraint`, `Context` (object dump of env), `Env`, `Alternative`, `Pattern`, `Statement`, and `doc` for low-level layout.

Meta vars: `options.verbose` controls `?n` vs `(? n :: ann)`; bound names come from `ctx.env[index]?.name.variable`.
