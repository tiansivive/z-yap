---
tags:
  - bug
  - implemented
  - bugfix
  - elaboration
  - inference
  - normalization
---

# fst closure annotation mismatch

The polymorphic projection `\x y -> x` (type `Π(a: Type) => Π(b: Type) => a -> b -> a`) elaborated with swapped type parameter annotations. The inner closure annotation said `Π(y: x)` — using the value variable `x` as a type — instead of `Π(y: b)`. The outer lambda annotation said `Π(x: b)` instead of `Π(x: a)`.

**Root cause:** `Ann` nodes stored an `NF.Value` (the inferred Pi type) captured at inference time, before `wrapLambda` added implicit binders. The `NF.Value` contained closures that referenced the pre-wrapping context. When displayed or consumed by verification, Rigid level variables resolved against stale environments, producing wrong annotations (`x` instead of `b`, `L2` instead of a named variable) and spurious "Rigid variables do not match" verification failures.

**Fix:** Changed `Ann` to carry an `EB.Term` (a quoted Pi type) instead of an `NF.Value`. The `EB.Term` uses de Bruijn indices, which are context-independent. Consumers (`verification/V2/synth.ts`, `pretty.ts`) now evaluate the `EB.Term` in their current context, getting correct variable resolution.

**Files changed:**
- `src/elaboration/syntax/term.ts` — `Ann.ann` type: `NF.Value` → `Term`
- `src/elaboration/inference/lambda.ts` — quote Pi to `EB.Term` via `NF.quote`
- `src/elaboration/pretty/pretty.ts` — render `ann` as `EB.Term`
- `src/verification/V2/synth.ts` — `NF.evaluate` the `EB.Term` to get `NF.Value`
- `src/elaboration/syntax/traversal.ts` — traverse `ann` as `EB.Term`
- `src/elaboration/shared/metas.ts` — collect metas from `ann` as `EB.Term`
- `src/elaboration/implicits.ts` — instantiate `ann` during meta resolution

**Discovered via:** integration pipeline test snapshot audit (`fst` entry in polymorphism tests).
