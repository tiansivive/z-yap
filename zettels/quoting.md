---
tags:
  [
    normalization,
    elaboration,
    mechanism,
    implemented,
    ast,
    ir,
    dependent,
    row-types,
    modality,
    continuation,
    recursion,
    inference,
    unification,
  ]
---
# Quoting

`NF.quote(ctx, lvl, val)` (`src/elaboration/normalization/quoting.ts`) maps `NF.Value` to `EB.Term`. Bound levels map to De Bruijn indices with `lvl - v.lvl - 1`. Metas recurse through `ctx.zonker` when set, else stay as `EB.Constructors.Var`. `Neutral` delegates to its head. `Lambda` / `Pi` / `Mu` apply the closure with `NF.Constructors.Rigid(lvl)` and quote at `lvl + 1`; `Sigma` applies with `binder.annotation` (no level bump per comment—sigma body lives in extended row context).

Rows, `App`, `Modal`, `External`, `Reset`, and `Shift` have direct clauses. `NF.Patterns.StuckMatch` rebuilds `EB.Match` from the closure’s scrutinee term (FIXME in source). Unsupported shapes throw including `NF.display(nf, ctx)` in the message.
