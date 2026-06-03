---
adr-id: D-004
amended-by: [adr:D-006]
reframed-by: [adr:D-006]
tags:
  [
    adr,
    accepted,
    amended,
    reframed,
    decision,
    continuation,
    lowering,
    mir,
    codegen,
    compiler,
    backend,
    effect,
    runtime,
    implemented,
    principle,
  ]
---
# Direct-style lowering for delimited control

**Decision:** Delimited control (`Shift`/`Reset`) lowers to a **direct-style block-and-jump state machine** built from `Alloc`/`Read`/`Jump`/`Branch` MIR primitives. There is no global continuation-passing-style transform — neither whole-program nor selective.

**Amended and reframed by [[gram-canonical-ir.adr]] (D-006):** the direct-style shape remains the decision, but the canonical implementation site moved from `src/lowering/continuations/` to `src/GRAM/bridge/continuations.ts`, and the surrounding pipeline now flows `EB.Term → GRAM → MIR → codegen` rather than `EB.Term → MIR`. The current implementation is documented in [[shift-reset-bridge-lowering]]; the legacy site is preserved in [[shift-reset-mir-lowering]] for reference.

## Scope

`src/lowering/continuations/` (`reset.ts`, `shift.ts`, `kcall.ts`) materialise the state machine. `Reset.lower` installs delimiter + return-continuation frames; `Shift.lower` captures the worklist suffix, allocates `k_ref`, opens a shared resume block; `KCall.lower` lowers each `App(k, arg)` to a numeric index plus `Jump`. Multishot resume emits `Terminator.Branch(idx, cases)`. Closure conversion (`src/lowering/functions/`) follows separately. Answer-type metavariable behaviour stays consistent in `src/elaboration/inference/reset.ts` / `shift.ts`.

> Post D-006: the scope above describes the legacy site. The canonical site is `src/GRAM/bridge/continuations.ts`, reached via `GRAM.Bridge.emit`. The shape — `Alloc`/`Read`/`Jump`/`Branch`, multishot via `Branch`, no first-class continuation value — is unchanged.

## Rationale

1. **No administrative-CPS noise** — a global CPS transform pushes continuation arguments through every call site even when they carry no information. The blocks-and-jumps shape keeps the IR shape close to the surface program for non-effectful regions.
2. **Stack-shaped resume by construction** — the state machine reads the continuation as `Read k_ref` + `Jump rLabel`; there is no need for a dedicated `resume` opcode or first-class continuation runtime value.
3. **Multishot via `Branch`** — multishot completion uses the existing branch terminator over per-resume blocks; no separate machinery, no closure allocation per resume.
4. **Single MIR vocabulary** — `Alloc`/`Read`/`Jump`/`Branch` is the same primitive set used by other passes (closure conversion, pattern compilation). A CPS-based lowering would introduce a parallel control discipline.
5. **Verification consistency** — answer-type inference and the bubble representation ([[bubble-semantics]]) operate on the direct-style shape; CPS would push that boundary downstream.

## Consequences

- A selective-CPS backend remains theoretically reachable for targets requiring uniform tail structure; it would have to keep answer-type metavariable behaviour consistent with the direct-style path. See [[selective-cps]] for the description of that rejected alternative.
- Shift-reset MIR semantics are documented in [[shift-reset-mir-lowering]]; the [[delimited-continuations.thread]] tracks ongoing work in this area.
- The bubble representation ([[bubble-semantics]]) describes the EB-level handling that feeds this lowering.
