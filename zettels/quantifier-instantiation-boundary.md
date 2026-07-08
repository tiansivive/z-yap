---
tags:
  - verification
  - quantifiers
  - mbqi
  - instantiation
  - liquid
  - validity
  - fragment
  - solver
  - sat
  - limitation
  - principle
  - reference
---
# Quantifier instantiation boundary

Full quantified SMT solving needs machinery that Yap's current solver only approximates: model-based instantiation, trigger heuristics, fresh-atom abstraction extension, and sometimes fragment-specific completeness arguments.

Yap's Liquid verification path has a narrower contract. Guarded `forall` nodes produced by VC generation primarily encode binders and assumptions from the typing judgment. Validity discharge consumes that structure before the raw solver sees the leaf query. The raw solver therefore does not need full MBQI just to recurse through nested Liquid binders.

The general SMT zettels remain relevant for formulas that escape the Liquid fragment: user-facing axioms, future richer theories, explicit quantified specifications, or backend tests that intentionally exercise quantified SMT. In those cases, bounded MBQI and incremental abstraction extension are real completeness concerns.

For ordinary refinement checking, the priority boundary is:

1. Preserve the Liquid VC generation invariant.
2. Discharge guarded validity structure before SAT.
3. Keep the CDCL(T) backend strong for quantifier-free EUF and linear arithmetic.
4. Treat full quantified SMT improvements as backend generality, not the proof mechanism for nested Liquid VCs.

<!-- connections:start -->

## Connections

**Outgoing**
- CLARIFIES → [[mbqi]] — Bounded MBQI is general SMT fallback, not the Liquid VC proof path
- CLARIFIES → [[incremental-abstraction-extension]] — Fresh-atom extension is general quantified-SMT completeness work
- CLARIFIES → [[quantifier-engine]] — Quantified formulas that reach raw SAT still use instantiation
- GROUNDED_IN → [[ge-de-moura-quantifiers]] — General quantified SMT background

**Incoming**
- [[vc-validity-discharge.session]] ← PRODUCED — General SMT vs Liquid-fragment boundary
- [[verification-backend.thread]] ← INCLUDES — General SMT vs Liquid fragment boundary
- [[record-refinement-false-valid.bug]] ← EXTENDS — Instance of the MBQI residual gap on guarded refinement obligations

<!-- connections:end -->
