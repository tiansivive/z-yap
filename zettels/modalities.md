---
tags:
  [
    type-system,
    elaboration,
    inference,
    normalization,
    verification,
    syntax,
    modality,
    multiplicity,
    dependent,
    concept,
    pattern,
    incomplete,
    project,
  ]
---
# Modalities (multiplicity + liquid)

Surface syntax parses usage qualifiers (`<0>`, `<1>`, `<*>`) together with optional liquid refinements; see `src/parser/__tests__/usages.test.ts`.

Elaborated core syntax stores them as `EB.Term` nodes `{ type: "Modal", term, modalities }` where `modalities: Modal.Annotations<EB.Term>` is `{ quantity: Q.Multiplicity; liquid: EB.Term }` from `src/verification/modalities/shared.ts` (`src/elaboration/syntax/term.ts`).

Normal-form types mirror that shape as `NF.Value` `{ type: "Modal", value, modalities }` with `Modal.Annotations<NF.Value>` (`src/elaboration/normalization/syntax/term.ts`).

Multiplicities are the semiring `{ Zero, One, Many }` in `src/shared/modalities/multiplicity.ts` (`Q.SR`, `Q.display`, vector ops `add` / `multiply`).

Inference returns `[EB.Term, NF.Value, Q.Usages]` (`src/elaboration/elaborate.ts`), but `infer` applies `stripModalities` to the synthesized type so modal wrappers do not remain on inferred types; the comment there states modality verification is intended as a separate concern (`stripModalities` in `src/elaboration/elaborate.ts`).

`EB.Modal.infer` (`src/elaboration/inference/modal.ts`) checks liquid predicates with `EB.Liquid.typecheck` / `Liquid.Predicate.Neutral` and attaches `EB.Constructors.Modal`.

Elaboration constraint solving (`src/elaboration/solver/solver.ts`) only handles `assign` and `resolve`; a `usage` constraint variant exists only commented out. Corresponding `V2.tell("constraint", { type: "usage", … })` call sites in `check.ts`, `lambda.ts`, `statements.ts`, `block.ts` are commented.

Variable lookup returns usage vectors of zeros for bound variables and leaves multiplicity on sigma entries unresolved (`QUESTION` in `src/elaboration/shared/context.ts` lookup).

Verification consumes `quantity` when extracting modal annotations (`extractModalities`, modal subtyping in `src/verification/V2/subtype.ts`) but does not implement multiplicity checking end-to-end (`src/verification/ARCHITECTURE.md`, QTT Multiplicities).
