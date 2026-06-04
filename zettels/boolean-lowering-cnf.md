---
tags:
  [verification, sat, mechanism, implemented, backend, ir, reference, project, milestone, lowering, inference, arithmetic, codegen, principle, problem, ffi]
---
# Boolean lowering (CNF)

**Implemented (M1):** `src/verification/solver/cnf.ts` performs Tseitin-style CNF transformation. Theory atoms stay opaque as integer-indexed variables; boolean connectives (And, Or, Not, Implies, Iff) become definitional clause blocks with fresh proxy variables. The proxy for the root formula is asserted. Output feeds directly into the CDCL core ([[cdcl-t-solver]]).

<!-- connections:start -->

## Connections

**Outgoing**
- FOLLOWS → [[quantifier-preparation]] — After quantifier prep
- TRANSLATES_TO → [[vc-ir]] — Formula → clauses
- PRESERVES → [[vc-ir]] — Theory atoms untouched
- ENCODES → [[vc-ir]] — Origin metadata for provenance

**Incoming**
- [[cdcl-t-solver]] ← CONSUMES — CNF clauses
- [[cdcl-t-solver]] ← TRAVERSES — SAT decides boolean skeleton
- [[m1-implementation]] ← IMPLEMENTS — cnf.ts realizes Tseitin pass
- [[solver-trace]] ← DEPENDS_ON — Trace reads atom table + proxy table from Tseitin

<!-- connections:end -->
