---
tags:
  [
    concept,
    reference,
    partial-evaluation,
    compilation,
    nbe,
    gram,
    strategy,
    optimization,
    aot,
    principle,
    monomorphisation,
    specialisation,
    user-control,
  ]
---
# Static partial evaluation

Yap's substitute for runtime JIT speculation. Every optimisation a tiered JIT would perform speculatively at runtime, Yap performs deterministically at compile time and exposes as a user-visible pass.

The architectural pattern has three layers, each user-inspectable:

- **Type-level partial evaluation — NbE.** The elaborator's `NF.evaluate` is a partial evaluator over `EB.Term` specialised to the type-checking workload: it reduces what it can, leaves stuck what it cannot, and produces normal forms that drive unification. Where a JIT would record a type-stable call site and specialise dynamically, Yap reduces the type-level computation upfront. See `[[nbe]]`.
- **Term-level partial evaluation — programmable GRAM passes.** User-supplied DPO rewrite rules attached via modal annotations rewrite the GRAM graph before codegen. Where a JIT would inline a hot function after observing call counts, the user writes (or imports) a rule that performs the specialisation as a graph rewrite. The optimisation decision is in the source, not in a runtime profile. See `[[programmable-gram-passes]]`.
- **Pass-driven specialisation.** Specific optimisations express themselves as compile-time graph passes that consume static evidence: `[[singleshot-static-specialization]]` rewrites multishot continuations into flat block-and-jump when QTT usage proves at most one resume; future monomorphisation runs as a pass over the canonical IR; per-target codegen tailoring is also pass-shaped. Each pass is replaceable, removable, or addable.

Distinctions worth keeping straight:

- **Static PE vs runtime JIT.** The same body of optimisation theory underlies both — partial evaluation, specialisation, residualisation. The difference is *when* and *who*. Static PE: at compile time, the user (or their dependencies) explicitly. Runtime JIT: during execution, the JIT runtime implicitly.
- **Static PE vs target-runtime JIT.** Yap's static PE does not preclude target-runtime JITs from running over the emitted source. The JS backend emits source V8 then JIT-compiles; the Erlang backend emits source the BEAM JIT processes. The target-runtime JIT is inherited as part of `[[aot-compilation]]`'s "no Yap runtime layer" stance, not duplicated.
- **Static PE vs NbE acceleration.** Static PE describes what Yap does *to the user's program*. `[[nbe-acceleration]]` describes potential acceleration *of the elaborator itself*. Both borrow ideas from JIT theory; they apply them at different levels of the stack.

This pattern is what `[[compilation-strategy.adr]]` (D-007) commits to as the substitute for runtime JIT.

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[nbe]] — Type-level PE site
- RELIES_ON → [[programmable-gram-passes]] — Term-level PE site
- RELIES_ON → [[singleshot-static-specialization]] — Pass-driven specialisation example
- GENERALIZES → [[singleshot-static-specialization]] — A specific instance of the general pattern

**Incoming**
- [[compilation-strategy.adr]] ← MOTIVATES — The substitute for runtime JIT
- [[jit-for-user-programs]] ← CONTRASTS_WITH — Runtime-JIT vs compile-time-PE substitution

<!-- connections:end -->
