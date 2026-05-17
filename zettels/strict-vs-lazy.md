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

**Deliberate lowering choice:** administrative beta-redexes are **not** collapsed during MIR lowering so source→MIR stays transparent (`docs/MIR-LOWERING.md` discusses contrast with NbE beta).

Changing global evaluation strategy (lazy primitives, memoization) would cut across normalization, lowering docs, and backends — none of that dual-strategy machinery exists today (`speculative` if pursued).
