---
tags:
  - bugfix
  - implemented
  - normalization
  - dependent
  - type-system
  - elaboration
  - closure
  - row-types
---

# Sigma quoting: match over fields produces StuckMatch

When a sigma body contains a match over a field reference (e.g. `match :fst | true -> Num | false -> String`), quoting needs to evaluate the body without a concrete scrutinee. The original implementation applied the closure to the concrete type annotation row, giving the match a type like `Bool` as its scrutinee — no branch matches, so evaluation crashed with "Match: No alternative matched".

The fix applies the closure to a **symbolic NF.Row** of label neutrals (`NF.Neutral(NF.Var({ type: "Label", name }))`). A match over a neutral scrutinee produces a `StuckMatch` — the evaluator's standard mechanism for representing unreducible match expressions. The match stays in the quoted body as `match :fst | true -> Num | false -> String` rather than crashing.

This is the same fix as [[sigma-quoting-field-ref]]: both stem from applying the closure to concrete annotations rather than symbolic neutrals.

`StuckMatch` is the existing NbE mechanism for suspended pattern matches (`src/elaboration/normalization/syntax/term.ts`). The sigma fix merely ensures sigma quoting produces the right inputs for it.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[sigma-types]] — Sigma body quoting
- APPLIES_TO → [[quoting]] — Readback limitation
- RELIES_ON → [[sigma-bindings]] — Sigma binding strategy
- COMPOSES_WITH → [[sigma-quoting-field-ref]] — Same root cause, different manifestation
- GROUNDED_IN → [[sigma-architecture]] — StuckMatch requires symbolic neutrals from the row abstraction
- MIRRORS → [[quoting]] — Symbolic application during readback, analogous to Pi quoting

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES — Sigma body match can't reduce on symbolic binder

<!-- connections:end -->
