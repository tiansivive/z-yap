# Thread

Append-only paper trail of design and implementation work. Each block records a
session's path through the zettel graph — what was explored, what was decided,
what was deferred.

Format: edge lines (`[[A]] -- verb -> [[B]]`) and action lines (`ENQUEUE`, `RESOLVED`, `SPAWN`).
See [[thread-queue-system]] for the full system design.

---

## session:thread-system-bootstrap — 2026-05-18 [meta, threads, queues]

Introduced the thread & queue work layer to z-yap, adapted from z-piescript's
system. Surveyed all 241 zettels to identify open-ended work clusters. Created
9 thread hubs (5 vertical feature threads, 4 horizontal pipeline threads), a
global pending queue, and a meta zettel describing the system.

### Vocabulary additions

New tags: `thread`, `queue`, `ready`, `blocked`, `needs-design`.
New labels: `PRECEDES`, `SHARED_WITH`, `DEFERRED_FROM`.
New tag group: Work Layer.

### Threads spawned

SPAWN [[delimited-continuations.thread]] — shift/reset through typing, lowering, GRAM
SPAWN [[row-types.thread]] — structural data substrate, unification, verification gap
SPAWN [[usage-semantics.thread]] — QTT, modalities, enforcement
SPAWN [[recursion.thread]] — mu types, mutual recursion, loop sugar
SPAWN [[pattern-matching.thread]] — compilation, exhaustiveness, surface features
SPAWN [[verification-backend.thread]] — VC IR, in-house solver, theory support
SPAWN [[gram-evolution.thread]] — graph IR, MIR bridge, future passes
SPAWN [[elaboration-v2.thread]] — monad, pipeline, doc alignment
SPAWN [[parser-migration.thread]] — tree-sitter, grammar alignment
SPAWN [[global-pending-queue]] — unassigned work items

### Cross-thread connections

[[gram-evolution.thread]] -- shared_with -> [[delimited-continuations.thread]] — gram-shift-reset-pass
[[gram-evolution.thread]] -- shared_with -> [[pattern-matching.thread]] — gram-pattern-pass, gram-pattern-translation
[[verification-backend.thread]] -- shared_with -> [[row-types.thread]] — milestone-4-rows / row-theory
[[pattern-matching.thread]] -- shared_with -> [[row-types.thread]] — exhaustiveness depends on variant/row structure
[[elaboration-v2.thread]] -- shared_with -> [[recursion.thread]] — let-poly spec (mu recovery at let boundaries)

### Readiness tags applied

needs-design: [[missing-spec-shift-reset]], [[row-theory]], [[modality-enforcement]],
[[modality-polymorphism]], [[equirecursive-types]], [[missing-spec-recursive-types]],
[[exhaustiveness-checking]], [[missing-spec-let-polymorphism]], [[missing-spec-sigma-types]]
ready: [[dedicated-row-constructors]]

### Queue items

ENQUEUE [[spineful-applications]] — cross-cutting App IR refactor
ENQUEUE [[where-clauses]] — deferred surface syntax
ENQUEUE [[lsp]] — depends on stable CST
ENQUEUE [[repl]] — interactive evaluation
ENQUEUE [[module-system]] — grammar drift
ENQUEUE [[block-level-using-gap]] — implicit scoping bug
ENQUEUE [[documentation-debt]] — README/FAQ drift
ENQUEUE [[type-erasure]] — no principled erasure
ENQUEUE [[dynamic-reflection]] — design-space only
ENQUEUE [[ffi-saturation]] — MIR saturation concern
ENQUEUE [[whnf-codification]] — NbE mode API gap

---

## session:m2-completion — 2026-05-20 [verification, sat, milestone]

AI pair-programming session implementing milestones 1 and 2 of the SMT solver
plan (`docs/SMT-SOLVER.md`). Branch: `ivl-sat-solver`.

### New zettels

[[session-m2-completion]] — session record
[[m1-implementation]] — M1 IR boundary implementation details + src refs
[[m2-implementation]] — M2 CDCL(T) + theories implementation details + src refs

### Status changes

[[milestone-1-ir-boundary]] planned → implemented
[[milestone-2-euf-quant-lia]] planned → implemented
[[cdcl-t-solver]] planned → implemented
[[arithmetic-theory]] planned → implemented
[[euf-theory]] planned → implemented
[[quantifier-engine]] planned → implemented
[[quantifier-preparation]] planned → implemented
[[watched-literals]] planned → implemented
[[bcp]] planned → implemented
[[one-uip]] planned → implemented
[[congruence-closure]] planned → implemented
[[boolean-lowering-cnf]] planned → implemented

### Thread updates

[[verification-backend.thread]] items 7, 8 → implemented; 6, 12, 13 → partial

### Vocabulary additions

New tags: `implementation`, `ai-session`, `ivl`.

---

## session:trace-observability — 2026-05-21 [verification, observability, explorer, bugfix]

AI pair-programming session following M2 completion. Built solver observability
tooling, integrated the IVL solver into the pipeline explorer, discovered and
fixed a correctness bug in Lambda type synthesis, and added a simplification
toggle for debugging. Branch: `ivl-sat-solver`.

### New zettels

[[session-trace-observability]] — session record
[[solver-trace]] — generator-based CDCL(T) observability system
[[build-simplify-toggle]] — global flag gating IVL algebraic simplifications
[[lambda-synthesis-fix]] — Pi return closure bug fix in synth.ts

### Status changes

[[pipeline-explorer]] updated: IVL + Trace tabs replace Z3 Verify tab

### Thread updates

[[verification-backend.thread]] items 17–20 added (solver-trace, explorer
integration, build-simplify-toggle, lambda-synthesis-fix — all implemented)

### Vocabulary additions

