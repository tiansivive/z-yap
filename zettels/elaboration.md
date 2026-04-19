---
tags: [mechanism, elaboration, project]
---
# Elaboration

Yap's core pipeline stage: transforms parsed syntax (Src.Term) into elaborated terms (EB.Term) with full type information.

Dispatch:
- **Top-level** — by term shape (lambda, application, struct, variant, etc.)
- **Within modules** — by expected type shape (Pi, Sigma, Schema, Type, etc.)

Key responsibilities:
- [[bidirectional-checking|Bidirectional inference]] (infer + check)
- Implicit argument insertion
- Meta-variable generation and [[constraint-solving|constraint collection]]
- Row construction and field elaboration
- Pattern elaboration for match expressions

The elaboration monad (V2 Do notation) provides reader-writer-either semantics: context threading, constraint accumulation, and error handling in generator style.
