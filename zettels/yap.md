---
tags:
- project
- language
- dependent
- row-types
- elaboration
- normalization
- verification
- lowering
- mir
- parser
- inference
- implemented
- ffi
- continuation
- testing
---
# Yap (language hub)

Dependently typed research language: **structural** data (rows for records, tuples, variants, arrays), **bidirectional** elaboration, **NbE**-style definitional equality, **refinement** types with SMT checking, **multiplicity** annotations (`Zero`/`One`/`Many` in `src/shared/modalities/multiplicity.ts`), **delimited continuations** (shift/reset) in lowering (`src/lowering/continuations/`).

**Pipeline (source-grounded):** parse (Nearley `src/parser/grammar.ne`; tree-sitter migration in `tree-sitter-yap` per `AGENTS.md`) → elaborate (`src/elaboration/`, inference in `src/elaboration/inference/`, checking in `src/elaboration/check.ts`) → normalize → verify on demand (**IVL** VC generation + in-tree **CDCL(T)** in `src/verification/V2/` / `src/verification/solver/`; **`z3-solver`** contexts still used for adapter tooling per `scripts/cli.ts` / module paths — see [[verification-pipeline]]) → lower to MIR (`src/lowering/`, `docs/MIR-LOWERING.md`) → backends (e.g. JS emission paths under lowering/cli).

**Wiki-style entry points:** [[structural-typing.md]], [[row-polymorphism.md]], [[dependent-types.md]], [[nbe.md]], [[mir-lowering.md]], [[verification-pipeline.md]], [[shift-reset.md]], [[modalities.md]], [[refinement-types.md]].

**Status:** `implemented` (compiler + tests exist); parser migration (tree-sitter) and verification backends continue to evolve.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[structural-typing]] — All compound types are row-based
- USES → [[row-polymorphism]] — Structural flexibility via row variables
- EXTENDS → [[hindley-milner]] — HM + row variables + dependent types
- EXTENDS → [[system-f]] — Parametric polymorphism foundation
- USES → [[dependent-types]] — Pi types with value dependencies
- USES → [[bidirectional-checking]] — Inference strategy
- USES → [[nbe]] — Definitional equality via normalization
- USES → [[row-unification]] — Row variable unification in constraint solving
- INCLUDES → [[elaboration]] — Core pipeline stage
- INCLUDES → [[nearley-parser]] — Parser component
- INCLUDES → [[verification-pipeline]] — Verification component
- INCLUDES → [[mir-lowering]] — Lowering component
- INCLUDES → [[js-codegen]] — JS backend
- INCLUDES → [[c-codegen]] — C backend
- INCLUDES → [[erlang-codegen]] — Erlang backend
- INCLUDES → [[module-system]] — Module component
- INCLUDES → [[compile-orchestration]] — Orchestration
- INCLUDES → [[glossary]] — Project-level reference

**Incoming**
- [[cbv-evaluation]] ← IMPLEMENTS — Runtime semantics
- [[documentation-debt]] ← APPLIES_TO — README/FAQ drift
- [[documentation-debt]] ← DETECTS — Drift between docs and impl
- [[typing-rules]] ← ENCODES — Formal rules in spec.md
- [[pipeline-explorer]] ← REPORTS — Visualizes pipeline stages
- [[brainstorming-artifacts]] ← INFORMS — Roadmap decisions
- [[lsp]] ← REPORTS — Language server protocol
- [[yap-explore]] ← REPORTS — Web dashboard for pipeline stages
- [[integration-testing]] ← USES — REPL pipeline end-to-end

<!-- connections:end -->