New tags: `observability`, `bugfix`, `explorer`, `generator`.
New labels: `EXPOSES`, `GATES`, `FIXES`, `DISCOVERED_BY`.

---

## session:bubble-verification-design — 2026-05-21 [continuation, verification, ivl, elaboration]

AI pair-programming session designing the verification story for shift/reset
expressions. Two-phase approach: immediate dummy stub (Reset transparent, Shift
opaque), then full Bubble semantics with concrete expansion and symbolic
quantification. Branch: `ivl-sat-solver`.

### New zettels

[[session-bubble-verification-design]] — session record
[[shift-reset-verification-stub]] — dummy pass-through (Reset=inner, Shift=true)
[[bubble-semantics]] — EB.Term Bubble replacing skolem-meta indirection
[[shift-reset-verification]] — full VC strategy (concrete + symbolic)
[[open-shift-verification]] — symbolic mode for cross-module/open shifts
[[arm-paper]] — Sekiyama, Tsukada, Igarashi (POPL 2024) — Answer Refinement Modification
[[sekiyama-unno-temporal]] — Sekiyama & Unno (POPL 2023) — temporal answer-effect modification

### Thread updates

[[verification-backend.thread]] item 21 added (shift-reset-verification-stub — planned)
[[delimited-continuations.thread]] items 11–13 added (bubble-semantics, shift-reset-verification, open-shift-verification)

### Cross-thread connections

[[verification-backend.thread]] -- shared_with -> [[delimited-continuations.thread]] — shift-reset-verification, shift-reset-verification-stub
[[delimited-continuations.thread]] -- shared_with -> [[verification-backend.thread]] — shift-reset-verification

---

## session:shift-reset-stub-impl — 2026-05-21 [continuation, verification, ivl]

Implementation of the shift/reset verification stub and z-yap alignment audit.
Branch: `ivl-sat-solver`.

### Implementation

[[shift-reset-verification-stub]] implemented:
- `synth.ts`: Reset transparent (recurse inner), Shift opaque (NF.Any + true)
- `subtype.ts`: Any <: T and T <: Any cases at top of match (before Lit <: Lit)
- `translate.ts`: Meta variables → uninterpreted constants instead of throwing

Discovery: skolem metas leak into formula translation when refinement predicates
are applied to expressions containing shift results (e.g. `1 + shift(resume 10)`).

### Status changes

[[shift-reset-verification-stub]] planned → implemented
[[verification-backend]] planned → in-progress
[[z3-replacement-decision]] planned → in-progress
[[translation-boundary-vc]] planned → incomplete
[[vc-ir]] planned → implemented
[[smt-translation]] implemented → deprecated

### Thread updates

[[verification-backend.thread]] item 21 → implemented

---

## session:test-cleanup-nf-clarification — 2026-05-22 [testing, normalization, continuation, tooling]

Test infrastructure cleanup, NF.Value semantic clarification, and z-yap sync.
Branch: `i-dont-do-it-for-the-gram`.

### Codebase changes

**NF.Value / Reset/Shift clarification:**
- Confirmed Reset/Shift are EB.Term constructs only, not NF.Value constructors
- Removed unreachable match arms from `quoting.ts`, `pretty.ts`, `verification/V2/logic/translate.ts`

**Test cleanup:**
- Deleted legacy `elaboration.test.ts` (824 lines, v1 API) and `solver.test.ts` (88 lines, v1 API)
- Ported 8 pattern matching tests to `inference/__tests__/match.test.ts`
- Cleaned vitest.config.mts exclusion entries

**Config/tooling:**
- `tsc.tsconfig.json`: added `@yap/gram` path aliases, excluded static assets
- Convention added: never run bare `tsc --noEmit`, always use `pnpm typecheck`
- Explorer pipeline derives GRAM before MIR

### New zettels

[[v1-test-cleanup]] — deletion of v1 test files, ported coverage, config changes
[[test-coverage-gaps]] — inventory of 5 skipped test suites with blockers

### Zettel updates

[[nf-value]] — added "Not NF.Value" clarification for Reset/Shift (timeless domain boundary)
[[shift-reset]] — updated NbE domain note, simplified test file listing
[[snapshot-testing]] — removed stale `drift` tag (chronological paragraph removed)
[[testing-strategy]] — added v1-test-cleanup and test-coverage-gaps to hub
[[pipeline-explorer]] — integrated GRAM pipeline info into body
[[testing.thread]] — added v1-test-cleanup and test-coverage-gaps as thread items

### Thread updates

[[testing.thread]] items added: v1-test-cleanup, test-coverage-gaps

## session:selfification-first-order-guard — 2026-05-22 [verification, modality, type-system, ivl]

Selfification first-order restriction: guard function-sorted types from self-equality refinements.
Branch: `i-dont-do-it-for-the-gram`.

### Codebase changes

**selfify + isFirstOrder (`src/verification/V2/utils/refinements.ts`):**
- `isFirstOrder` now unwraps Modal recursively (checks inner value)
- `selfify` uses `isFirstOrder` as top-level guard; higher-order types return unchanged
- `selfify` uses `NF.force` (not `unwrapNeutral`) to zonk metas before matching
- Pi/Lambda/Sigma cases removed from selfify — `isFirstOrder` is the single authority
- Aligns with Liquid Haskell T-Var rule (Knowles & Flanagan 2010, Vazou et al. 2024)
- Prevents `(= f f)` atoms on function sorts from entering IVL/EUF

### New zettels

[[selfification]] — selfification mechanism, T-Var rule, Yap implementation
[[first-order-restriction]] — first-order boundary for refinements, three enforcement points
[[knowles-flanagan-2010]] — Hybrid Type Checking paper, T-Var formalization
[[vazou-mechanizing-refinement-types-2024]] — Mechanizing Refinement Types, self() formal definition
[[vazou-refinement-reflection-2018]] — Refinement Reflection, T-Exact, Fun sort, PLE
[[ou-et-al-2004]] — Dynamic Typing with Dependent Types, coined "selfification"

