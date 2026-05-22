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
- Module driver `src/elaboration/module.ts` still wraps elaboration steps in **`fp-ts` `Either` / `pipe`** for statement sequencing, Z3 (`VerificationServiceV2`), and solver glue — orthogonal to the inference monad shape.

Inference modules live under `src/elaboration/inference/` (not a separate `inference.v2/` directory); “V1 vs V2” in older prose often means API style, not a second infer tree.
