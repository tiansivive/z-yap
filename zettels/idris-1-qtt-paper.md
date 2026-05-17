---
tags:
  [
    modality,
    type-system,
    elaboration,
    dependent,
    syntax,
    parser,
    mechanism,
    research,
    paper,
    reference,
    implemented,
    language,
    concept,
  ]
---
# Brady — Quantitative Type Theory in Idris 2

[Idris 2: Quantitative Type Theory in Practice](https://doi.org/10.4230/LIPIcs.ECOOP.2021.9). Edwin Brady. ECOOP 2021 (LIPIcs 194).

Describes Idris 2’s core: Quantitative Type Theory tags hypotheses with usage quantities (semiring of grades), enabling compile-time reasoning about erasure, linearity-flavored APIs, and related program transformations while retaining dependent typing.

Yap tracks binding/use disciplines through `src/shared/modalities/multiplicity.ts` (`Zero` / `One` / `Many` with semiring `SR`), threaded across parsing (`src/parser/grammar.ne`, `src/parser/processors.ts`), elaboration contexts (`src/elaboration/shared/context.ts`), checking (`src/elaboration/check.ts`), and normalization/evaluation warnings around modal applications (`src/elaboration/normalization/evaluation.v2.ts`). That is the same design neighborhood as Brady’s implementation story; the foundational calculus is Robert Atkey’s QTT (LICS 2018), cited inside Brady’s paper rather than duplicated here.
