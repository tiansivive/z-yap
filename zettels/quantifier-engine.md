---
tags:
  [verification, quantifiers, instantiation, mbqi, mechanism, implemented, backend, sat, reference, project, milestone, ffi, arithmetic, inference, ast, ir, tracing, pattern]
---
# Quantifier engine

**Implemented (M2):** `src/verification/solver/quantifiers/` contains trigger extraction (`triggers.ts`), E-matching against the EUF arena (`ematch.ts`), and per-round instantiation (`solver.ts`). Each round walks active quantifiers, matches triggers against ground terms in the congruence closure, produces substitutions, and asserts ground lemma instances as CNF clauses into the SAT core. Complementary atom encoding handles negated atoms not directly in the atom table.

**Two-stage dispatch:** E-matching runs first (syntactic, fast); when a round produces no new lemmas, bounded [[mbqi]] enumerates ground terms by sort as the fallback (`mbqi.ts`) — covering quantifiers without usable triggers, such as pure arithmetic bodies. Formulas with no propositional part bypass CNF/CDCL entirely and run MBQI rounds directly.

**VC generation:** guarded quantifiers in `check`/`subtype` use **`translation.quantify`** → **IVL** **`Build.forall` / `Build.implies`** (`translate.ts`). The **instantiation engine** here is the M2 match to industrial trigger-based QI ([[ge-de-moura-quantifiers]]).

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[theory-plugin-interface]] — Instantiation
- DELEGATES_TO → [[euf-theory]] — E-matching
- IMPLEMENTS → [[refinement-types]] — Guarded universal quantification
- DISPATCHES_ON → [[euf-theory]] — Triggers → E-match, none → bounded MBQI
- INSTANTIATES → [[cdcl-t-solver]] — Ground substitutions asserted
- USES → [[euf-theory]] — E-matching over arena
- INCLUDES → [[mbqi]] — MBQI is the second stage of the instantiation engine
- FALLS_BACK_TO → [[mbqi]] — Engaged when an E-matching round produces no lemmas

**Incoming**
- [[euf-theory]] ← ENABLES — Trigger matching
- [[higher-order-in-formulas]] ← CONSTRAINS — No HO quantification
- [[ge-de-moura-quantifiers]] ← INFORMS — Complete instantiation
- [[m2-implementation]] ← IMPLEMENTS — Realizes quantifier instantiation
- [[m2-implementation]] ← DELEGATES_TO — Solver delegates rounds to quantifier loop
- [[solver-trace]] ← EXPOSES — Quantifier round events visible in trace
- [[complementary-atom-encoding]] ← APPLIES_TO — Specific to quantifiers
- [[solver-v2-monadic-port.implementation]] ← IMPLEMENTS — v2 E-matching and MBQI port

<!-- connections:end -->
