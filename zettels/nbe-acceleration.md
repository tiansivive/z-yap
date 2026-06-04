---
tags:
  [
    design,
    nbe,
    normalization,
    evaluation,
    elaboration,
    performance,
    optimization,
    speculative,
    needs-design,
    exploration,
    compiler,
    infrastructure,
  ]
---
# NbE acceleration

The elaborator runs NbE many times during typechecking — every `check` / `infer` step evaluates terms into the semantic domain to compare structurally via unification. If elaborator compile time becomes a bottleneck, the design space for accelerating that evaluator borrows ideas from the JIT literature even though Yap declines JIT for user programs: speculation-and-rollback, tiered representation, compiled interpreter dispatch. The JIT *ideas* are reusable; the JIT *target* (user code at runtime) is not where Yap applies them.

Candidates in this design space:

- **Glued evaluation** — keep both `EB.Term` and lazy `NF.Value` per binding; unification consults the value, display/quote can use the syntax, unfolding is lazy and reversible. The closest functional-language analog of JIT speculation: speculate that the value form is needed, fall back to the syntax form for readback or rollback. Coq's kernel and Lean's elaborator both use this shape. Documented in `[[glued-evaluation]]`.
- **Compiled NbE** — compile the elaborator's evaluator (not user code) so per-step dispatch in `NF.evaluate` runs as native code, with user terms as data. The JIT analog of compiling the *interpreter*, not the *interpreted*. Documented in `[[compiled-nbe]]`.
- **Memoisation** — cache results of `NF.evaluate` keyed by `(term, env-hash)`. Cheap in principle, expensive to invalidate when metas resolve. Open question whether it pays after glued evaluation.

All of these are gated on `[[nbe-performance-profile]]`: nobody has measured where elaborator compile time actually goes. The design space stays speculative until that profile exists, because the strategies have very different cost/benefit profiles depending on which `NF.evaluate` paths dominate.

Boundary: this is acceleration of the *compile-time* evaluator, not of user programs. The AOT decision (`[[compilation-strategy.adr]]`) rejects runtime JIT for user code; nothing about that rejection forecloses internal JIT-style optimisation of the elaborator's own machinery. The two concerns are orthogonal and the ADR records this explicitly.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[nbe-performance-profile]] — The design space addresses the perf question
- GROUNDED_IN → [[glued-evaluation]] — The main artefact of JIT-ideas-in-NbE
- REFERENCES → [[compiled-nbe]] — Secondary candidate strategy
- RELIES_ON → [[compilation-strategy.adr]] — AOT scopes JIT-style work to the elaborator, not user programs
- CONTRASTS_WITH → [[jit-for-user-programs]] — JIT for the elaborator is in scope; JIT for user code is not

**Incoming**
- [[nbe]] ← INCLUDES — JIT-ideas-applied-to-elaborator design discussion
- [[lean-4-influence]] ← INFORMS — Lean-style elaborator perf shapes the design space
- [[compilation-strategy.adr]] ← DEFERS — Internal elaborator acceleration deliberately not foreclosed

<!-- connections:end -->
