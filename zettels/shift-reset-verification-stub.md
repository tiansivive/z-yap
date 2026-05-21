---
tags:
  - verification
  - continuation
  - ivl
  - planned
  - ready
  - mechanism
  - implementation
---
# Shift/Reset Verification Stub

Dummy pass-through handling so verification no longer throws on shift/reset expressions.

**Reset:** verify the inner term directly, ignoring the delimiter structure. The Reset wrapper is transparent — `check(Reset(body), ty)` delegates to `check(body, ty)`.

**Shift:** produce an opaque, verification-neutral value. The shift expression synthesizes its inferred type but contributes `Build.true_()` as its verification condition — always satisfiable, zero proof obligation. The shift body is not verified.

This unblocks verification for programs that contain shift/reset without requiring the full Bubble semantics or nondeterministic formula expansion. Programs with shifts will verify, but the shift-specific properties (continuation safety, answer-type preservation) are not checked.

**Code impact:** `src/verification/V2/synth.ts` (Shift case → type + true), `src/verification/V2/check.ts` (Reset case → verify inner term). Currently both throw "unsupported" (`src/verification/V2/logic/translate.ts`).

Superseded eventually by [[shift-reset-verification]] once Bubble semantics lands.
