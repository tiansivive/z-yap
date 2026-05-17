---
tags:
  [
    normalization,
    display,
    mechanism,
    implemented,
    elaboration,
    syntax,
    error-handling,
    testing,
    infrastructure,
    dependent,
    modality,
    recursion,
    inference,
  ]
---
# NF.display

`NF.display(value, ctx, opts?)` is `PP.render(NF.doc(…))` in `src/elaboration/normalization/syntax/pretty.ts`. `ctx` is `EB.DisplayContext`: `Pick<EB.Context, "env" | "zonker" | "metas">` plus optional `resolutions` / `skolems` (`src/elaboration/pretty/pretty.ts`). `opts.deBruijn` toggles level/index suffixes on bound vars.

Meta vars render via `ctx.zonker[val]` when present (`NF.doc` on the zonked value), else `?${val}`. Under binders, closure printing composes zonkers `compose(ctx.zonker, closure.ctx.zonker)` and may extend env with the binder name for Γ display. Closures fall back to `EB.Display.doc(closure.term, extended, opts)` for the stuck term body.
