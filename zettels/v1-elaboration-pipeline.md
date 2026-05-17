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

Project docs (`AGENTS.md`, `.github/copilot-instructions.md`) describe **V1** as deprecated fp-ts-centric elaboration and **V2** as generator-based elaboration in `inference.v2/` / `checking.v2/`.

**Verified in this checkout:**

- Canonical elaboration effect: `src/elaboration/shared/monad.v2.ts` — `Elaboration<A>`, `Do`, `track`, `fail`, constraint collection.
- Term inference entry: `src/elaboration/elaborate.ts` — returns `AST = [EB.Term, NF.Value, Q.Usages]` using `V2.Do` + dispatch to `src/elaboration/inference/*`.
- Checking: `src/elaboration/check.ts` — `V2.Do` + `NF` type-shape dispatch.
- Module driver `src/elaboration/module.ts` still wraps elaboration steps in **`fp-ts` `Either` / `pipe`** for statement sequencing, Z3 (`VerificationServiceV2`), and solver glue — orthogonal to the inference monad shape.

There is **no** separate `src/elaboration/inference.v2/` tree here; “V1 vs V2” in prose often means historical API style, while the running pipeline is already `monad.v2`-based for infer/check cores.
