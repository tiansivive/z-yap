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
    compilation,
    meta-circular,
    principle,
    compiler,
  ]
---
# Compiled NbE

A design strategy where the **evaluator** is compiled to native (or near-native) form so that per-step dispatch in `NF.evaluate` runs at native speed; user terms remain ordinary data fed through the compiled evaluator. The compiled artefact is the elaborator's machinery, not the user's program — Yap's AOT stance for user code (`[[compilation-strategy.adr]]`) is undisturbed.

The performance hypothesis: in a TypeScript-hosted NbE evaluator like Yap's (`src/elaboration/normalization/evaluation.v2.ts`), each evaluation step pays interpretive-dispatch cost — pattern matches on `EB.Term` constructors, function calls per case branch, allocation of `NF.Value` records. When the same evaluator runs over many thousands of small steps per elaboration, that dispatch overhead becomes the dominant cost factor independent of any algorithmic improvement.

Compiled NbE attacks this by treating the evaluator itself as a compilation target: the dispatch tree becomes inlined branching, value construction becomes direct allocation, knot-tying placeholders become indirection-by-index. The evaluator transforms from an interpreter pattern-matching on term shape to a flat dispatch routine specialised for the term shapes it actually encounters.

Prior art:

- **MetaCoq λ-box** — a verified compilation pipeline that lowers Coq terms to a small functional λ-calculus optimised for evaluation, used to extract verified evaluators.
- **Agda `--compile-nbe`** — Agda's compiled normalisation pass, used selectively for hot definitions where interpretive NbE is too slow.
- More broadly, the technique of compiling interpreters via partial evaluation (Futamura projections, two-level languages) is the theoretical grounding — the compiled evaluator is a specialised residual of the interpretive one.

Trade-offs:

- **Build complexity** — the elaborator itself becomes something with a compilation step. A pre-build phase produces the compiled evaluator from the interpretive one; the compiled artefact ships alongside the parser and elaborator runtime.
- **Debuggability** — the interpretive evaluator is straightforward to step through; the compiled form is opaque without specialised tooling.
- **Constant-factor win** — the speed-up is constant-factor (no algorithmic change). Glued evaluation (`[[glued-evaluation]]`) addresses repeated work, which can be asymptotic. Compiled NbE addresses per-step cost, which is constant. The two are complementary, not competing — but glued is typically the lower-hanging fruit.

Implementation surface in Yap would touch `[[trampoline-evaluator]]` (the work/result stack machine the compiled form would replace) and `[[variable-evaluation-dispatch]]` (the five-way variable resolution branch, which is the principal dispatch hot path). The compilation strategy itself is open — TypeScript code generation, WASM target, even a hand-coded specialised dispatcher are all candidates.

This is design-space, deeply speculative. Justification requires both `[[nbe-performance-profile]]` confirming dispatch dominates and `[[glued-evaluation]]` having been adopted first as the cheaper acceleration win.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[trampoline-evaluator]] — The dispatch machinery the compiled form would replace
- APPLIES_TO → [[variable-evaluation-dispatch]] — Principal dispatch hot path

**Incoming**
- [[nbe]] ← INCLUDES — Compile the evaluator itself
- [[nbe-acceleration]] ← REFERENCES — Secondary candidate strategy
- [[agda-influence]] ← INFORMS — Agda --compile-nbe as design-space precedent

<!-- connections:end -->
