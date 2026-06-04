---
adr-id: D-007
tags:
  [
    adr,
    accepted,
    decision,
    strategy,
    compilation,
    compiler,
    aot,
    pipeline,
    principle,
    implemented,
    infrastructure,
    extensibility,
    user-control,
  ]
---
# Compilation strategy — AOT with user-controlled optimisation

**Decision:** Yap is **ahead-of-time compiled**. Every Yap-specific compilation step — parsing, elaboration, GRAM enrichment, MIR emission, codegen — runs once per build. Runtime JIT compilation of user programs is **rejected**. Where a JIT would speculate at runtime, Yap performs the equivalent work AOT as a user-visible, user-controllable pass.

## Scope

Covers the entire Yap-controlled compilation pipeline (`src/cli/explore/pipeline.ts`, `src/compile.ts`). Does **not** cover what target runtimes do internally — V8's tiered JIT for the JS backend, BEAM's HiPE/JIT for the Erlang backend, and platform JITs for C are inherited from the target runtime and remain out of Yap's purview. Does **not** preclude internal JIT-style acceleration of the elaborator's own machinery — see `[[nbe-acceleration]]` for the orthogonal concern of speeding up Yap's compile-time evaluator.

## Rationale

1. **User control over optimisation.** A runtime JIT moves optimisation decisions into an opaque mechanism the user does not write, cannot inspect mid-build, and cannot override per program. Yap's design commits to the inverse: every optimisation pass is a user-visible artefact. `[[programmable-gram-passes]]` (D-005) is the canonical example — the user writes the DPO rewrite rule, the user attaches it to a definition via a modal annotation, the user sees it run in the GRAM pipeline, the user can disable it. AOT with programmable passes maximises flexibility *and* visibility; runtime JIT maximises convenience at the cost of both.

2. **Static types eliminate most of what JITs recover.** The performance gains a tiered JIT extracts on dynamic languages — inline caches for dynamic dispatch, type specialisation for polymorphic call sites, deoptimisation for shape changes — apply to bytecode lacking the static information Yap already has. Monomorphisation, single-shot specialisation, and FFI saturation are all AOT-derivable from Yap's types. The JIT recovery work is unnecessary because the information was never lost.

3. **Backends already JIT where it pays.** The JS backend lowers to source that V8 then JIT-compiles with its own tiered system. The Erlang backend lowers to BEAM bytecode that the BEAM JIT processes. Yap does not need to duplicate these systems — it inherits them by emitting source for backends that already operate on the optimisation tier the application benefits from.

4. **Static partial evaluation is the substitute.** `[[static-partial-evaluation]]` captures the architectural pattern: the work a JIT would do speculatively at runtime, Yap does deterministically at compile time. NbE is the type-level partial evaluator; programmable GRAM passes are the term-level partial evaluator; future per-target specialisation passes extend this to backend-specific concerns. Every layer is user-visible and user-controllable.

5. **No Yap-controlled runtime layer.** Yap emits target source consumed by the target's normal toolchain (`[[aot-compilation]]`). There is no Yap bytecode, no Yap interpreter, no Yap VM. Building any of those is a multi-year commitment that the AOT-plus-programmable-passes path makes unnecessary.

## Consequences

- All Yap-specific optimisation work happens before the program runs and is expressed as passes the user can inspect, modify, or replace. `[[programmable-gram-passes]]` is the architectural commitment to this principle.
- Where JIT *concepts* (speculation, tiered representation, compiled dispatch) have payoff, they are applied to Yap's own internal machinery — specifically the elaborator's NbE — not to user programs. `[[nbe-acceleration]]` documents that design space.
- Target-runtime JIT is part of the codegen contract, not part of Yap's design surface. Backend selection (`js-codegen`, `c-codegen`, `erlang-codegen`) implicitly chooses what runtime optimisation tier the deployed program receives.
- The rejected alternative — a Yap-controlled VM with tiered JIT for user code — is preserved as `[[jit-for-user-programs]]` for the record.

See `[[jit-for-user-programs]]` for the description of the rejected alternative.

<!-- connections:start -->

## Connections

**Outgoing**
- DOCUMENTS → [[aot-compilation]] — The strategy IS AOT
- MOTIVATES → [[static-partial-evaluation]] — The substitute for runtime JIT
- REJECTS → [[jit-for-user-programs]] — Rejected alternative
- RELIES_ON → [[programmable-gram-passes]] — Canonical example of AOT user-control
- DEFERS → [[nbe-acceleration]] — Internal elaborator acceleration deliberately not foreclosed

**Incoming**
- [[aot-compilation]] ← IMPLEMENTS — AOT concept realises the decision
- [[programmable-gram-passes]] ← IMPLEMENTS — Canonical example of AOT user-control
- [[nbe-acceleration]] ← RELIES_ON — AOT scopes JIT-style work to the elaborator, not user programs

<!-- connections:end -->