### Edges

[[selfification]] --[:COMPOSES_WITH]--> [[modalities]]
[[selfification]] --[:RELIES_ON]--> [[verification-pipeline]]
[[selfification]] --[:CONSTRAINS]--> [[first-order-restriction]]
[[first-order-restriction]] --[:CONSTRAINS]--> [[refinement-types]]
[[first-order-restriction]] --[:CONSTRAINS]--> [[selfification]]
[[first-order-restriction]] --[:PRESERVES]--> [[vc-ir]]
[[first-order-restriction]] --[:RELIES_ON]--> [[verification-pipeline]]
[[first-order-restriction]] --[:IMPLEMENTS]--> [[liquid-haskell-influence]]
[[ou-et-al-2004]] --[:INFORMS]--> [[selfification]]
[[knowles-flanagan-2010]] --[:INFORMS]--> [[selfification]]
[[knowles-flanagan-2010]] --[:INFORMS]--> [[first-order-restriction]]
[[vazou-mechanizing-refinement-types-2024]] --[:INFORMS]--> [[selfification]]
[[vazou-mechanizing-refinement-types-2024]] --[:INFORMS]--> [[first-order-restriction]]
[[vazou-refinement-reflection-2018]] --[:GENERALIZES]--> [[selfification]]
[[vazou-refinement-reflection-2018]] --[:INFORMS]--> [[liquid-haskell-influence]]
[[ou-et-al-2004]] --[:INFORMS]--> [[knowles-flanagan-2010]]

### Thread updates

[[verification-backend.thread]] item 22 added: selfification + first-order restriction

---

## session:explorer-evolution-thread — 2026-05-23 [explorer, tooling, display]

Created the explorer evolution thread and 6 planned/speculative feature zettels.

### New zettels

[[explorer-evolution.thread]] — thread hub for explorer roadmap
[[explorer-provenance-trace]] — provenance stack as navigable tree
[[explorer-cross-highlighting]] — click-to-highlight across tabs via meta/var IDs
[[explorer-diff-mode]] — stage diff and input diff side-by-side
[[explorer-snippet-library]] — curated/saved inputs, shareable URLs
[[explorer-timing]] — per-stage wall-clock measurement and waterfall
[[explorer-graph-viz]] — d3-based GRAM/MIR graph rendering (speculative)

### Thread updates

[[explorer-evolution.thread]] created with 7 items (1 implemented, 5 planned, 1 speculative)
README.md thread table updated

---

## session:snippet-library-impl — 2026-05-23 [explorer, tooling]

Implemented the explorer snippet library.

### Implementation

[[explorer-snippet-library]] implemented:
- 19 built-in snippets across 5 groups (Basics, Functions, Row types, Pattern matching, Blocks)
- `<select>` dropdown in Config sidebar, built dynamically from `SNIPPETS` array
- Selecting a snippet replaces editor content via CodeMirror dispatch
- Entirely client-side, no server changes

Files: `src/cli/explore/static/app.js`, `src/cli/explore/static/index.html`

### Status changes

[[explorer-snippet-library]] planned → implemented

### Zettel updates

[[explorer-snippet-library]] — body updated to reflect implementation
[[explorer-evolution.thread]] — item 5 marked implemented
[[pipeline-explorer]] — config sidebar description updated

## session:syn-app-ex-zettel — 2026-05-24 [verification, type-system, decision]

Restored dropped comment in synth.ts (noCapture) and extracted the Syn-App-Ex modification rationale into a z-yap zettel.
Branch: `i-dont-do-it-for-the-gram`.

### Codebase changes

**synth.ts comment restored:**
- `noCapture` usage in Lit synthesis re-annotated with "why" comment (dropped in Milestone 1 commit)

### New zettels

[[syn-app-ex-modification]] — why incorporate uses check instead of synth+subtype, extrinsic terms, selfified nf propagation

### Edges

[[syn-app-ex-modification]] --[:REVISES]--> [[application]]
[[syn-app-ex-modification]] --[:RELIES_ON]--> [[bidirectional-checking]]
[[syn-app-ex-modification]] --[:RELIES_ON]--> [[verification-pipeline]]
[[syn-app-ex-modification]] --[:USES]--> [[selfification]]
[[syn-app-ex-modification]] --[:INFORMS]--> [[knowles-flanagan-2010]]

### Thread updates

[[verification-backend.thread]] item 22 added: Syn-App-Ex modification (existing items renumbered)

---

## session:ivl-graph-alignment — 2026-05-25 [verification, ivl, documentation]

Aligned z-yap with the **current IVL-backed VC pipeline** while keeping Z3-era paper and theory zettels historically accurate. Hubs ([[verification-pipeline]], [[translation-boundary-vc]], [[vc-ir]], [[verification-backend.thread]]) and related zettels state **`IVL.Formula`** / `translate.ts → IVL`; [[smt-translation]] is framed as **deprecated Z3-direct** with body preserved. Solver-theory notes (EUF, CDCL(T), arithmetic, strings, etc.) tie **industrial SMT** to both Z3/cvc5 survey papers and Yap’s **`src/verification/solver/`** implementation without flattening to “IVL only”. **[[m1-implementation]]** left untouched (milestone record).

**Fix:** Replaced dead graph target `[[ivl]]` with `[[vc-ir]]` on the first-order-restriction edge (`connections.md` + corrected back-reference in prior session block).

**[[connections.md]]:** New “Industrial SMT ↔ IVL / CDCL(T) context” edges (Z3/cvc5/EUF/Nelson–Oppen/strings → pipeline / theory / milestone stubs).

