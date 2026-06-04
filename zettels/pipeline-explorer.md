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

**GRAM pipeline**: The explorer derives GRAM output before MIR. EB.Term → GRAM translation → GRAM passes (saturation, shift-reset, pattern) → display, alongside MIR lowering via `GRAM.Bridge.emit`. The `gram` tab shows the enriched property graph.

**Audit**: Systematic audit of all 19 snippets across the full pipeline — see [[explorer-audit.thread]].

<!-- connections:start -->

## Connections

**Outgoing**
- REPORTS → [[yap]] — Visualizes pipeline stages
- USES → [[solver-trace]] — Trace tab displays solver replay
- USES → [[vc-ir]] — IVL tab displays s-expression formula
- USES → [[m1-implementation]] — IVLPrint for formula rendering
- USES → [[m2-implementation]] — Solver.createTraced() for trace generation
- USES → [[build-simplify-toggle]] — ivlSimplify config option
- SUPERSEDES → [[smt-translation]] — IVL + Trace tabs replaced Z3 Verify tab
- DELEGATES_TO → [[verification-pipeline]] — Calls VerificationServiceV2 directly
- REPORTS → [[solver-trace]] — Renders trace output in Trace tab
- REPORTS → [[vc-ir]] — Renders IVL formula in IVL tab
- INCLUDES → [[explorer-evolution.thread]] — Roadmap thread

**Incoming**
- [[yap-explore]] ← MIRRORS — Same tool, alternate zettel
- [[session-trace-observability]] ← ADDRESSES — Integrated solver into the explorer
- [[solver-trace]] ← TRANSLATES_TO — Trace output displayed in Trace tab
- [[build-simplify-toggle]] ← ENABLES — Togglable via explorer UI checkbox
- [[build-simplify-toggle]] ← USES — Config persisted in localStorage, sent per /run request
- [[lambda-synthesis-fix]] ← DISCOVERED_BY — Bug reproduced via explorer's IVL tab
- [[explorer-evolution.thread]] ← EXTENDS — Evolution roadmap for the explorer
- [[explorer-provenance-trace]] ← EXTENDS — New explorer capability
- [[explorer-cross-highlighting]] ← EXTENDS — New explorer capability
- [[explorer-diff-mode]] ← EXTENDS — New explorer capability
- [[explorer-snippet-library]] ← EXTENDS — New explorer capability
- [[explorer-timing]] ← EXTENDS — New explorer capability
- [[explorer-graph-viz]] ← EXTENDS — New explorer capability
- [[stuck-quoting-fix]] ← FIXES — Segfault on stuck projection/injection quoting

<!-- connections:end -->
