---
tags:
  - paper
  - research
  - reference
  - evaluation
  - normalization
  - compiler
  - infrastructure
  - language
  - mechanism
---
# T-LINQ

Cheney, Lindley, Wadler — *A Practical Theory of Language-Integrated Query* (ICFP 2013, [doi.org/10.1145/2500365.2500586](https://doi.org/10.1145/2500365.2500586)).

The paper presents a typed embedding of database queries in a host language (F#-shaped) where queries are written as host expressions in a deliberately restricted sublanguage. Normalization rewrites these expressions until they reach a residual form guaranteed translatable to SQL by construction. The central result is a normalization theorem: any well-typed query expression in the sublanguage reduces to canonical query form modulo a small set of primitive operations.

## Ideas that transfer to compiler-internal DSLs

**The sublanguage is restricted at the type level, not by parsing.** Users write what looks like ordinary host code; the type system rejects expressions that would not normalize to the residual shape. No separate grammar, no quotation, no macro layer.

**Normalization is the translator.** The host language's existing reduction machinery does the work of producing the target representation. No separate compiler from the embedded DSL is required; primitives that cannot reduce remain stuck and surface as well-formedness errors.

**Stuck terms are the error mechanism.** Anything outside the sublanguage that finds its way into a query expression (host-language side effects, unrestricted recursion, FFI) blocks reduction and is rejected at extraction time. The sublanguage need not be parsed separately because reduction enforces the boundary.

## Mapping to Yap

The pattern grounds [[gram-rule-as-yap-value]]: GRAM rules as Yap struct expressions that normalize via NbE to a DPO-rule residual, with FFI and other non-reducing constructs stuck by construction. The `Rule` type and its component struct types define the sublanguage; the existing NbE machinery is the normalizer; the GRAM Kernel ([[gram-kernel-pass]]) extracts the residual.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[gram-rule-as-yap-value]]

**Incoming**
- [[programmable-gram-passes]] ← GROUNDED_IN — Restricted host sublanguage normalizing to a domain residual
- [[gram-rule-as-yap-value]] ← GROUNDED_IN — Stuck terms as well-formedness boundary
- [[programmable-gram-passes-design.session]] ← PRODUCED

<!-- connections:end -->
