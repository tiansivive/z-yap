---
tags:
  [
    elaboration,
    deprecated,
    migration,
    inference,
    compiler,
    monad,
    type-system,
    normalization,
    modality,
    project,
    reference,
    syntax,
    parser,
  ]
---
# V1 Elaboration Pipeline (terminology vs this tree)

**V1** names the deprecated fp-ts-centric elaboration style; **V2** names generator-based elaboration on `monad.v2.ts`. The running infer/check cores already use V2.

**Layout in this tree:**

- Canonical elaboration effect: `src/elaboration/shared/monad.v2.ts` — `Elaboration<A>`, `Do`, `track`, `fail`, constraint collection.
- Term inference entry: `src/elaboration/elaborate.ts` — returns `AST = [EB.Term, NF.Value, Q.Usages]` using `V2.Do` + dispatch to `src/elaboration/inference/*`.
- Checking: `src/elaboration/check.ts` — `V2.Do` + `NF` type-shape dispatch.
- Module driver `src/elaboration/module.ts` still wraps elaboration steps in **`fp-ts` `Either` / `pipe`** for statement sequencing and runs **`VerificationServiceV2`** over **IVL** obligations — orthogonal to the inference monad shape.
Inference modules live under `src/elaboration/inference/` (not a separate `inference.v2/` directory); “V1 vs V2” in older prose often means API style, not a second infer tree.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCES → [[eb-term]] — EB.Term output
- NORMALIZES_TO → [[nf-value]] — Types → normal forms
- DISPATCHES_ON → [[src-term]] — Source shape drives dispatch

**Incoming**
- [[v2-elaboration-pipeline]] ← SUPERSEDES — Fresh implementation
- [[v2-elaboration-pipeline]] ← MIRRORS — Same theory, new code
- [[verification-pipeline]] ← VALIDATES — On-demand, not pipeline stage
- [[verification-pipeline]] ← COMPOSES_WITH — Post-hoc validation
- [[mir-lowering]] ← CONSUMES — EB.Term input
- [[module-system]] ← RELIES_ON — Not yet wired to v2
- [[compile-orchestration]] ← DELEGATES_TO — Current delegation
- [[repl]] ← USES — Elaborates
- [[yap-explore]] ← USES — Displays elaboration output
- [[v2-elaboration-pipeline]] ← FOLLOWS — Sequential development
- [[v2-elaboration-pipeline]] ← MIRRORS — Same theory, fresh implementation
- [[elaboration-v2.thread]] ← INCLUDES
- [[v1-test-cleanup]] ← DEPRECATES — Last v1 API test consumers removed

<!-- connections:end -->
