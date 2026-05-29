---
tags:
- mechanism
- normalization
- elaboration
- recursion
- evaluation
- implemented
- inference
- dependent
---
# Knot-tying

The placeholder-and-mutate pattern that enables recursive evaluation in NbE. When a definition may reference itself (directly or through imports), the evaluator creates a placeholder entry in the environment, evaluates the body in a context that includes the placeholder, then mutates the placeholder with the actual result. This breaks the circularity: the body can reference the binding before its value is known.

Three cases use this pattern:

- **Imported definitions** (Free variables): the environment entry starts as `NF.Var(Bound lvl)` — a placeholder. A `Cont` frame is pushed that will assign `entry.nf = result` once evaluation completes. The imported definition evaluates in the extended context, and any self-references resolve to the placeholder (a neutral term) until the continuation fires.

- **Block let-bindings**: same pattern — the entry's `nf` starts as a bound variable placeholder, and a continuation assigns the evaluated value before the rest of the block continues. This is what enables recursive let-bound definitions to typecheck and evaluate.

- **Mu bindings**: when reading a Bound variable whose binder is Mu, the evaluator wraps the result in `Neutral(entry.nf)` instead of returning the plain NF. This blocks unfolding during normalization — the mu body can reference itself, but each reference produces a neutral rather than triggering re-evaluation. Unfolding only happens in unification, where it's controlled.

The pattern relies on mutable cells in the environment — a controlled use of mutation in an otherwise functional evaluation pipeline.
