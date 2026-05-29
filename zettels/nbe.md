---
tags:
- concept
- normalization
- elaboration
- hub
- implemented
- inference
- verification
- dependent
- type-system
- unification
- evaluation
---
# Normalisation by Evaluation (NbE) (hub)

Yap's approach to definitional type equality: evaluate terms into a semantic domain (NF.Value), then compare structurally via unification. NbE replaces syntactic normalization (rewrite rules on syntax) with semantic normalization (interpret into a domain, read back to syntax).

The two directions:
- **Evaluate** (`NF.evaluate`): EB.Term → NF.Value. Performs computation — beta reduction, delta expansion, row operations — producing closures for binders and neutrals for stuck computation.
- **Quote** (`NF.quote`): NF.Value → EB.Term. Reads back semantic values into syntax, converting de Bruijn levels to indices and chasing the zonker for solved metas. See quoting.

The eval/quote cycle is the engine of the elaborator: evaluate to compare semantically (unification operates on NF.Values), quote to produce syntactic output (for display, further elaboration, or lowering).

Evaluation strategy is call-by-value — see cbv-evaluation. The evaluator uses a trampoline architecture (explicit work/result stacks) for stack safety — see trampoline-evaluator. Recursive definitions use a knot-tying pattern — see knot-tying.

The semantic domain (NF.Value) consists of closures (deferred computation under binders) and neutrals (stuck computation on unknown heads). See closures, neutrals, nf-value.

Children: cbv-evaluation, quoting, trampoline-evaluator, knot-tying, variable-evaluation-dispatch, whnf-vs-full-normalization, evaluation-step-limit, application-evaluation, closures, neutrals.
