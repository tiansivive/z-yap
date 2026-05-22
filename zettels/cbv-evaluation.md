---
tags:
- normalization
- elaboration
- mechanism
- implemented
- inference
- lowering
- runtime
- ir
- dependent
- continuation
- evaluation
- code
- reference
---
# CBV Evaluation

The v2 NbE evaluator is **strict on subterms that it actually evaluates**: `App` evaluates both sides before `reduceAndPushStack`; `Proj` evaluates the base then projects; `Inj` evaluates base and injected value; `Match` evaluates the scrutinee before `matchingAndPushStack`; row extensions in `evalRowPush` evaluate the field **before** the tail (push order yields **right-to-left** completion over extensions); block `Let` evaluates the bound value before the rest of the block (`processStatementsAndPush`).

That ordering is fixed by explicit `Eval` / `Cont` scheduling in `src/elaboration/normalization/evaluation.v2.ts` — the work stack and continuation frames encode call-by-value discipline directly in the evaluator.

Shift/reset (`EB.Shift`, `EB.Reset`) interact with the same work stack: `Reset` pushes a `Delimiter`; `Shift` captures frames up to it into `NF.Closure` `{ type: "Continuation", ... }` and resumes via `reduceAndPushStack` / `apply`.

Do **not** infer host-language (JS) evaluation order from this alone — this describes **`NF.evaluate` over `EB.Term`**.

See also: [[application-evaluation.md]], [[closures.md]], [[nbe.md]].
