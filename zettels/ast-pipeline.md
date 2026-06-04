---
tags:
- concept
- decision
- elaboration
- normalization
- ast
- ir
- syntax
- dependent
- implemented
- compiler
---
# AST pipeline (Src → EB → NF)

Yap's elaboration uses three distinct term representations, each capturing a different level of semantic processing:

**Src.Term** — the surface AST. Parsed source code with full provenance (source locations), user-facing sugar (list, tuple, dict, tagged, variant), and named variables. This is what the programmer writes and what diagnostics refer to. See src-term.

**EB.Term** — the elaboration core syntax. After elaboration: de Bruijn indices replace names, sugar is desugared to core constructors (App+Row), types are synthesized or checked, and implicit arguments are inserted. Branded with monotonic IDs for identity. See eb-term.

**NF.Value** — the semantic domain. After NbE evaluation: computation has been performed, closures defer substitution, and neutral terms mark stuck computation. This is the currency of type comparison — unification operates on NF.Values, not EB.Terms. See nf-value.

The boundaries are meaningful:
- **Src → EB** (elaboration): names resolve, types synthesize, sugar desugars, implicits insert. This is the Src.Term → EB.Term boundary where the elaboration dispatcher pattern-matches on surface form.
- **EB → NF** (evaluation): `NF.evaluate` reduces EB.Term to NF.Value. Computation happens here — beta reduction, delta expansion, row operations.
- **NF → EB** (quoting): `NF.quote` reads back NF.Value to EB.Term, converting levels to indices and chasing the zonker. This is readback — the inverse of evaluation, used when the elaborator needs a syntactic term from a semantic value.

The eval/quote cycle is the engine of NbE: evaluate to compare semantically, quote to produce syntactic output.

<!-- connections:start -->

## Connections

**Outgoing**
- DEFINES → [[src-term]] — Surface layer of three-layer design
- DEFINES → [[eb-term]] — Core layer of three-layer design
- DEFINES → [[nf-value]] — Semantic layer of three-layer design
- RELIES_ON → [[nbe]] — Eval/quote cycle is the engine
- RELIES_ON → [[dependent-types]] — Types-as-terms requires shared representation
- RELIES_ON → [[unified-binder]] — Single Abs node across all layers
- ENABLES → [[unification-algorithm]] — NF.Value is the comparison currency
- ENABLES → [[quoting]] — NF → EB readback
- ENABLES → [[bidirectional-checking]] — Expected types are NF.Value

**Incoming**
- [[src-term]] ← RELIES_ON — First layer of the pipeline
- [[eb-term]] ← RELIES_ON — Second layer of the pipeline
- [[nf-value]] ← RELIES_ON — Third layer of the pipeline

<!-- connections:end -->
