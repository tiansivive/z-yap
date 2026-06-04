---
tags:
  [
    concept,
    reference,
    nbe,
    normalization,
    evaluation,
    elaboration,
    performance,
    profile,
    measurement,
    needs-design,
    infrastructure,
    tooling,
  ]
---
# NbE performance profile

A captured measurement of where elaborator compile time goes is the empirical grounding any NbE acceleration decision needs. Without one, choosing between glued evaluation, compiled NbE, memoisation, or doing nothing is guesswork — the strategies have very different cost/benefit profiles depending on which evaluator paths dominate the workload.

The profile that would resolve this question has four axes:

- **Frequency** — how many times `NF.evaluate` is invoked per `check` / `infer` step on representative programs. Unification triggers it; meta resolution re-triggers it; module-level definitions trigger it on import. The same term may be evaluated many times across the lifetime of a single elaboration.
- **Per-call cost breakdown** — what fraction of a single `NF.evaluate` call goes to closure construction, body traversal, variable dispatch (the five-way `Bound` / `Free` / `Meta` / `Label` / `Foreign` branch in `[[variable-evaluation-dispatch]]`), neutral wrapping, knot-tying placeholder mutation, FFI saturation.
- **Repeated work** — how often the same `(term, env)` pair is re-evaluated, and how that repetition correlates with meta resolution events. The answer constrains whether memoisation pays and whether glued evaluation's lazy unfolding actually saves anything in practice.
- **Quote dominance** — how much of compile time is `NF.quote` versus `NF.evaluate`. If quote dominates (likely under heavy implicit insertion or display), glued evaluation has outsized payoff because it lets quote skip readback when the original syntax is still available.

Status: unmeasured. There is no `--profile` mode on the explorer, no benchmark suite that exercises representative elaboration loads, no instrumentation in `evaluation.v2.ts`. The minimum viable profile is a `--profile` flag on `pnpm yap explore` that emits per-step `NF.evaluate` / `NF.quote` counts and rough timing, run against a small set of stress programs (heavy implicits, deep dependent records, mutual recursion, modal annotations).

Until the profile exists, acceleration zettels (`[[nbe-acceleration]]`, `[[glued-evaluation]]`, `[[compiled-nbe]]`) remain design-space exploration. The profile is the prerequisite for promoting any of them to a concrete plan.

<!-- connections:start -->

## Connections

**Incoming**
- [[nbe]] ← INCLUDES — Empirical grounding for any acceleration decision
- [[nbe-acceleration]] ← ADDRESSES — The design space addresses the perf question

<!-- connections:end -->
