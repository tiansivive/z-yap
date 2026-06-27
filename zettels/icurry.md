---
tags:
  - concept
  - ir
  - compiler
  - mechanism
  - lowering
  - language
  - continuation
  - gram
  - pattern
  - design
---
# ICurry

The intermediate representation used in [[sprite]] between the declarative FlatCurry form
and LLVM code generation. The split has two motivations: FlatCurry is declarative (nested
case expressions, let blocks) and awkward to translate directly to an imperative target;
ICurry is statement-based (local declarations and conditionals are statements, expressions
are flat calls and constants) and maps cleanly to a low-level target language.

The second motivation is explicitness of non-determinism: ICurry expresses all
non-determinism through a single `choice` (`?`) constructor. High-level features —
including [[functional-patterns]] — are desugared to choices in this IR. The
pattern-matching strategy is guided by definitional trees encoded directly in ICurry,
making evaluation order explicit rather than implicit.

The structural parallel to [[gram-to-mir-bridge]] is close: both are two-IR splits where a
higher-level graph or declarative representation is lowered to an imperative form for code
generation. The difference is scope of non-determinism: ICurry retains explicit choice nodes
as a live IR concept (choices become [[pull-tab]] targets at evaluation time), whereas the
GRAM → MIR bridge targets a deterministic MIR — non-determinism has been handled upstream
by the [[shift-reset]] machinery before the bridge runs. The two approaches reflect
different assumptions about where non-determinism is resolved in the pipeline.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[gram-to-mir-bridge]] — same two-IR split architectural pattern
- CONTRASTS_WITH → [[gram-to-mir-bridge]] — ICurry retains explicit choice nodes; GRAM→MIR resolves nondet upstream
- REFERENCES → [[sprite]] — described in Sprite

**Incoming**
- [[sprite]] ← INTRODUCES — two-IR split IR design
- [[gram-evolution.thread]] ← INCLUDES

<!-- connections:end -->
