---
tags:
  - reference
  - verification
  - sat
  - project
  - milestone
  - concept
  - solver
  - quantifiers
---
# SMT solver glossary

Abbreviations for the owned-solver roadmap (`docs/SMT-SOLVER.md`).

- **SAT** — the formula admits a satisfying assignment; **UNSAT** — no assignment satisfies all constraints. Search status names for Boolean/CDCL cores; theories inherit the same vocabulary at the checker API.
- **CDCL** — [Conflict-Driven Clause Learning](cdcl-t-solver.md): DPLL variant that learns asserting clauses from conflicts and may backjump non-chronologically.
- **BCP** — [Boolean Constraint Propagation](bcp.md): unit propagation to fixpoint ([watched literals](watched-literals.md) avoid scanning every clause).
- **UIP / 1UIP** — [Unique / First Unique Implication Point](one-uip.md): cut in the implication graph during conflict analysis so the learned clause asserts one literal at the jump level.
- **CNF** — [conjunctive normal form](tseitin-cnf.md); Boolean lowering passes (e.g. [boolean lowering](boolean-lowering-cnf.md)) target CNF clauses over theory atoms.
- **Tseitin** — naming for the proxy-variable linear-size encode; see [Tseitin transform](tseitin-cnf.md).
- **EUF** — [equality with uninterpreted functions](euf-theory.md); reasoning uses [congruence closure](congruence-closure.md) in solver designs.
- **CC** — [congruence closure](congruence-closure.md): data structure enforcing closure of equalities plus congruence over applications.
- **IVL** — Intermediate Verification Language: `IVL` terms/formulas under `src/verification/solver/` (`ivl.ts` with builder/print/adapters). Milestone 1 boundary before the owned CDCL core; see [`milestone-1-ir-boundary.md`](milestone-1-ir-boundary.md).
- **LIA / LRA** — linear integer / linear real arithmetic; encoding today and eventual dedicated theory hooks are summarized in [arithmetic theory](arithmetic-theory.md); roadmap slice in [Milestone 2](milestone-2-euf-quant-lia.md).
- **E-matching** — [trigger-based instantiation](e-matching.md) for guarded quantifiers; complements complete-instantiation discussion in [Ge & de Moura](ge-de-moura-quantifiers.md).
