---
tags:
- elaboration
- inference
- unification
- normalization
- type-system
- mechanism
- concept
- ast
- compiler
- code
- substitution
- dependent
- metavariable
- reference
- implemented
status: implemented
---
# Meta-variables

Representation: `EB.Meta` `{ type: "Meta"; val: number; lvl: number }`. Allocation: `freshMeta` / `EB.freshMeta` (`src/elaboration/shared/supply.ts`) bumps monotonic `counts.meta`, registers `{ meta, ann }` under `V2.tell("meta", …)` consumed into `ctx.metas`.

Elaborated occurrence: `EB.Var(meta)`. Normal form flex: `NF.Var({ type: "Meta", … })`.

Solved values live in `ctx.zonker: Subst` (`src/elaboration/shared/context.ts`), mapping meta id → `NF.Value`. `collectMetasNF` / `collectMetasEB` (`shared/metas.ts`) traverse terms skipping zonked metas.

Implicit holes: implicit `Pi` synthesis introduces metas and `resolve` constraints (`implicits.ts`).

Let-bound metas generalize only when `lvl >= ctx.env.length` (`generalization.ts`).

Instantiation passes: `NF.instantiate` / `EB.Icit.instantiate` (`generalization.ts`, `implicits.ts`) fill or preserve metas depending on zonker, scope level, and annotations.

Verification holes: `check.ts` `{ type: "hole" }` also allocates type-level metas.

Hubs tie facets: elaboration constraints (`solver.ts`), normalization (`NF.force`, `NF.quote`), verification (separate pipeline).
