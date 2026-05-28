---
tags:
- concept
- syntax
- elaboration
- inference
- dependent
- implemented
- type-system
- parser
- ast
- normalization
- metavariable
---
# Application

The elimination form for functions: `fn arg` (explicit) and `fn @ arg` (implicit). Application drives type-directed elaboration — the function position is inferred first, and its type determines how the argument is processed.

For explicit applications, implicit argument insertion runs first: if the function's inferred type is a Pi with implicit icitness, the elaborator inserts fresh meta-variable arguments for each implicit Pi before reaching the explicit argument. This is the mechanism by which implicit parameters are filled automatically.

When the function's type is not yet a Pi (e.g., it's a meta-variable), the elaborator constructs a Pi skeleton — a fresh meta for the domain, a fresh meta for the codomain closure — and emits an assign constraint tying the function's type to this synthesized Pi. The constraint solver later ensures consistency.

The result type is computed by applying the Pi's codomain closure to the argument value (`NF.apply`), which is how dependent return types work — the return type can mention the argument.

Projection (`x.label`) and injection (`x.label value`) are separate syntactic forms, not application — they have their own grammar productions and elaboration paths.
