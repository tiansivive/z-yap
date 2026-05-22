---
tags:
  - in-progress
  - cli
  - tooling
  - mir
  - compiler
  - lowering
  - codegen
  - verification
  - parser
  - inference
  - sat
  - display
  - backend
  - infrastructure
  - normalization
  - elaboration
  - ivl
  - tracing
  - solver
  - explorer
  - observability
---

# Pipeline explorer

**CLI**: `pnpm yap explore` (`scripts/cli.ts`), **`--port`** default **3333**, **`--ivl-no-simplify`** disables IVL algebraic simplification.

**Implementation**: `src/cli/explore/index.ts` exports **`start`** from **`server.ts`**. Node **`http`** server serves **`src/cli/explore/static/`** (HTML/JS/CSS) and **`tooling/syntax-highlighting`** under **`GET /syntax/…`**.

**Core API**: **`POST /run`** parses JSON **`{ source, deBruijn, parserRule, rawJson, ivlSimplify }`** and calls **`run`** from **`pipeline.ts`**. **`ParserRule`** is **`"Ann"` | `"Script"`** (matches Nearley parser entry switching). **`Result`** strings include **`parsed`**, **`elaborated`**, **`type`**, **`normalized`**, **`constraints`**, **`metas`**, **`ivl`**, **`solverTrace`**, **`mir`**, **`gram`**, **`codegenJS`**, **`codegenC`**, **`codegenErlang`**, **`errors`**, plus **`raw`**.

**IVL tab**: Displays the IVL formula (s-expression) produced by `VerificationServiceV2`. Uses `smtlib` syntax highlighting mode.

**Trace tab**: Displays the solver execution trace produced by `Solver.createTraced()` + `Trace.replay`. Shows step-by-step CDCL(T) execution: clause state, propagations, decisions, theory sub-steps (EUF merges, arithmetic bounds), quantifier rounds.

**Config sidebar**: Snippet library (19 built-in examples across 5 groups), parser rule, de Bruijn display mode, "IVL simplify" checkbox (persisted in localStorage, sent as `ivlSimplify`), raw JSON toggle.

**Pipeline deps**: Nearley grammar, **`EB`** inference/display, **`NF`**, MIR lower/pretty, GRAM passes imported as **`@yap/gram`** (`tsconfig.json` path → `src/GRAM/index`), **`VerificationServiceV2`**, **`Build`** (IVL constructors), **`Solver`** (CDCL(T)), **`Trace`** (replay renderer), **`IVLPrint`** (s-expression printer).

**GRAM pipeline**: The explorer derives GRAM output before MIR. EB.Term → GRAM translation → GRAM passes (saturation, shift-reset, pattern) → display, alongside MIR lowering. The `gram` tab shows the enriched property graph.
