---
tags:
  - verification
  - continuation
  - ivl
  - implemented
  - mechanism
  - implementation
  - code
  - elaboration
---
# Shift/Reset Verification Stub

Dummy pass-through handling so verification no longer throws on shift/reset expressions.

**Reset:** verify the inner term directly, ignoring the delimiter structure. The Reset wrapper is transparent — falls through `check` to `synth`, which recurses into the inner term.

**Shift:** produces `NF.Any` with `Build.true_()` — opaque, verification-neutral. The shift body is not verified.

**NF.Any in subtyping:** `subtype.ts` handles `Any <: T` and `T <: Any` as trivially true (with warning logs), placed before `Lit <: Lit` to avoid `isEqual("Any", "Num") → false`.

**Meta variables in formula translation:** skolem metas from shift sites (`Var(Meta(skolem))`) appear in NF values when refinement predicates are applied to shift-containing expressions. `translate.ts` maps `Meta` variables to `Build.const_("?N", uninterpreted("Any"))` instead of throwing.

**Code:** `src/verification/V2/synth.ts` (Reset + Shift cases), `src/verification/V2/subtype.ts` (Any cases), `src/verification/V2/logic/translate.ts` (Meta variable case).

Superseded eventually by [[shift-reset-verification]] once Bubble semantics lands.