**Lint:** Removed internal `docs/` path from [[verification-artefacts-revised]] per `init.md`.

### Edges (summary; full set in connections.md)

Industrial SMT papers and theory zettels linked to [[vc-ir]], [[verification-pipeline]], [[euf-theory]], [[milestone-3-strings]] as appropriate.

### Thread updates

[[verification-backend.thread]] — sequence refreshed (deprecated Z3 translation item, Syn-App-Ex item 23, selfification item 22).

---

## session:explorer-audit — 2026-05-27 [explorer, bugfix, elaboration, lowering, normalization, verification]

Systematic audit of all 19 explorer snippets through the full compiler pipeline. Surfaced and fixed 8 issues; identified 2 design gaps and 4 deferred/open items.

### New thread

SPAWN [[explorer-audit.thread]] — tracks the full audit workstream (15 items, 8 implemented, 2 needs-design, 2 open, 2 deferred, 1 planned).

### New zettels

- [[stuck-quoting-fix]] — `NF.quote` infinite recursion on stuck proj/inj with `deBruijn: "both"`
- [[explorer-snippet-syntax-fixes]] — four snippets had wrong surface syntax
- [[bridge-type-erasure]] — PI/SIGMA/VAR_META missing from bridge dispatch
- [[bridge-label-resolution]] — VAR_LABEL (`:x` references) missing from bridge dispatch
- [[pattern-row-binder-fix]] — `walkPatternRow` didn't push binder for row variable tails
- [[wraplambda-fix]] — `Rigid(0)` + unextended ctx in nested implicit Pi wrappers
- [[implicit-generalization-semantics]] — decision: unconstrained implicits generalize, not default to Type
- [[module-zonker-fix]] — told zonker from `letdec` dropped by `module.ts` `listen()`
- [[bridge-closure-capture]] — curried closures return bare FuncRef without capture bundling (needs-design)
- [[bridge-struct-dispatch]] — struct match emits string comparison instead of field dispatch (needs-design)
- [[vacuous-ivl-vcs]] — most VCs are tautologies `(= x x)` (deferred)
- [[nf-closure-display]] — closure wrappers noisy in NF display (deferred)
- [[verification-unconstrained-meta]] — unconstrained meta in variant match verification (open, may resolve via zonker fix)
- [[verification-rigid-mismatch]] — rigid mismatch in let binding verification (open, may resolve via zonker fix)

### Updated zettels

- [[gram-to-mir-bridge]] — status `planned` → `implemented`; noted known gaps
- [[pipeline-explorer]] — added audit reference

### Edges (summary; full set in connections.md)

[[explorer-audit.thread]] --[:INCLUDES]--> all 14 member zettels
[[explorer-audit.thread]] --[:SHARED_WITH]--> [[gram-evolution.thread]], [[elaboration-v2.thread]], [[pattern-matching.thread]], [[explorer-evolution.thread]]
Individual zettels connected via FIXES/ADDRESSES/MODIFIES/REVEALS/INFORMS/USES/MAY_RESOLVE_VIA to relevant domain zettels.

### Thread updates

[[gram-to-mir-bridge]] status → implemented
[[explorer-audit.thread]] created with 15-item sequence

---

## session:worklist-tags — 2026-05-28 [infrastructure, tooling, meta]

Introduced **tag-based worklists** as a third work-layer pattern alongside threads and queues. Unordered bags of items defined by tag membership (`tech-debt`, `backlog`, `bug`), discovered via adjacency during work, with scripts for on-demand catalogs.

### New vocabulary

Registered tags: `tech-debt`, `backlog`, `bug`, `improvement`.

### New zettels

- [[ffi-saturation-gram]] — GRAM saturation pass for foreign/primop refs (implemented)
- [[ffi-saturation-mir]] — deprecated MIR lowering saturation mechanism

### Updated zettels

- [[nf-closure-display]] — rewritten: not a bug, intentional NbE display; retagged backlog/improvement
- [[vacuous-ivl-vcs]] — rewritten: expected selfification behavior; retagged backlog/improvement
- [[block-level-using-gap]] — added `bug` tag
- [[documentation-debt]] — added `tech-debt` tag
- [[whnf-codification]] — added `tech-debt` tag
- [[where-clauses]], [[lsp]], [[repl]], [[module-system]], [[dynamic-reflection]], [[spineful-applications]] — added `backlog` tag
- [[ffi-saturation]] — deleted; split into gram/mir versions
- [[explorer-audit.thread]] — dropped items #11, #12 (`[~]`)
- [[global-pending-queue]] — resolved [[type-erasure]] (graduated to threads), [[ffi-saturation]] (split)
- [[thread-queue-system]] — documented tag-based worklist pattern

### New connections

[[type-erasure]] --[:INCLUDED_IN]--> [[usage-semantics.thread]], [[gram-evolution.thread]]
[[ffi-saturation-gram]] --[:SUPERSEDES]--> [[ffi-saturation-mir]]
[[ffi-saturation-gram]] --[:INCLUDED_IN]--> [[gram-evolution.thread]]

### Infrastructure

- [[manifest.yaml]] — fixed scripts section (was `catalog.py`, now lists all JS scripts)
- New scripts: `tech-debt.js`, `backlog.js`, `bugs.js` — tag-filtered catalogs with thread context

---

## Session: Pipeline Stabilization — integration test audit  @2026-05-29

Audited `language-tour.test.ts.snap` end-to-end across all passes (elaboration → normalization → GRAM → MIR → codegen). Flagged 13 issues, classified as bugs, architectural limitations, or backlog items. Created new thread and zettels.

### New vocabulary

- `limitation` — architectural constraint or design boundary, distinct from `bug` (defect)
- `stabilization` — focused fix/document effort after new visibility

