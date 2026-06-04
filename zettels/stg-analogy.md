---
tags:
- concept
- compiler
- graph
- ir
- lowering
- reference
- pattern
- mir
---

# STG analogy

GHC's pipeline: Core -> STG -> Cmm -> native. Yap's GRAM pipeline mirrors this layering:

**Core -> STG = EB.Term -> GRAM translation.** STG is the last representation where constructs are semantic (case expressions, let bindings, lambda abstractions). Similarly, GRAM translation produces a semantic graph: `match`/`case`/`pat:*` nodes describe *what* a pattern match is, `lambda`/`app` describe *what* a function call is. No operational decisions yet.

**STG -> Cmm = GRAM passes.** Cmm is where GHC compiles case into jump tables/comparison chains, closures into heap objects with info tables, and forces evaluation via `enter`. Similarly, GRAM passes compile patterns into decision trees, annotate closures with environments, and surface continuation structure. The difference: Cmm is a single fixed IR; GRAM layers multiple views additively.

**Key divergence:** STG -> Cmm is a single monolithic translation (one pass produces all of Cmm). GRAM separates into composable passes (pattern compilation, closure conversion, shift-reset enrichment) that can be selectively applied. This enables compilation-by-selection.

**What GRAM preserves that STG doesn't:** In GHC, Core is discarded after STG generation. In GRAM, the semantic structure (the "STG level") persists alongside the operational structure (the "Cmm level"). Both views coexist in the same graph.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[gram]] — Pipeline layering inspiration
- DISTINGUISHES → [[gram-pattern-translation]] — Translation = STG-level (semantic)
- DISTINGUISHES → [[gram-pattern-pass]] — Pass = Cmm-level (operational)
- CONTRASTS_WITH → [[mir-lowering]] — Monolithic (STG->Cmm) vs composable (GRAM passes)
- INSPIRES → [[compilation-by-selection]] — Selective = improvement over GHC's fused approach
- INFORMS → [[gram-crud-enrichment]] — STG case = semantic; operational compiled later

<!-- connections:end -->
