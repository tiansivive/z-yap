---
tags:
  [
    tracing,
    display,
    error-handling,
    elaboration,
    mechanism,
    implemented,
    normalization,
    unification,
    syntax,
    ast,
    infrastructure,
    dependent,
  ]
---
# Provenance Display

`P.display` in `src/elaboration/shared/provenance.ts` turns `Provenance[]` into a user-facing trace string.

- Reverses the stack so **newest entries appear first**, then joins segments.
- Default `opts.cap` is **10** (`slice` after mapping); callers may override (`Err` display uses `{ cap: 100 }` from `src/elaboration/shared/monad.v2.ts`).
- **Source-backed** provenance (`tag: "src"`) prints `location.from.line` and `location.from.column` from the Nearley AST node.
- **Metadata** branches add prefixes: `checking` → “While checking … against …”; `infer` → “While inferring …”; `unification` → “While unifying …”; `alternative` → alternative + motive + NF type.
- Pretty-printing uses `NF.display`, `EB.Display.Term`, `Src.display`, `Src.Stmt.display`, `Src.Alt.display` depending on provenance tag.
- Tags without a handled `metadata.action` fall through to `"Provenance [display]: Not implemented yet:"` plus JSON.