### New zettels

- [[pipeline-stabilization.thread]] — thread hub for all issues surfaced by the integration audit
- [[eq-normalization-bug]] — `$eq` returns wrong result on equal literals (bug, planned)
- [[letpoly-implicit-escape]] — generalization leaks block-internal metas (bug, planned)
- [[maplist-schema-unification]] — mu-type schema row order mismatch (bug, needs-design)
- [[length-recursive-debruijn]] — recursive call resolves as wrong de Bruijn index (bug, planned)
- [[fst-closure-annotation]] — annotation swaps type parameters, possibly display-only (bug, planned)
- [[sigma-quoting-match]] — sigma body match can't reduce on symbolic binder (limitation, incomplete)
- [[sigma-quoting-field-ref]] — sigma body field ref resolves to type not value (limitation, incomplete)
- [[bridge-free-var-unknown]] — bridge emits `unknown` for var:free (bug, planned)
- [[bridge-label-closure-gap]] — label self-ref under match scope produces undefined (bug, planned)

### Connected existing zettels

- [[bridge-struct-dispatch]] — connected to stabilization thread (backlog)
- [[bridge-closure-capture]] — connected to stabilization thread (backlog)
- [[type-erasure]] — connected to stabilization thread (backlog)

### New connections

[[pipeline-stabilization.thread]] --[:INCLUDES]--> 12 items (9 new + 3 existing backlog)
[[pipeline-stabilization.thread]] --[:SHARED_WITH]--> [[gram-evolution.thread]], [[recursion.thread]], [[row-types.thread]]
Plus 30+ mechanism/context connections (see connections.md §Pipeline Stabilization)

---

## Session: Integration test split & snapshot hygiene — @2026-05-29

Split monolithic `language-tour.test.ts` (633 lines, 11.7k-line snapshot) into 11 focused
test files. Added `.gitattributes` to suppress snapshot diffs from PR stats. Extracted shared
`snap` helper into `helpers/pipeline.ts`.

### Codebase changes

**Test split:** `src/__tests__/integration/language-tour.test.ts` → 11 files:

- `primitives.test.ts` (1 test, 90 LOC snap)
- `functions.test.ts` (5 tests, 762 LOC snap)
- `records.test.ts` (6 tests, 587 LOC snap)
- `variants.test.ts` (8 tests, 1,556 LOC snap)
- `types.test.ts` (3 tests, 370 LOC snap)
- `polymorphism.test.ts` (6 tests, 758 LOC snap)
- `row-polymorphism.test.ts` (3 tests, 834 LOC snap)
- `type-constructors.test.ts` (3 tests, 591 LOC snap)
- `typeclasses.test.ts` (3 tests, 1,592 LOC snap)
- `higher-kinded.test.ts` (2 tests, 2,049 LOC snap)
- `dependent-types.test.ts` (4 tests, 771 LOC snap)
- `refinement-types.test.ts` (10 tests, 1,559 LOC snap)
- `ffi.test.ts` (2 tests, 237 LOC snap)

**Shared helper:** `snap()` moved from test file to `helpers/pipeline.ts` (exported).

**`.gitattributes`:** `**/__snapshots__/*.snap -diff` — suppresses snapshot line counts from PR diffs.

All 56 tests pass.

---

## Session: $eq normalization fix — @2026-05-29 [stabilization, bugfix, normalization, primitive]

Fixed pipeline stabilization item #1: `$eq` normalization bug.

### Root cause

`$eq` and `$neq` in `PrimOps` used `lodash.isEqual` on full `NF.Value` objects. Every `NF.Value`
carries a unique `id` from `mk(nextId())`, so two structurally identical literals always compared
unequal. All other primops (`$lt`, `$gt`, `arithmetic`, `logical`) extracted payloads before
comparing and were unaffected.

### Fix

Introduced `equality` helper in `src/shared/lib/primitives.ts` that extracts the `Literal`
payload (`.value`) before comparing. Applied to `$eq` and `$neq`.

### Status changes

[[eq-normalization-bug]] planned → implemented

### Thread updates

[[pipeline-stabilization.thread]] item 1 → implemented

---

## Session: Bridge free var fix — @2026-05-29 [stabilization, bugfix, lowering, graph]

Fixed pipeline stabilization item #8: bridge free var → unknown.

### Root cause

`Leaves.free` in `src/GRAM/bridge/leaves.ts` followed a `:refers_to` edge from the `VAR_FREE`
definition node, but definition nodes are targets of `:refers_to`, not sources. The name was
already on the node's own `payload.name`. One-line fix: read `payload.name` directly.

### Status changes

[[bridge-free-var-unknown]] planned → implemented

### Thread updates

[[pipeline-stabilization.thread]] item 8 → implemented

---

## Session: fst closure annotation fix

### Problem

`Ann` nodes (type annotations on inferred lambdas) stored `NF.Value`s whose closures captured the elaboration context *before* `wrapLambda` added implicit binders. When displayed or consumed by verification, Rigid level variables resolved against the stale environment, producing wrong annotations (e.g. `Π(y: x)` instead of `Π(y: b)`) and spurious "Rigid variables do not match" verification failures.

### Fix

Changed `Ann` to carry an `EB.Term` (quoted Pi) instead of `NF.Value`. De Bruijn indices are context-independent, so consumers (`synth.ts`, `pretty.ts`) evaluate the term in their current context, getting correct resolution.

Touched 7 files: `term.ts` (type), `lambda.ts` (construction), `pretty.ts` (display), `synth.ts` (verification), `traversal.ts`, `metas.ts`, `implicits.ts`.

### Results

