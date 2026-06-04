---
tags:
  [
    rejected,
    speculative,
    decision,
    compilation,
    jit,
    aot,
    strategy,
    compiler,
    runtime,
    vm,
    alternative,
    reference,
  ]
---
# JIT for user programs (rejected alternative)

The rejected alternative to `[[compilation-strategy.adr]]` (D-007). Describes the design Yap declined.

**The option:** A Yap-controlled virtual machine executes user programs at runtime. The VM consumes a Yap-defined bytecode produced by the compiler in place of (or alongside) the current target-source emission. The VM includes a tiered just-in-time compiler that observes runtime behaviour — hot call sites, stable receiver types, taken branch frequencies — and recompiles selected functions to optimised native code. Profile-feedback recompilation, on-stack replacement for stuck optimisations, runtime type specialisation, inline caches for polymorphic dispatch, and deoptimisation paths for invalidated assumptions are all part of the package.

**The promise:** A tiered JIT is the well-trodden path for languages with significant runtime variability that compile-time analysis cannot eliminate. V8's TurboFan, the JVM's HotSpot, LuaJIT, the BEAM JIT, and PyPy all demonstrate substantial runtime speed-ups over interpreter or single-tier compilation by reacting to actual execution profiles. A Yap-controlled JIT could in principle deliver similar gains while keeping the entire runtime stack inside the language project's control.

**Why rejected:**

- **The information being recovered is not lost.** A JIT's principal optimisation work — type specialisation, monomorphisation, inline caches, dispatch elimination — exists to recover information that dynamic languages discard at compile time. Yap's static type theory does not discard that information. The optimisation budget a JIT would spend recovering types is wasted because the types are already known.
- **Opaque optimisation breaks the user-control commitment.** A JIT decides at runtime which functions to optimise, with what assumptions, and when to deoptimise. The user does not write the heuristics, does not see the compilation events without specialised tooling, and cannot override per-program decisions. This contradicts the principle that every optimisation in Yap is a user-visible, user-controllable artefact — the principle that motivates `[[programmable-gram-passes]]` and the AOT decision overall.
- **Backends already JIT where it pays.** The JS backend emits source for V8, which has a mature tiered JIT. The Erlang backend emits BEAM modules processed by the BEAM JIT. The runtime tier Yap would build duplicates work the target runtime already does.
- **The cost is multi-year and structurally limiting.** Building a competitive tiered JIT is a sustained investment that reshapes the language project around runtime concerns — bytecode versioning, JIT compiler maintenance, deoptimisation correctness, OSR safety, GC integration. The AOT-plus-programmable-passes path makes that investment unnecessary while delivering the optimisations that actually pay for Yap's design.
- **No demand from the type system.** Dependent typing, structural types, refinements, and modalities all produce *more* compile-time information, not less. The combination of NbE, programmable GRAM passes, and static specialisation (`[[static-partial-evaluation]]`) covers the optimisation space that matters without needing runtime feedback.

**Where JIT ideas still apply.** The rejection is about *user programs at runtime*. JIT concepts — speculation, tiered representation, compiled interpreter dispatch — remain potentially useful for accelerating the *elaborator's own* compile-time evaluator. That distinct concern is recorded in `[[nbe-acceleration]]` and contrasts directly with this rejection: the same techniques, applied to a different layer of the stack, are in scope.

This zettel is the standard ADR companion shape — it describes the rejected design without advocating for it. The positive decision is `[[compilation-strategy.adr]]`.

<!-- connections:start -->

## Connections

**Outgoing**
- CONTRASTS_WITH → [[static-partial-evaluation]] — Runtime-JIT vs compile-time-PE substitution

**Incoming**
- [[compilation-strategy.adr]] ← REJECTS — Rejected alternative
- [[nbe-acceleration]] ← CONTRASTS_WITH — JIT for the elaborator is in scope; JIT for user code is not

<!-- connections:end -->
