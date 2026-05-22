---
tags:
- normalization
- elaboration
- concept
- implemented
- inference
- verification
- dependent
- type-system
- ir
- ast
- monad
- testing
- reference
- mechanism
---
# Normalisation by Evaluation (NbE) (hub)

**Evaluate:** `NF.evaluate(ctx, term, maxSteps?, skolems?)` in `src/elaboration/normalization/evaluation.v2.ts` — stack interpreter (`globalWorkStack`, `globalResultStack`) over `EB.Term` producing `NF.Value`.

**Quote / readback:** `NF.quote(ctx, lvl, val)` in `src/elaboration/normalization/quoting.ts` rebuilds `EB.Term`, converting bound **levels** to **indices** and chasing `ctx.zonker` for metas.

Used throughout inference and checking (`NF.evaluate` / `NF.quote` call sites under `src/elaboration/inference/*`, `check.ts`, `implicits.ts`, etc.). Definitional comparison is distributed: callers evaluate to `NF.Value`, then unification (`src/elaboration/unification/unification.ts`) compares semantic values directly rather than quoting both sides back to `EB.Term` in one shared helper.

Semantic domain basics: closures and neutral-wrapped stuck spines (`syntax/term.ts`); binders introduce `NF.Abs` + `NF.Closure`.

Detail: [[application-evaluation.md]], [[cbv-evaluation.md]], [[closures.md]], [[neutrals.md]], [[nf-value.md]], [[de-bruijn.md]], [[quoting.md]], [[knot-tying.md]], [[type-level-computation]], [[bisimulation-type-equality]].