- `fst` annotations now show `Π(y: b) -> a` and `Π(x: a) -> Π(y: b) -> a` (correct)
- Verification "Rigid variables do not match" errors eliminated for `fst`
- All integration (56), elaboration (199), verification (114), lowering (92) tests pass

### Status changes

[[fst-closure-annotation]] planned → implemented

### Thread updates

[[pipeline-stabilization.thread]] item 5 → implemented

### Collateral fix: let-poly implicit escape

[[letpoly-implicit-escape]] was reported as a separate bug but turns out to be the composition of two already-fixed defects: [[module-zonker-fix]] (zonker propagation) and [[fst-closure-annotation]] (Ann EB.Term fix). Type is now `Num`, normalized `42`, annotations correct. No new code changes needed.

### Status changes

[[letpoly-implicit-escape]] planned → implemented

### Thread updates

[[pipeline-stabilization.thread]] item 2 → implemented

---

## Session: length recursive de Bruijn fix

### Problem

Recursive self-references (e.g. `length` calling itself inside a match `Cons` branch) produced `var:bound` GRAM nodes with no `:refers_to` edge, cascading to `unknown` in MIR and codegen. Two independent causes compounded:

1. `walkPattern` for variant patterns walked the payload but ignored the rest row (`ext.row`), so the rest row variable binder was never pushed onto the GRAM binder stack.
2. Module-level let-decs are compiled independently by `GRAM.Pipeline.compile` with an empty binder stack, so recursive self-references (de Bruijn indices escaping the term's own binders) had no resolution target.

### Fix

1. **Variant rest row** (`translate.ts`): call `walkPatternRow(ext.row, ...)` after walking the payload, matching what elaboration does for pattern binders.
2. **Parent binders** (`translate.ts`, `pipeline/index.ts`): `translate` accepts `parentBinders` — names pushed as `stmt:let` nodes onto the binder stack at init. Call sites pass `[name]` for let-decs. Same mechanism `abs` and `mu` use for their own binders.

Also added a DOT (Graphviz) exporter for GRAM graphs (`dot.ts`) and a DOT tab in the explorer.

### Results

- `length` self-reference now has `:refers_to` edge to parent `stmt:let` node
- Implicit `a` parameter reference also correctly resolves (was previously broken too)
- All integration (56), GRAM (162), elaboration (199) tests pass
- Non-recursive let-decs unaffected (parent node only created when passed)

### Status changes

[[length-recursive-debruijn]] planned → implemented

### Thread updates

[[pipeline-stabilization.thread]] item 4 → implemented

---

## Session: mapList Schema unification fix

### Problem

`mapList : (a: Type) => (b: Type) => (a -> b) -> List a -> List b` fails to elaborate with "Variable Mismatch: Cannot unify L2 with L6". The return type `List b` (where `b` is at de Bruijn level 2) becomes `List <level 6>` inside the cons branch because the quoted return type uses indices relative to the pre-pattern-binder context.

### Root cause

`check.ts` quotes the match return type (`ty`) to `EB.Term` at the pre-extension level, then re-evaluates it inside each branch after `extend(binders)` has prepended pattern binders. The variant pattern `#cons { x, xs }` introduces 4 binders (two struct fields + two row variables), shifting all prior env entries. The quoted `Bound{index: 2}` (meant to be `b`) resolves to `xs` (Rigid level 6) instead.

The quote-evaluate round-trip exists for dependent match return types (scrutinee narrowing). The quoting position was the bug, not the mechanism.

### Fix

Moved the quote-evaluate round-trip inside the branch body, after pattern binders have been added to the context. The quoting now happens at the extended level, so de Bruijn indices align with the extended env. Dependent matching (e.g. `match x | 0 -> Num | _ -> String`) continues to work — the `pi-types.test.ts` and `shift-reset.test.ts` dependent match tests all pass.

### Regression trace

Introduced in commit `5aa4638` (Dec 2025, "wip") when the general match-check-with-narrowing path was added. No pre-existing test covered checked match + polymorphic return type + destructuring pattern. The `length` function avoids the bug because its return type is `Num` (no type variable to misalign).

### Results

- `mapList` and `ListFunctor` elaborate and normalize correctly
- Dependent match tests pass (pi-types, shift-reset)
- All 77 non-codegen test files pass, 786 tests green
- Pre-existing C codegen path mismatch unaffected (unrelated)

### Status changes

[[maplist-schema-unification]] needs-design → implemented

### Thread updates

[[pipeline-stabilization.thread]] item 3 → implemented

---

## Session: Bridge forward label references investigation

### Investigation

While investigating #9 (Bridge label resolution in closures), discovered that struct field label references only resolve backward — `:b` in field `a` when `b` follows `a` resolves to an unbound name. The left-to-right single-pass emission in `emit.ts` binds each label after walking its value, so forward refs are never in scope.

Attempted a two-pass pre-binding approach: allocate MIR slots for all labels before walking any values. The names resolve, but the emitted code produces use-before-def — the slot variable appears in arithmetic before the instruction that assigns it. Under eager evaluation this computes `undefined + 1`.

The correct fix requires a dependency ordering pass: topologically sort fields by their label references before emission, so every forward-referenced value is computed before use. Deferred as a design task.

### Edges

[[bridge-forward-label-refs]] --[:DISCOVERED_BY]--> [[bridge-label-closure-gap]]
[[bridge-label-resolution]] --[:LACKS]--> [[bridge-forward-label-refs]]
[[bridge-forward-label-refs]] --[:APPLIES_TO]--> [[gram-to-mir-bridge]]

### Actions

SPAWN [[bridge-forward-label-refs]] — forward label refs in struct emission, needs dependency ordering

### Thread updates

[[pipeline-stabilization.thread]] item 9a spawned (forward label refs, planned, needs-design)

---

## Session: Explorer audit thread archival

Reviewed [[explorer-audit.thread]] against current codebase state. Items 1–8 and 13–14 were already correctly marked implemented/dropped/decision. Remaining open items:

- #9 ([[bridge-closure-capture]]) and #10 ([[bridge-struct-dispatch]]) are tracked on [[pipeline-stabilization.thread]] (#12 and #11 respectively). Added backlinks in the thread body.
- #15 (test rename) deferred — low priority housekeeping, no zettel.

All actionable work from this thread is either complete or tracked on the stabilization thread. Marked `active` → `archived`.

### Actions

ARCHIVED [[explorer-audit.thread]] — all items implemented, dropped, or tracked on [[pipeline-stabilization.thread]]

---

## Session: Sigma bindings analysis and codata syntax proposal

### Investigation

Deep analysis of the sigma bindings implementation across the elaboration pipeline (syntax, context, inference, checking, NbE, unification, GRAM). Identified the two-step row-abstraction architecture of sigma, its relationship to mutual recursion, the singleton type interaction, and the fundamental distinction between sigma (dependent type-level field references) and codata (value-level self-reference).

### Key findings

1. **Sigma architecture**: Sigma types are abstractions over rows via standard closure capture. They share the `Abs` node with Pi/Lambda intentionally — the closure mechanism provides the deferred application needed for dependent records. The binder variable `$sig` is phantom (no de Bruijn semantics); dependency flows through label-keyed lookups into `ctx.sigma`. This is a deliberate departure from standard telescopic sigma where binding order encodes dependency — Yap's flat rows allow unordered mutual references like `{ a: :b, b: :a }`, analogous to mutually recursive letrec bindings.

2. **Value semantics**: Field references in sigma types denote the field's value, not its type annotation. This follows standard dependent pair semantics and mirrors Pi codomain behavior: `(x: Num) -> x` has codomain `x` (a value). Singleton types (`1 : 1`) make this coherent for non-Type fields — `{ fst: Num, snd: :fst }` classifies equal-valued pairs.

3. **Singleton types**: Yap has singleton types for numeric literals via two bidirectional checking cases, with no dedicated AST node. This is a significant feature that interacts with sigma checking.

4. **Sigma checking bug**: The `check([struct, Sigma])` case uses infer-then-constrain, bypassing the bidirectional checking direction. Both `{ fst: 1, snd: 1 }` (should pass) and `{ fst: 1, snd: 5 }` (should fail with `5 ≠ 1`) produce the wrong error `Num ~~ 1` because inference always gives `1 : Num`, never invoking the singleton check.

5. **Two mechanisms behind `:label`**: Type-level field references are sigma (parametric, deferred — the closure resolves when a concrete row is provided). Value-level field references are self-reference (eager, all field values simultaneously in scope). The connection to mutual recursion is the key insight: flat-row sigma is structurally a mutually recursive let-binding; sigma defers resolution (closure), self-reference resolves eagerly (fixed point). The deferred case is dependent typing; the eager case is codata.

6. **Codata vs coinductive types**: Codata (data defined by observations) is the practical programming need — computed fields, recursive records, streams. Coinductive types (`ν X. F(X)`) with bisimulation equality and productivity checking are the type-theoretic generalization. Yap's immediate use case is codata records; full coinductive types are a larger commitment. Nu types as sketched sit between these — co-opting greatest-fixed-point machinery for codata without committing to coinductive type theory.

7. **Syntax proposal**: Separate sigils for sigma and codata field references. Leading candidates: `:` for codata (lighter, more common), `&`/`*`/`\`/`^` for sigma. `*` has multiplication ambiguity (likely impractical). `&` could serve either role depending on whether codata is implemented via references. `\` echoes lambda abstraction. `^` is neutral and unambiguous. Decision deferred.

### Edges

[[sigma-architecture]] --[:DETAILS]--> [[sigma-types]]
[[sigma-architecture]] --[:DETAILS]--> [[sigma-bindings]]
[[sigma-architecture]] --[:RELIES_ON]--> [[standard-closure]]
[[sigma-architecture]] --[:CONTRASTS_WITH]--> [[pi-types]]
[[sigma-architecture]] --[:APPLIES_TO]--> [[unified-binder]]
[[sigma-value-semantics]] --[:DETAILS]--> [[sigma-types]]
[[sigma-value-semantics]] --[:MIRRORS]--> [[pi-types]]
[[sigma-value-semantics]] --[:RELIES_ON]--> [[singleton-types]]
[[sigma-value-semantics]] --[:COMPOSES_WITH]--> [[refinement-types]]
[[singleton-types]] --[:ENABLES]--> [[sigma-value-semantics]]
[[singleton-types]] --[:RELIES_ON]--> [[bidirectional-checking]]
[[singleton-types]] --[:COMPOSES_WITH]--> [[sigma-types]]
[[sigma-checking-infer-constrain]] --[:APPLIES_TO]--> [[sigma-types]]
[[sigma-checking-infer-constrain]] --[:APPLIES_TO]--> [[sigma-bindings]]
[[sigma-checking-infer-constrain]] --[:RELIES_ON]--> [[singleton-types]]
[[sigma-checking-infer-constrain]] --[:APPLIES_TO]--> [[bidirectional-checking]]
[[sigma-vs-codata-label-refs]] --[:DETAILS]--> [[sigma-types]]
[[sigma-vs-codata-label-refs]] --[:DETAILS]--> [[codata]]
[[sigma-vs-codata-label-refs]] --[:APPLIES_TO]--> [[label-lookup]]
[[sigma-vs-codata-label-refs]] --[:MOTIVATES]--> [[nu-types]]
[[sigma-vs-codata-label-refs]] --[:MOTIVATES]--> [[sigma-codata-syntax-proposal]]
[[sigma-vs-codata-label-refs]] --[:COMPOSES_WITH]--> [[mutual-recursion]]
[[codata-vs-coinductive-types]] --[:DETAILS]--> [[codata]]
[[codata-vs-coinductive-types]] --[:DETAILS]--> [[coinductivity]]
[[codata-vs-coinductive-types]] --[:DETAILS]--> [[nu-types]]
[[codata-vs-coinductive-types]] --[:APPLIES_TO]--> [[structural-records]]
[[sigma-codata-syntax-proposal]] --[:APPLIES_TO]--> [[sigma-types]]
[[sigma-codata-syntax-proposal]] --[:APPLIES_TO]--> [[codata]]
[[sigma-codata-syntax-proposal]] --[:APPLIES_TO]--> [[label-lookup]]
[[sigma-codata-syntax-proposal]] --[:RELIES_ON]--> [[sigma-vs-codata-label-refs]]
[[sigma-codata-syntax-proposal]] --[:RELIES_ON]--> [[codata-vs-coinductive-types]]

### Actions

SPAWN [[sigma-architecture]] — two-step row abstraction mechanics of sigma binders
SPAWN [[sigma-value-semantics]] — field references always denote values, not types
SPAWN [[singleton-types]] — numeric literals as singleton types via bidir checking
SPAWN [[sigma-checking-infer-constrain]] — bug: infer-then-constrain bypasses singleton check
SPAWN [[sigma-vs-codata-label-refs]] — sigma/codata duality behind field reference syntax
SPAWN [[codata-vs-coinductive-types]] — codata programming vs coinductive type theory
SPAWN [[sigma-codata-syntax-proposal]] — syntax proposal for distinct sigma/codata sigils

### Thread updates

[[row-types.thread]] — add [[sigma-checking-infer-constrain]] (ready), [[sigma-codata-syntax-proposal]] (needs-design)
[[recursion.thread]] — add [[codata-vs-coinductive-types]] (needs-design), [[sigma-vs-codata-label-refs]] (needs-design)

### Summary

Sigma bindings analysis revealed the two-step architecture: sigma types are row abstractions using standard closure capture, where dependency flows through label-keyed lookups rather than de Bruijn binding. The flat-row design is analogous to mutually recursive letrec — unordered fields, simultaneous scope — with sigma providing deferred resolution via closure application. This architecture is sound and intentional, though underdocumented.

The `:label` syntax conflates two mechanisms: sigma dependency (parametric, type-level) and codata self-reference (fixed point, eager, value-level). The connection to codata and coinductivity clarified that Yap's immediate need is codata records (computed fields, recursive records, streams), while full coinductive types with bisimulation equality and productivity checking are a larger theoretical commitment that may or may not follow. Nu types as currently sketched serve codata without committing to coinductivity.

A syntax split proposal with candidate sigils (`:`, `&`, `*`, `\`, `^`) was developed. Decision deferred pending the codata/nu commitment.

Independently, the `check([struct, Sigma])` case has a bug: infer-then-constrain bypasses singleton types in sigma-dependent positions. Fix: traverse-and-check like `[struct, Schema]`. This is actionable regardless of the syntax decision.

---

## Session: Sigma checking fix

### Fix

The `check([struct, Sigma])` case used infer-then-constrain, which bypassed bidirectional checking and broke singleton types in sigma-dependent positions. Fixed by inferring the struct (to get the value row for sigma closure application), then re-checking the source struct against the applied sigma body via `check(sourceStruct, appliedBody)`. This delegates to `[struct, Schema]` which traverses each field and checks individually, preserving the checking direction.

`{ fst: 1, snd: 1 }` against `{ fst: Num, snd: :fst }` now succeeds (`check(1, 1)` fires). `{ fst: 1, snd: 5 }` now fails with `Cannot unify 5 with 1` (not the previous `1 with Num`).

### Status changes

[[sigma-checking-infer-constrain]] ready → implemented

### Thread updates

[[row-types.thread]] item 15 → implemented

---

## Session: Sigma quoting fix — symbolic row application

**Date:** 2026-05-31
**Tags:** normalization, dependent, sigma, quoting, bugfix

### Edges

[[sigma-quoting-field-ref]] --[:GROUNDED_IN]--> [[sigma-architecture]]
[[sigma-quoting-match]] --[:GROUNDED_IN]--> [[sigma-architecture]]
[[sigma-quoting-field-ref]] --[:MIRRORS]--> [[quoting]]
[[sigma-quoting-match]] --[:MIRRORS]--> [[quoting]]

### Actions

RESOLVED [[sigma-quoting-field-ref]] — limitation → implemented (symbolic row preserves label refs)
RESOLVED [[sigma-quoting-match]] — limitation → implemented (symbolic row produces StuckMatch)

### Status changes

[[sigma-quoting-field-ref]] limitation, incomplete → bugfix, implemented
[[sigma-quoting-match]] limitation, incomplete → bugfix, implemented

### Thread updates

[[pipeline-stabilization.thread]] items 6 and 7 → implemented

### Summary

Fixed the sigma quoting bug in `src/elaboration/normalization/quoting.ts`. The root cause: sigma quoting applied the closure to the concrete type annotation row (`binder.annotation`), so label references resolved to field types (collapsing dependencies) and matches over fields crashed ("No alternative matched") because the scrutinee was a type like `Bool` rather than a symbolic value.

The fix constructs a symbolic NF.Row where each field is a neutral label variable (`NF.Neutral(NF.Var({ type: "Label", name: label }))`), analogous to how Pi quoting applies to `Rigid(lvl)`. This produces the right inputs for the existing StuckMatch mechanism: matches over label neutrals get stuck instead of crashing, and label references preserve through readback. Both [[sigma-quoting-field-ref]] and [[sigma-quoting-match]] resolved by the same change.
