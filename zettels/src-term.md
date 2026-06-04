---
tags:
- concept
- syntax
- ast
- parser
- elaboration
- implemented
- tracing
- dependent
- row-types
- modality
- continuation
- inference
---
# Src.Term

The surface AST — Yap's representation of parsed source code before elaboration. Every Src.Term carries source location via `WithLocation`, preserving provenance from the original text through to diagnostics and error messages.

Src.Term retains all user-facing forms including sugar that the core language does not have: `list`, `tuple`, `struct`, `dict`, `tagged`, `variant`, `row`, `injection`, `projection`, as well as `modal`, `reset`, `shift`, `resume`. These desugar or elaborate into the smaller set of EB.Term constructors during elaboration.

Variables are `{ type: "name" | "label"; value: string }` — named, not yet resolved to de Bruijn indices. Rows carry their polymorphic structure. Statements include `expression`, `let`, `using`, and `foreign`. `foreign` is a Src-level statement form with no elaboration rule.

The boundary between Src.Term and EB.Term is the elaboration dispatcher, which pattern-matches on `term.type` to route each surface form to its inference or checking handler. This is the point where names become indices, sugar becomes core, and types get synthesized or checked.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCES → [[eb-term]] — Via elaboration
- CONTRASTS_WITH → [[eb-term]] — Surface vs core
- RELIES_ON → [[ast-pipeline]] — First layer of the pipeline

**Incoming**
- [[nearley-parser]] ← TRANSLATES_TO — Token stream → AST
- [[v1-elaboration-pipeline]] ← DISPATCHES_ON — Source shape drives dispatch
- [[parser-processors]] ← PRODUCES — Grammar → AST
- [[src-to-eb-transformation]] ← CONSUMES — Source input
- [[src-to-eb-transformation]] ← DISPATCHES_ON — Src.Term type drives dispatch
- [[parser-processors]] ← DISPATCHES_ON — Grammar rule postprocessors
- [[parser-processors]] ← TRANSLATES_TO — Token arrays → AST nodes
- [[tree-sitter-parser]] ← TRANSLATES_TO — Incremental parse tree → CST
- [[elaboration-v2.thread]] ← INCLUDES
- [[ast-pipeline]] ← DEFINES — Surface layer of three-layer design

<!-- connections:end -->
