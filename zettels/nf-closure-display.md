---
tags:
  - backlog
  - improvement
  - normalization
  - display
  - elaboration
  - compiler
  - explorer
---

# NF closure display

Normalized forms display closures as `(closure: x -| Γ: x)` because NbE values store lambda/Pi bodies as `Closure { ctx, term }` — the deferred body plus its capture environment. `NF.display` in `src/elaboration/normalization/syntax/pretty.ts` renders this structure via `PP.closure()`, showing both the unevaluated body and the `Γ` captures.

This is correct and intentional: the NF tab shows the internal NbE representation, distinct from the elaborated/quoted display. The capture environment is valuable for debugging closures, unification, and generalization.

A config toggle (e.g. `closureContext: "show" | "hide"`) could suppress the `Γ: ...` suffix for users who want cleaner output without switching to the quoted view (`deBruijn: "both"` already re-quotes via `NF.quote → EB.Display.Term`).
