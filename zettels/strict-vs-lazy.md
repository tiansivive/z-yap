---
tags:
- decision
- evaluation
- normalization
- elaboration
- lowering
- codegen
- dependent
- modality
- exploration
---
# Strict vs lazy

Yap's NbE evaluator is strict (CBV) — see cbv-evaluation for the justification (shift/reset, effects, predictable types). This is settled: the compile-time evaluator must be strict because the type theory depends on it.

The runtime evaluation strategy is a separate question. Lowering emits strict MIR with explicit evaluation order, and the target backends (JS, C, Erlang) are all strict by default — the path of least resistance is strict end-to-end.

But laziness is powerful. Memoized or lazy evaluation could enable:
- Avoiding computation of unused arguments (thunking)
- Infinite data structures and productive corecursion
- More natural expression of certain algorithms (streams, generators)

Options: strict-by-default, opt-in laziness annotations, or lazy-by-default with strictness annotations (Haskell-style). The modality system could potentially encode evaluation strategy as a type-level property.

A deliberate lowering choice supports this openness: administrative beta-redexes are NOT collapsed during MIR lowering, keeping the source→MIR translation transparent. This means the lowering layer doesn't bake in assumptions about reduction that would foreclose lazy alternatives.
