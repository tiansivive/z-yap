---
tags:
- normalization
- elaboration
- runtime
- evaluation
- inference
- lowering
- codegen
- dependent
- modality
- speculative
- implemented
---
# Strict vs Lazy

The v2 NbE evaluator evaluates composite subterms eagerly in fixed order — `App` evaluates function and argument before reduction, match scrutinizes before alternatives, row extensions evaluate field values before tails (`src/elaboration/normalization/evaluation.v2.ts`; see sibling note `cbv-evaluation.md` in this vault).

That semantics is **kernel / tooling** behaviour (`NF.evaluate`). It does **not** automatically describe every host artefact: lowering emits explicit MIR sequences (`src/lowering/lower.ts`), and legacy JS codegen prints lambdas/applications (`src/Codegen/terms.ts`) whose observability depends on emitted structure plus JS rules.

**Deliberate lowering choice:** administrative beta-redexes are **not** collapsed during MIR lowering so source→MIR stays transparent (contrast with NbE beta in `evaluation.v2.ts`).

A global lazy or memoized evaluation strategy would cut across normalization, lowering, and backends — an exploratory axis, not part of the current pipeline (`speculative` if pursued).
