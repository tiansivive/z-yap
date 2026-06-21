---
tags: [verification, mechanism, implemented, backend, reference, project, unification, ast, ir, sat, ffi, normalization, inference, milestone, arithmetic]
---
# EUF theory

**Concept:** equality with uninterpreted functions — congruence closure over a union-find of terms; axiomatic substrate for industrial SMT solvers such as **Z3** ([[de-moura-bjorner-z3]]).

**Implemented in Yap:** `src/verification/solver/v2/euf/` — hash-consed arena (`intern.ts`), congruence closure (`cc.ts`) with path compression, union-by-rank, merge-driven equality propagation, and registry/active literal separation; integrated with **`v2/quantifier/`** E-matching. Same algorithmic core Z3 exposes as one theory plug-in inside its CDCL(T) loop.

**VC path:** refinement checking builds **IVL** atoms in **`translate.ts`** ([[verification-pipeline]]); this module is **solve-time** EUF over those atoms, not “Z3-only” or “IVL-only” as a mathematical object.

Supporting notes: [`congruence-closure.md`](congruence-closure.md), [`e-matching.md`](e-matching.md), glossary [`smt-solver-glossary.md`](smt-solver-glossary.md).

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[theory-plugin-interface]] — Congruence closure
- ENABLES → [[quantifier-engine]] — Trigger matching
- MIRRORS → [[unification-algorithm]] — Term equality ↔ type equality
- RESOLVES → [[unification]] — Congruence propagation
- WRAPS → [[cdcl-t-solver]] — Hash-consed term arena shared across theories
- TRAVERSES → [[cdcl-t-solver]] — Trigger matching over e-class arena

**Incoming**
- [[quantifier-engine]] ← DELEGATES_TO — E-matching
- [[milestone-2-euf-quant-lia]] ← PRODUCES — EUF module
- [[quantifier-engine]] ← DISPATCHES_ON — Triggers → E-match, none → bounded MBQI
- [[quantifier-engine]] ← USES — E-matching over arena
- [[m2-implementation]] ← IMPLEMENTS — Realizes EUF via CC
- [[m2-implementation]] ← ENCODES — Hash-consed arena representation
- [[solver-trace]] ← EXPOSES — EUFTrace.Step reveals merge/congruence/scan internals
- [[solver-trace]] ← REPORTS — Renders equivalence classes after merges
- [[nelson-oppen]] ← DOCUMENTS — Theory combination behind EUF+LIA cooperation
- [[mbqi]] ← USES — Ground-term enumeration by sort from the arena
- [[euf-congruence-propagation-bug]] ← AFFECTS — EUF decision returned spurious SAT

<!-- connections:end -->
