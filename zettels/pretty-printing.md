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

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[nf-value]] — Renders normal forms
- REPORTS → [[elaboration]] — Human-readable output
- USES → [[quoting]] — NF → EB → render
- USES → [[zonking]] — Resolves metas before display

**Incoming**
- [[error-causes]] ← USES — Zonked NF in error messages
- [[provenance-display]] ← USES — Term display
- [[snapshot-testing]] ← SNAPSHOTS — Inline snapshots
- [[quoting]] ← ENABLES — NF values → readable terms
- [[yap-explore]] ← USES — Term rendering
- [[solver-trace]] ← USES — prettier-printer for structured output
- [[generalized-body-display-offset.bug]] ← APPLIES_TO — Display renders type-incorrect names for outer let references

<!-- connections:end -->
