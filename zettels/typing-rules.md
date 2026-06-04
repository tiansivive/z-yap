---
tags:
  [
    concept,
    elaboration,
    type-system,
    reference,
    inference,
    dependent,
    principle,
    drift,
    problem,
    pattern,
    testing,
    incomplete,
  ]
---
# Typing rules (documentation)

Operational typing rules are encoded in implementation and tests rather than a standalone judgement-calculus file. **Inference** dispatches on `Src.Term` in `src/elaboration/elaborate.ts` into handlers under `src/elaboration/inference/`; **checking** matches on `NF.Value` / `EB.Term` shape in `src/elaboration/check.ts`. Meta lifecycle, unification, implicits, and module statement order follow the same code paths.

Tests under `src/elaboration/**/__tests__` and snapshots encode expected elaboration shapes — treat them as the contract alongside the modules above.

<!-- connections:start -->

## Connections

**Outgoing**
- ENCODES → [[yap]] — Formal rules in spec.md
- FORMS → [[pi-types]] — Type-theoretic foundation
- COMPOSES_WITH → [[bidirectional-checking]] — Mode drives rule selection
- DISPATCHES_ON → [[bidirectional-checking]] — Γ ⊢ e ⇐ A vs Γ ⊢ e ⇒ A

**Incoming**
- [[unification-algorithm]] ← IMPLEMENTS — (Conv) rule: assignment → unify
- [[variable-evaluation-dispatch]] ← IMPLEMENTS — (Var) rule: context lookup
- [[application-evaluation]] ← IMPLEMENTS — (App) rule at NF level
- [[sigma-bindings]] ← IMPLEMENTS — Sigma typing (impl ahead of spec)
- [[knot-tying]] ← IMPLEMENTS — Recursive types (Mu) typing (no spec)
- [[occurs-check]] ← DETECTS — Failures producing Mu wrapping
- [[trampoline-evaluator]] ← IMPLEMENTS — Operational semantics via NbE

<!-- connections:end -->
