---
tags:
  - elaboration
  - type-system
  - modality
  - dependent
  - research
  - paper
  - reference
  - principle
  - quantifiers
  - monad
  - in-progress
  - inference
---
# McBride — “I Got Plenty o’ Nuttin’” (2016)

**Citation:** Conor McBride. *I Got Plenty o’ Nuttin’.* In *A List of Successes That Can Change the World: Essays Dedicated to Philip Wadler on the Occasion of His 60th Birthday* (LNCS 9600), Springer, 2016, pp. 207–233.  
**DOI:** [10.1007/978-3-319-30936-1_12](https://doi.org/10.1007/978-3-319-30936-1_12)

Semiring-tracked usage (“rig” semantics): zero usage marks data present for typing but not consumed at runtime; combines dependent quantification with linear-style quantity discipline (dependent “lollipop” and related constructions).

**Yap:** Surface/elaboration track usage via `src/shared/modalities/multiplicity.ts` (`Zero`, `One`, `Many`, semiring `SR`) threaded through contexts (`src/elaboration/shared/context.ts` `Sigma.multiplicity`), checking (`src/elaboration/check.ts` returns `Q.Usages`), and normalization (`evaluation.v2.ts`). Modal types combine quantity with liquid slices in pretty-printing (`src/elaboration/pretty/pretty.ts`). Alignment with McBride’s full theory is partial: the V2 monad (`src/elaboration/shared/monad.v2.ts`) is the active elaboration path; usage tuples and modality behavior continue to evolve toward fuller QTT alignment.

**Status:** `in-progress` (multiplicity machinery exists; full QTT alignment is evolving).

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[meta-variables]] — Contextual metavariables
- INFORMS → [[zonking]] — Postponed substitution

<!-- connections:end -->
