# Thread

Append-only paper trail of design and implementation work. Each block records a
session's path through the zettel graph — what was explored, what was decided,
what was deferred.

Format: edge lines (`[[A]] -- verb -> [[B]]`) and action lines (`ENQUEUE`, `RESOLVED`, `SPAWN`).
See [[thread-queue-system.thread]] for the full system design.

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
[[z3-replacement.adr]] planned → in-progress
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
[[first-order-restriction.adr]] — first-order boundary for refinements, three enforcement points
[[knowles-flanagan-2010]] — Hybrid Type Checking paper, T-Var formalization
[[vazou-mechanizing-refinement-types-2024]] — Mechanizing Refinement Types, self() formal definition
[[vazou-refinement-reflection-2018]] — Refinement Reflection, T-Exact, Fun sort, PLE
[[ou-et-al-2004]] — Dynamic Typing with Dependent Types, coined "selfification"

### Edges

[[selfification]] --[:COMPOSES_WITH]--> [[modalities]]
[[selfification]] --[:RELIES_ON]--> [[verification-pipeline]]
[[selfification]] --[:CONSTRAINS]--> [[first-order-restriction.adr]]
[[first-order-restriction.adr]] --[:CONSTRAINS]--> [[refinement-types]]
[[first-order-restriction.adr]] --[:CONSTRAINS]--> [[selfification]]
[[first-order-restriction.adr]] --[:PRESERVES]--> [[vc-ir]]
[[first-order-restriction.adr]] --[:RELIES_ON]--> [[verification-pipeline]]
[[first-order-restriction.adr]] --[:IMPLEMENTS]--> [[liquid-haskell-influence]]
[[ou-et-al-2004]] --[:INFORMS]--> [[selfification]]
[[knowles-flanagan-2010]] --[:INFORMS]--> [[selfification]]
[[knowles-flanagan-2010]] --[:INFORMS]--> [[first-order-restriction.adr]]
[[vazou-mechanizing-refinement-types-2024]] --[:INFORMS]--> [[selfification]]
[[vazou-mechanizing-refinement-types-2024]] --[:INFORMS]--> [[first-order-restriction.adr]]
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

**Fix:** Replaced dead graph target `[[ivl]]` with `[[vc-ir]]` on the first-order-restriction.adr edge (`connections.md` + corrected back-reference in prior session block).

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
- [[thread-queue-system.thread]] — documented tag-based worklist pattern

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

---

## Session: Thread hygiene — concept vs work item separation  @2026-06-01

Audited all thread members for untagged (`~`) items in `threads.js` output. Found 27 zettels connected via `INCLUDES` that lacked maturity tags — most were concept, decision, hub, or reference zettels misclassified as work items. Applied three remedies:

1. **Clear removes (16):** Concept/decision/hub/reference zettels re-wired from `INCLUDES` to semantic edges (`RELIES_ON`, `DOCUMENTS`, `REFERENCES`, `CONTRASTS_WITH`, `USES`).
2. **Clear keeps (6):** Genuine work items given `planned` maturity tag.
3. **Borderline splits (5):** Concept zettels with `needs-design` split into concept (re-wired as `RELIES_ON`) + new design zettel (kept as `INCLUDES` work item with `planned` + `needs-design`).

Also changed `threads.js` default maturity from `"open"` to `"~"` so untagged zettels no longer appear misleadingly as open work items.

### Script changes

- `threads.js`: default maturity `"open"` → `"~"`, symbol `"○"` → `" "`

### Vocabulary additions

New labels: `DOCUMENTS`, `REFERENCES`.
New tag: `design`.

### Re-wired connections (concept zettels removed from INCLUDES)

[[explorer-audit.thread]] --[:DOCUMENTS]--> [[implicit-generalization-semantics]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[crud-strategy-choice]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[gram-additive-enrichment]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[gram-dataflow-semantics]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[dpo-vs-imperative-passes]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[compilation-by-selection]]
[[pattern-matching.thread]] --[:RELIES_ON]--> [[pattern-algorithm-choice]]
[[usage-semantics.thread]] --[:RELIES_ON]--> [[modalities]]
[[usage-semantics.thread]] --[:RELIES_ON]--> [[modal-type-theory]]
[[usage-semantics.thread]] --[:RELIES_ON]--> [[modality-system]]
[[usage-semantics.thread]] --[:RELIES_ON]--> [[verification-modal-phase]]
[[usage-semantics.thread]] --[:REFERENCES]--> [[idris-1-qtt-paper]]
[[verification-backend.thread]] --[:RELIES_ON]--> [[vc-normalization]]
[[verification-backend.thread]] --[:REFERENCES]--> [[required-formula-forms]]
[[verification-backend.thread]] --[:RELIES_ON]--> [[required-theory-support]]
[[verification-backend.thread]] --[:RELIES_ON]--> [[verification-backend]]
[[row-types.thread]] --[:RELIES_ON]--> [[row-theory]]
[[row-types.thread]] --[:RELIES_ON]--> [[open-closed-variants]]
[[pattern-matching.thread]] --[:RELIES_ON]--> [[open-closed-variants]]
[[recursion.thread]] --[:RELIES_ON]--> [[bisimulation-type-equality]]
[[recursion.thread]] --[:DOCUMENTS]--> [[sigma-vs-codata-label-refs]]

### Maturity tags added

[[fuzz-testing]] +planned
[[property-based-testing]] +planned
[[integration-testing]] +planned
[[negative-testing]] +planned
[[sigma-codata-syntax-proposal]] +planned
[[vc-provenance]] +planned

### New design zettels (borderline concept → design split)

SPAWN [[design-open-closed-variant-semantics]] — design: variant openness semantics (pattern-matching, row-types threads)
SPAWN [[design-bisimulation-equality]] — design: bisimulation-based μ-type equality (recursion thread)
SPAWN [[design-row-theory-verification]] — design: row theory for verification backend (row-types thread)
SPAWN [[design-vc-normalization]] — design: VC normalization pass (verification-backend thread)
SPAWN [[design-sigma-codata-label-refs]] — design: sigma vs codata field ref semantics (recursion thread)

### Design zettel connections

[[design-open-closed-variant-semantics]] --[:ADDRESSES]--> [[open-closed-variants]]
[[design-bisimulation-equality]] --[:ADDRESSES]--> [[bisimulation-type-equality]]
[[design-row-theory-verification]] --[:ADDRESSES]--> [[row-theory]]
[[design-vc-normalization]] --[:ADDRESSES]--> [[vc-normalization]]
[[design-sigma-codata-label-refs]] --[:ADDRESSES]--> [[sigma-vs-codata-label-refs]]

### Prior session changes (included in same commit)

Re-wired 7 constraint-solving concept zettels from `INCLUDES` to semantic edges on [[elaboration-v2.thread]]:
[[elaboration-v2.thread]] --[:USES]--> [[constraint-solver]]
[[elaboration-v2.thread]] --[:RELIES_ON]--> [[constraint-solving]]
[[elaboration-v2.thread]] --[:RELIES_ON]--> [[deferred-constraint-solving]]
[[elaboration-v2.thread]] --[:CONTRASTS_WITH]--> [[eager-constraint-solving]]
[[elaboration-v2.thread]] --[:RELIES_ON]--> [[assign-before-resolve]]
[[elaboration-v2.thread]] --[:RELIES_ON]--> [[empty-subst-guard]]
[[elaboration-v2.thread]] --[:USES]--> [[implicit-resolution-solver]]

### Summary

Established a clean separation between knowledge (concept/decision/reference zettels) and active work (design/implementation zettels) in thread membership. Concept zettels remain connected to threads via semantic edges (`RELIES_ON`, `DOCUMENTS`, `REFERENCES`) — they inform the thread's domain but are not tracked as work items. For borderline cases (concepts with `needs-design`), new design zettels capture the active work while the concept zettel retains pure knowledge. This eliminates misleading "open" statuses in thread listings and makes the work layer an accurate representation of actionable items.

---

## Session: Bubble Semantics Phase 1 Implementation

Date: 2026-06-01

### Changes

Implemented `Bubble` constructor for `EB.Term`, replacing the `Var(Meta(skolem))` + `state.skolems` indirection at shift use sites.

**Milestone 1**: Added `Bubble` to `EB.Term` union, `Constructors.Bubble` factory, `CtorPatterns.Bubble`, and `Patterns.Bubble` in lowering.

**Milestone 2**: Modified `shift.ts` to produce `EB.Constructors.Bubble(skolem.val, A, [], Shift(body))` instead of `EB.Constructors.Var(skolem)`.

**Milestone 3**: Added `Bubble` cases to all 7 traversal passes:
- `pretty.ts` — display as `bubble#ID (shift ...)`
- `metas.ts` — collect metas from `shift` subterm
- `freevars.ts` — collect free vars from `shift` subterm
- `evaluation.v2.ts` — evaluate inner Shift when delimiter present; produce neutral otherwise
- `synth.ts` — emit neutral true formula (opaque stub)
- `translate.ts` (GRAM) — walk inner shift subterm
- `lower.ts` — delegate to inner shift

**Milestone 4**: Removed `state.skolems` from `MutState` and all call sites:
- `monad.v2.ts`, `shift.ts`, `evaluation.v2.ts`, `generalization.ts`, `module.ts`, `statements.ts`, `nondeterminism.ts`, `pretty.ts`, `translate.ts` (GRAM), `pipeline/index.ts`, `pipeline.ts` (CLI/test), test utilities

**Milestone 5**: All tests pass (794 passed, 51 skipped). Updated snapshots for shift-reset and evaluation tests. Adapted "shifts under a lambda" test to reflect new neutral-on-missing-delimiter semantics. 5 pre-existing trace.test.ts failures confirmed unrelated.

**Milestone 6**: Style audit — shift.ts and patterns.ts clean; all violations pre-existing.

### Files changed (27)

src/elaboration/syntax/term.ts, src/lowering/patterns.ts, src/elaboration/inference/shift.ts, src/elaboration/pretty/pretty.ts, src/elaboration/shared/metas.ts, src/lowering/shared/freevars.ts, src/elaboration/normalization/evaluation.v2.ts, src/verification/V2/synth.ts, src/GRAM/translate.ts, src/lowering/lower.ts, src/elaboration/shared/monad.v2.ts, src/elaboration/normalization/generalization.ts, src/elaboration/module.ts, src/elaboration/inference/statements.ts, src/elaboration/solver/nondeterminism.ts, src/GRAM/pipeline/index.ts, src/cli/explore/pipeline.ts, src/__tests__/integration/helpers/pipeline.ts, src/elaboration/__tests__/utils.ts, src/elaboration/inference/__tests__/util.ts, src/verification/__tests__/helpers.ts, src/GRAM/__tests__/translate.test.ts, src/elaboration/normalization/__tests__/evaluation.v2.test.ts, src/elaboration/normalization/__tests__/generalization.test.ts, + snapshot files

### Design decision: NbE behavior

Bubble produces a neutral value (stuck meta) when no Reset delimiter is on the NbE evaluation stack. This preserves the old behavior where `Var(Meta(skolem))` was opaque during elaboration NbE. When a delimiter IS present (inside a Reset), Bubble evaluates its inner Shift normally.

### Post-plan: Bubble.values injection (AC #6)

**Attempt 1 (reverted)**: Added `injectBubbleValues` term traversal in `term.ts` — recursive walk populating Bubble values from `nondeterminism.solution`. Called at let-boundary and expression path. Violated Yap's no-traversal architectural principle (the entire env/NbE/zonker design exists to eliminate term walks).

**Attempt 2 (current)**: Populated `Bubble.values` inline at construction in `shift.ts` by reading `nondeterminism.solution[skolem.val]` from monadic state. The solution map is already populated by `resume` before `shift.ts` constructs the Bubble. No post-processing pass needed. Removed `injectBubbleValues` and its call sites in `statements.ts` and `module.ts`.

**Future work**: Created `[[tell-listen-resumption-refactor]]` tech-debt zettel — replace `nondeterminism.solution` accumulator with Writer-like `tell`/`listen` pattern. Connected to `[[delimited-continuations.thread]]`.

---

## Session: Programmable GRAM passes design — 2026-06-02 [gram, modality, lowering, design, rewriting]

Designed the extensibility mechanism for compiler lowering. User-written DPO rewrite rules participate in GRAM via the modality system: a `gram` field on `Modal.Annotations` carries an `EB.Term` elaborating to a stdlib `Rule` value. A Kernel meta-pass discovers rules transitively by reference, computes ordering from structurally-derived `requires`/`produces` (LHS pattern tags / RHS constructor tags), evaluates rule definitions via NbE, and runs them through the existing match/rewrite engine in `src/GRAM/grs/`. Predicates are plain Yap lambdas applied as `NF.Value` closures; FFI and non-reducing constructs stay stuck and surface as well-formedness rejection.

Defaults like monomorphization are expressed as static DPO rules with a structural filter for absence of modal annotations. Static-pipeline passes require no awareness of modal payload; additive enrichment guarantees they ignore unfamiliar tags. Selection semantics for the case where multiple annotations decorate the same subgraph was deferred — codegen-time preference, project configuration, and explicit override directives are all candidates.

Repositioned compiler extensibility broadly: Yap declines elaborator metaprogramming (Lean `Elab`, Idris `%runElab`) in favor of typed modality consumers — verification, usage, GRAM — each reading their dimension off `Modal.Annotations`. Liquid refinement checking and the in-flight QTT usage pass implement the pattern; the GRAM Kernel is the third instance. Captured as ADR in `[[extensibility-via-modalities.adr]]`.

Tailcall was rejected as a fit — tail position is a structural property the compiler determines. Canonical use cases are mono/run-poly, defunctionalization, function-pointer vs synthetic closure, PAP representation, lambda lifting, ABI-specific calling conventions, and fusion rules.

### Decisions

1. `Modal.Annotations` gains a `gram?: List Rule` field, not an extensible row. Row extensibility deferred.
2. Users write DPO rewrite rules as Yap struct literals; no embedded DSL, no quotation. Minimal v1 surface; `add_node`-style primitives deferred.
3. Predicates are plain Yap lambdas (`Payload -> Bool`, `Bindings -> Payload`), applied via `NF.apply`. Stuck reductions are non-matches; rule failure on stuck builders.
4. Rule discovery/ordering at GRAM-pipeline time via a Kernel meta-pass that reads `requires`/`produces` structurally from rule LHS/RHS and reuses the existing `Descriptor`/`configure.ts` topo-sort.
5. Activation is by reference only — no global registration, no implicit attribute database. Tree-shaking is structural.

### Prior art

- **MLIR Transform Dialect** `[[mlir-transform-dialect]]` — transformations expressed as ops in the IR being transformed; bootstrap arc from C++ to dialect-native.
- **T-LINQ** `[[t-linq]]` (Cheney/Lindley/Wadler ICFP 2013) — restricted host sublanguage normalized to a domain residual; stuck terms as the well-formedness boundary.
- **Koka effect handlers** `[[koka-influence]]` — handler-as-value, named at the use site, as the architectural dual of attribute-database registration.
- **F\* `Tac` and Lean `TacticM`** — typed metaprogramming monads with kernel interpretation; contrasted as a deliberate non-direction for Yap.

### Spawned

`[[programmable-gram-passes]]` (design hub), `[[gram-kernel-pass]]`, `[[gram-rule-as-yap-value]]`, `[[pass-activation-by-reference]]`, `[[extensibility-via-modalities.adr]]`, `[[mlir-transform-dialect]]`, `[[t-linq]]`, `[[programmable-gram-passes-design.session]]`.

### Updates

- `[[passes-in-yap]]` — speculative self-hosted-passes paragraph replaced with reference to the new design.
- `[[koka-influence]]` — added handler-as-value influence section.
- `[[modality-system]]` — gram listed as third dimension under Extensibility.
- `[[gram-evolution.thread]]` — added sequence item 19.
- `[[sessions.hub]]` — added session to includes.

---

## Session: ADR formalisation + meta-thread followups — @2026-06-02 [meta, infrastructure, tooling, decision]

Formalised the ADR convention in z-yap. New vocabulary in `REGISTRY.md`: `adr` tag clarified, ADR lifecycle tags (`proposed`, `accepted`, `superseded`, `subsumed`), `frozen` meta tag, `adr:` ref prefix, `todo` work tag. Parser (`scripts/lib/parse.js`) extended to extract `adr-id` and any scalar frontmatter key into `zettel.scalars`. ADR identifier convention: `<slug>.adr.md` filename + `adr-id: D-NNN` frontmatter; other zettels reference via `refs: [adr:D-NNN]`.

Five ADRs landed, all `accepted`: D-001 `[[z3-replacement.adr]]` (renamed from `z3-replacement-decision`), D-002 `[[gram-graph-ir.adr]]` (new positive ADR; `[[gram-as-s-expressions]]` kept as `REJECTS` companion), D-003 `[[first-order-restriction.adr]]` (renamed), D-004 `[[direct-style-lowering.adr]]` (new positive ADR; `[[selective-cps]]` kept as `REJECTS` companion), D-005 `[[extensibility-via-modalities.adr]]` (existing filename; added `adr-id` + lifecycle). All slug renames flowed through `connections.md`, `thread.md`, and inbound zettel bodies; only the immutable session JSONL retains old slugs.

Two scripts added: `scripts/adrs.js` (index + consistency report; modes `--markdown`, `--consistency-only`, `--status`, `--decisions-md`) backed by shared `scripts/lib/adrs.js`. `scripts/current-state.js` produces a composite view: curated pulse + locked baseline link + ADR roll-up + hub snapshot. Two new curated zettels seeded as skeletons: `[[pulse]]` (editorial narrative, `hub` + `reference`) and `[[yap-baseline]]` (locked pre-z-yap snapshot, `hub` + `reference` + `frozen`). `init.md` ADR section rewritten; scripts table extended; `.github/workflows/catalog.yml` regenerates `dist/ADRS.md`, `dist/decisions.md`, `dist/CURRENT-STATE.md`. `scripts/neighborhood.js` STRUCTURAL set updated with new lifecycle + `frozen` tags.

Meta-thread `[[thread-queue-system]]` renamed to `[[thread-queue-system.thread]]` (filename + 12 reference updates across `connections.md` and `thread.md`). New `INCLUDES` edges from the renamed meta-thread to `[[global-pending-queue]]`, `[[pulse]]`, `[[yap-baseline]]`, `[[sessions.hub]]`, and the three new follow-up zettels. Three new follow-up zettels record open meta work: `[[z3-stay-companion]]` (whether D-001 should split a rejected-alternative companion), `[[convention-zettel-promotion]]` (whether to extract `init.md` conventions into `.convention.md` zettels), `[[transcripts-private-submodule]]` (7-step plan to move `sessions/` into a private GitHub submodule for privacy). Free-form follow-up items appended to `[[global-pending-queue]]` under a dated section: the three new zettels plus pulse/baseline content edits, D-005 epistemic-status decision, D-003 thread-membership edge, and ADR slug-name review.

### Edges

[[gram-graph-ir.adr]] --[:REJECTS]--> [[gram-as-s-expressions]]
[[gram-graph-ir.adr]] --[:DOCUMENTS]--> [[gram]]
[[gram-graph-ir.adr]] --[:MOTIVATES]--> [[gram-additive-enrichment]]
[[gram-graph-ir.adr]] --[:MOTIVATES]--> [[gram-dataflow-semantics]]
[[gram-graph-ir.adr]] --[:MOTIVATES]--> [[compilation-by-selection]]
[[gram]] --[:IMPLEMENTS]--> [[gram-graph-ir.adr]]
[[direct-style-lowering.adr]] --[:REJECTS]--> [[selective-cps]]
[[direct-style-lowering.adr]] --[:DOCUMENTS]--> [[shift-reset-mir-lowering]]
[[shift-reset-mir-lowering]] --[:IMPLEMENTS]--> [[direct-style-lowering.adr]]
[[direct-style-lowering.adr]] --[:RELIES_ON]--> [[bubble-semantics]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[direct-style-lowering.adr]]
[[pulse]] --[:REFERENCES]--> [[yap-baseline]]
[[thread-queue-system.thread]] --[:INCLUDES]--> [[global-pending-queue]]
[[thread-queue-system.thread]] --[:INCLUDES]--> [[pulse]]
[[thread-queue-system.thread]] --[:INCLUDES]--> [[yap-baseline]]
[[thread-queue-system.thread]] --[:INCLUDES]--> [[sessions.hub]]
[[thread-queue-system.thread]] --[:INCLUDES]--> [[z3-stay-companion]]
[[thread-queue-system.thread]] --[:INCLUDES]--> [[convention-zettel-promotion]]
[[thread-queue-system.thread]] --[:INCLUDES]--> [[transcripts-private-submodule]]

### Spawned

`[[z3-replacement.adr]]` (renamed), `[[gram-graph-ir.adr]]`, `[[first-order-restriction.adr]]` (renamed), `[[direct-style-lowering.adr]]`, `[[pulse]]`, `[[yap-baseline]]`, `[[z3-stay-companion]]`, `[[convention-zettel-promotion]]`, `[[transcripts-private-submodule]]`.

### Updates

- `[[extensibility-via-modalities.adr]]` — added `adr-id: D-005` + `accepted` tag.
- `[[gram-as-s-expressions]]` — reframed as rejected-alternative description.
- `[[selective-cps]]` — reframed as rejected-alternative description.
- `[[thread-queue-system.thread]]` — renamed from `thread-queue-system`; 12 references updated.
- `[[global-pending-queue]]` — appended ADR/pulse/current-state follow-ups section.
- `init.md`, `REGISTRY.md`, `.github/workflows/catalog.yml`, `scripts/lib/parse.js`, `scripts/neighborhood.js` — convention + tooling updates.

---

## Session: Phase 2 gram modality + EUF bug discovery — @2026-06-03 [gram, verification, bug]

Implemented Phase 2 of the programmable GRAM passes plan: added `gram?: T` to modal annotations, `%rulename` surface syntax, and gram typechecking against the `Rule` type.

During test stabilization, discovered a bug in the EUF congruence closure: formula `(x = y) ∧ (f(x) ≠ f(y))` returns SAT instead of UNSAT. After merging `x ≡ y`, congruence propagation should merge `f(x) ≡ f(y)`, but it doesn't trigger. Test snapshot shows duplicate `{x}` in initial classes (5 classes for 4 nodes).

### New zettels

SPAWN [[euf-congruence-propagation-bug]] — EUF congruence closure fails to propagate merges

### Queue updates

ENQUEUE [[euf-congruence-propagation-bug]] — added to [[global-pending-queue]]

### Edges

[[euf-congruence-propagation-bug]] --[:AFFECTS]--> [[congruence-closure]]
[[euf-congruence-propagation-bug]] --[:AFFECTS]--> [[euf-theory]]


## Session: Programmable GRAM passes — blast radius + MVP plan — @2026-06-02 [gram, modality, lowering, elaboration, parser, planning]

Investigated the blast radius of implementing [[programmable-gram-passes]] and produced a sequenced MVP implementation plan, recorded as [[programmable-gram-passes-mvp.plan]].

Key findings grounding the plan:
- Modal carrier `Annotations<T>` (`src/verification/modalities/shared.ts`) currently carries only `quantity` + `liquid`; the gram dimension is a new field rippling to EB `Modal`, NF `Modalities`, and `combine`.
- The GRAM pipeline `Pass = Graph -> Graph` and per-term `compile` do not thread the elaboration `Context`; the Kernel pass needs it for NbE, so `CompileOpts` gains `ctx`.
- `Rule`/`Pattern`/`Constructor`/`Edge` model cleanly as Schema-row types seeded into `defaultContext().imports` (no module system needed); `Payload` models as a `JSON` atom (the graph already JSON-stringifies payloads for dedup in `src/GRAM/graph.ts`).
- The DPO engine (`src/GRAM/grs/`) is reused unchanged via an adapter wrapping `NF.apply` in TS `Rule` thunks; the predicate-application-strategy framing is deferred, superseded if the adapter suffices.
- GRAM is per-term only today (no module-level driver); `src/Codegen/modules.ts` already iterates letdecs by name, a template for future module-level GRAM. Per-term + context threading kept for now.

Decisions locked: user-rules-only MVP; additive-only (Kernel guard); tag-only LHS predicates (payload predicates deferred); surface syntax `Type %rulename` (Nearley; `<…>` stays QTT); edge label `:rewrite_rule`; no tree-sitter; docs in z-yap only. The plan mandates a standing no-assumptions / STOP-and-surface directive at every step, per-step user review, and an independent `yap-reviewer` audit subagent gate after typecheck + tests, applying the project style contract plus `~/.config/ai-agents` guidelines.

### Edges

[[programmable-gram-passes-mvp.plan]] --[:IMPLEMENTS]--> [[programmable-gram-passes]]
[[programmable-gram-passes-mvp.plan]] --[:IMPLEMENTS]--> [[gram-kernel-pass]]
[[programmable-gram-passes-mvp.plan]] --[:IMPLEMENTS]--> [[gram-rule-as-yap-value]]
[[programmable-gram-passes-mvp.plan]] --[:IMPLEMENTS]--> [[pass-activation-by-reference]]
[[programmable-gram-passes-mvp.plan]] --[:RELIES_ON]--> [[modality-system]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[programmable-gram-passes-mvp.plan]]

### Spawned

SPAWN [[programmable-gram-passes-mvp.plan]] — MVP implementation plan (todo, planned, ready) for the gram-evolution thread

### Session record

Session zettel: [[programmable-gram-passes-mvp-plan.session]] (ai-session). Transcript copied to `sessions/d8833b63-a13c-4d87-bd54-129768d7be36.jsonl`.

[[sessions.hub]] --[:INCLUDES]--> [[programmable-gram-passes-mvp-plan.session]]
[[programmable-gram-passes-mvp-plan.session]] --[:PRODUCES]--> [[programmable-gram-passes-mvp.plan]]
[[programmable-gram-passes-mvp-plan.session]] --[:FOLLOWS]--> [[programmable-gram-passes-design.session]]

---

## Session: MVP plan refinement — tailcall demo + once-per-match — @2026-06-03 [gram, modality, lowering, planning, decision]

Refined [[programmable-gram-passes-mvp.plan]] with three locked decisions, removed one open item, and recorded a v2 motivator. Plan stays tagged `ready`; ready to initiate implementation.

### Decisions locked

1. `Bindings` dropped from v1. `Constructor.payload : JSON` constant. Bindings-derived payloads return in v2 alongside payload predicates.
2. User rules invoked with single-fire-per-match semantics — `Match.all` over each rule's LHS, then `Rewrite.apply` once per binding. No fixpoint. Rationale: under tag-only LHS + strict additive enrichment + no `where`, a rule's LHS is preserved verbatim by its own RHS, so `Strategy.apply` (fixpoint) cannot terminate. Once-per-match aligns with how `closure.capture` and `pattern.compilePatterns` already enrich the graph. `Strategy.apply` reserved for static passes; user-facing strategies deferred or yeeted.
3. `:optimizes` is the canonical edge label for user-rule-injected analysis tags consumed downstream. Replaces the placeholder `:marks` from earlier sketches.

### Demo target

Tailcall identification via additive markers connected by `:optimizes` edges. Primary rule `tailcall_in_lambda` (`$lam :body $app` → add `tailcall` node with `:optimizes` edge to `$app`). Companion rules cover the other tail-position parents (`let`, `case`, `reset`, `block :return`, `shift`, `mu`) — v1-shippable family, not blocking for plumbing. Chosen over PAP analysis: tail position is a purely structural property expressible with v1's tag-only LHS; PAP needs payload arithmetic that v1 explicitly defers.

Confirmed `\x. f x` elaborates to `Abs(Lambda, body=App(...))` with no Block wrap — translation emits `lambda :body app` directly.

### Open items reduced

Removed `Bindings` open item (settled). Bridge → MIR boundary policy reworded with concrete options for the demo's `tailcall` tag and `:optimizes` edge: reject (default safe), passthrough as opaque marker, or consume as TCO hint. Generalises to any future user-rule-introduced tag/edge.

### Spawned

SPAWN [[pap-analysis-payload-predicates]] — canonical v2 motivator capturing why PAP needs payload predicates + Bindings-derived payloads, and what the v2 rule shape would look like. Prevents the deferral from being lost.

### Edges

[[pap-analysis-payload-predicates]] --[:MOTIVATES]--> [[programmable-gram-passes-mvp.plan]]
[[programmable-gram-passes-mvp.plan]] --[:DEFERS_TO]--> [[pap-analysis-payload-predicates]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[pap-analysis-payload-predicates]]

### Updates

- [[programmable-gram-passes-mvp.plan]] — locked decisions table extended; v1 narrowing block removed (settled); Phase 6 strategy line replaced with Match.all + once-per-match + rationale; Phase 7 boundary section made concrete; new "Demo rule — Tailcall identification" subsection under Phase 6 with rule spec, companion list, and end-to-end test outline; open items reduced from 4 to 3.


---

## Session: GRAM canonical IR (D-006) — zettel realignment — @2026-06-03 [gram, mir, lowering, codegen, pipeline, adr, decision]

Realigned z-yap to reflect the current architecture: the canonical compilation pipeline is `EB.Term → GRAM → MIR → codegen`, with `GRAM.Bridge.emit` producing the MIR module consumed by JS/C/Erlang backends (`src/cli/explore/pipeline.ts`). Older zettels framed GRAM and MIR as parallel IRs; that framing predates the integration in `src/cli/explore/pipeline.ts` and `src/GRAM/bridge/`. The realignment did not edit decisions still in force — it captured the shift through new zettels with deprecation and amendment relationships.

Vocabulary additions (`REGISTRY.md`): lifecycle tags `amended` (decision in force, scope/implementation context modified by a later ADR) and `reframed` (decision in force, conceptual framing shifted by a later ADR), with corresponding edge labels `AMENDS` and `REFRAMES`. Frontmatter scalars `amended-by` and `reframed-by` for inbound lifecycle links. Lifecycle preamble rewritten to make composition the norm: an ADR can carry multiple lifecycle tags simultaneously when distinct lifecycle facts apply.

Connection conventions (`init.md`): new Connections subsection codifies multi-label edges, multi-tag axes, vocabulary-coining bar, active-voice canonical labels with the "read every edge as a sentence" check, and the prefer-specific-over-generic stance. Examples kept generic (`LABEL_A`, `LABEL_B`); concrete labels reserved for canonical-voice illustrations where placeholders don't read naturally. ADR section rewritten to drop gatekeeping language and point at the registry for the full lifecycle table.

New ADR `[[gram-canonical-ir.adr]]` (D-006): GRAM is the canonical compilation IR; the legacy `EB.Term → MIR` path remains only for the file-compile entry. D-004 `[[direct-style-lowering.adr]]` tagged `amended` + `reframed`, with frontmatter `amended-by: [adr:D-006]` and `reframed-by: [adr:D-006]`; a scope note clarifies that the direct-style shape is unchanged while the site moved.

Bridge-site companion zettels: `[[shift-reset-bridge-lowering]]` documents `src/GRAM/bridge/continuations.ts`; `[[multishot-bridge-serialization]]` documents the heap-env + indexed-resume + `Branch` strategy on that site. Legacy site zettels `[[shift-reset-mir-lowering]]` and `[[multishot-serialization]]` tagged `deprecated` + `legacy` with supersession banners pointing at the bridge counterparts; `[[mir-retrospective]]` tagged `deprecated` + `legacy` because its parallel-IR framing no longer matches D-006.

Planned-work zettel `[[singleshot-static-specialization]]` captures the deferred optimisation: rewrite multishot reset subgraphs to flat block-and-jump shape when QTT-derived usage proves `≤ 1` resume invocation. Realised as a programmable GRAM pass; depends on `[[usage-semantics]]`, `[[programmable-gram-passes]]`, and `[[gram-kernel-pass]]`.

Tech-debt zettel `[[legacy-file-compile]]` captures the residual: `src/compile.ts` + `src/Codegen/modules.ts` route through `lowerToMir` (carrying `@deprecated Use GRAM.Bridge.emit instead.`) and emit JS only. Migrating this entry off the legacy path is the precondition for fully retiring `src/lowering/lower.ts`. Added to `[[global-pending-queue]]` under a new dated section.

Partial-deprecation notes added to `[[gram]]`, `[[delimited-continuations.thread]]`, `[[shift-reset]]`, `[[compile-orchestration]]` — header notes pointing readers at the current canonical/bridge zettels without retiring the original bodies, since each still carries content beyond the obsolete framing.

### Edges

[[gram-canonical-ir.adr]] --[:DOCUMENTS]--> [[gram]]
[[gram-canonical-ir.adr]] --[:RELIES_ON]--> [[gram-graph-ir.adr]]
[[gram-graph-ir.adr]] --[:MOTIVATES]--> [[gram-canonical-ir.adr]]
[[gram]] --[:IMPLEMENTS]--> [[gram-canonical-ir.adr]]
[[gram-canonical-ir.adr]] --[:AMENDS]--> [[direct-style-lowering.adr]]
[[gram-canonical-ir.adr]] --[:REFRAMES]--> [[direct-style-lowering.adr]]
[[gram-canonical-ir.adr]] --[:REVISES]--> [[direct-style-lowering.adr]]
[[gram-canonical-ir.adr]] --[:SUPERSEDES]--> [[mir-retrospective]]
[[gram-canonical-ir.adr]] --[:DEPRECATES]--> [[mir-retrospective]]
[[shift-reset-bridge-lowering]] --[:IMPLEMENTS]--> [[gram-canonical-ir.adr]]
[[shift-reset-bridge-lowering]] --[:IMPLEMENTS]--> [[direct-style-lowering.adr]]
[[shift-reset-bridge-lowering]] --[:SUPERSEDES]--> [[shift-reset-mir-lowering]]
[[shift-reset-bridge-lowering]] --[:DEPRECATES]--> [[shift-reset-mir-lowering]]
[[shift-reset-bridge-lowering]] --[:MIRRORS]--> [[shift-reset-mir-lowering]]
[[shift-reset-bridge-lowering]] --[:REVISES]--> [[shift-reset-mir-lowering]]
[[multishot-bridge-serialization]] --[:IMPLEMENTS]--> [[gram-canonical-ir.adr]]
[[multishot-bridge-serialization]] --[:SUPERSEDES]--> [[multishot-serialization]]
[[multishot-bridge-serialization]] --[:DEPRECATES]--> [[multishot-serialization]]
[[multishot-bridge-serialization]] --[:MIRRORS]--> [[multishot-serialization]]
[[multishot-bridge-serialization]] --[:REVISES]--> [[multishot-serialization]]
[[multishot-bridge-serialization]] --[:COMPOSES_WITH]--> [[shift-reset-bridge-lowering]]
[[singleshot-static-specialization]] --[:APPLIES_TO]--> [[multishot-bridge-serialization]]
[[singleshot-static-specialization]] --[:RELIES_ON]--> [[usage-semantics]]
[[singleshot-static-specialization]] --[:RELIES_ON]--> [[programmable-gram-passes]]
[[singleshot-static-specialization]] --[:RELIES_ON]--> [[gram-kernel-pass]]
[[singleshot-static-specialization]] --[:CONSUMES]--> [[modality-system]]
[[legacy-file-compile]] --[:DEFERS_TO]--> [[gram-canonical-ir.adr]]
[[legacy-file-compile]] --[:APPLIES_TO]--> [[compile-orchestration]]
[[legacy-file-compile]] --[:BLOCKS]--> [[gram-canonical-ir.adr]]
[[compile-orchestration]] --[:DELEGATES_TO]--> [[legacy-file-compile]]
[[global-pending-queue]] --[:INCLUDES]--> [[legacy-file-compile]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-canonical-ir.adr]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[gram-canonical-ir.adr]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[shift-reset-bridge-lowering]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[multishot-bridge-serialization]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[singleshot-static-specialization]]
[[gram]] --[:INCLUDES]--> [[shift-reset-bridge-lowering]]
[[gram]] --[:INCLUDES]--> [[multishot-bridge-serialization]]

### Spawned

SPAWN [[gram-canonical-ir.adr]] — D-006, GRAM as canonical compilation IR
SPAWN [[shift-reset-bridge-lowering]] — canonical shift/reset lowering site
SPAWN [[multishot-bridge-serialization]] — canonical multishot serialisation site
SPAWN [[singleshot-static-specialization]] — planned single-shot optimisation pass
SPAWN [[legacy-file-compile]] — tech-debt zettel for the residual file-compile path

### Updates

- `[[direct-style-lowering.adr]]` — added `amended` + `reframed` lifecycle tags, `amended-by` + `reframed-by` frontmatter, scope note pointing at D-006 and the bridge zettels.
- `[[shift-reset-mir-lowering]]` — added `deprecated` + `legacy` tags, supersession banner.
- `[[multishot-serialization]]` — added `deprecated` + `legacy` tags, supersession banner.
- `[[mir-retrospective]]` — added `deprecated` + `legacy` tags, supersession banner.
- `[[gram]]`, `[[delimited-continuations.thread]]`, `[[shift-reset]]`, `[[compile-orchestration]]` — partial-deprecation header notes pointing at the canonical zettels.
- `[[global-pending-queue]]` — appended dated section with `[[legacy-file-compile]]`.
- `REGISTRY.md` — `amended` / `reframed` lifecycle tags, `AMENDS` / `REFRAMES` edge labels, `amended-by` / `reframed-by` frontmatter scalars, lifecycle preamble rewritten for composability.
- `init.md` — new Connections subsection (generic phrasing), ADR section rewritten for the registry-driven lifecycle table and multi-edge connections.


---

## Session: Programmable GRAM passes MVP — implementation + retrospective — @2026-06-03 [gram, rewriting, lowering, milestone, modality, compiler]

Completed phases 1–6 of [[programmable-gram-passes-mvp.plan]]: builtin Rule types, gram modal dimension with `%ruleName` syntax, translation marker emitting `:rewrite_rule` edges, Payload ⇆ NF.Value JSON bridge, NF.Value → TS Rule reader, and Kernel pass with context threading. User-defined DPO rewrite rules now participate in GRAM lowering through modal annotations. Integration tests validate end-to-end with actual Yap source.

Four issues surfaced during implementation:

1. **String escaping bug** — GRAM payload serialisation double-escapes string literals containing quotes.
2. **Rule scoping** — rules match the entire graph, not the subgraph rooted at the annotated term.
3. **Payload constraint emission** — the `check(string, JSON)` case exists but Rule values bypass it via constraint emission.
4. **Modality vs pragma** — `%ruleName` is an inert compilation directive, not a type-level modality.

Phase 7 (boundary policy for user-rule-introduced tags, z-yap documentation pass) deferred pending issue resolution.

### Edges

[[programmable-gram-passes-mvp-retrospective]] --[:DOCUMENTS]--> [[programmable-gram-passes-mvp.plan]]
[[programmable-gram-passes-mvp-retrospective]] --[:DOCUMENTS]--> [[programmable-gram-passes]]
[[programmable-gram-passes-mvp.plan]] --[:IMPLEMENTS]--> [[programmable-gram-passes]]
[[programmable-gram-passes]] --[:IMPLEMENTS]--> [[extensibility-via-modalities.adr]]
[[gram-kernel-pass]] --[:IMPLEMENTS]--> [[programmable-gram-passes]]
[[gram-rule-as-yap-value]] --[:IMPLEMENTS]--> [[programmable-gram-passes]]
[[pass-activation-by-reference]] --[:IMPLEMENTS]--> [[programmable-gram-passes]]
[[gram-string-escaping.bug]] --[:DISCOVERED_BY]--> [[programmable-gram-passes-mvp-retrospective]]
[[gram-string-escaping.bug]] --[:BLOCKS]--> [[programmable-gram-passes]]
[[gram-rule-scoping.design]] --[:DISCOVERED_BY]--> [[programmable-gram-passes-mvp-retrospective]]
[[gram-rule-scoping.design]] --[:BLOCKS]--> [[programmable-gram-passes]]
[[gram-payload-constraint-emission.design]] --[:DISCOVERED_BY]--> [[programmable-gram-passes-mvp-retrospective]]
[[gram-payload-constraint-emission.design]] --[:APPLIES_TO]--> [[gram-rule-as-yap-value]]
[[gram-modality-vs-pragma.design]] --[:DISCOVERED_BY]--> [[programmable-gram-passes-mvp-retrospective]]
[[gram-modality-vs-pragma.design]] --[:APPLIES_TO]--> [[modality-system]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[programmable-gram-passes-mvp-retrospective]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-string-escaping.bug]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-rule-scoping.design]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-payload-constraint-emission.design]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-modality-vs-pragma.design]]

### Spawned

SPAWN [[programmable-gram-passes-mvp-retrospective]] — implementation retrospective with discovered issues
SPAWN [[gram-string-escaping.bug]] — string escaping bug in GRAM payload serialisation
SPAWN [[gram-rule-scoping.design]] — rule scoping design issue
SPAWN [[gram-payload-constraint-emission.design]] — payload constraint emission design issue
SPAWN [[gram-modality-vs-pragma.design]] — modality vs pragma design issue

### Resolved

RESOLVED [[programmable-gram-passes-mvp.plan]] phases 1–6 — MVP implementation complete

### Updates

- `[[programmable-gram-passes-mvp.plan]]` — added `implemented` + `incomplete` tags, completion banner, phase markers (✓ for 1–6).
- `[[programmable-gram-passes]]` — replaced `planned` + `needs-design` with `implemented` + `incomplete`, added banner.
- `[[gram-kernel-pass]]` — replaced `planned` + `needs-design` with `implemented`.
- `[[gram-rule-as-yap-value]]` — replaced `planned` with `implemented`.
- `[[gram-evolution.thread]]` — item 19 updated to `implemented, incomplete` with issue links.

---

## Session: JIT-vs-AOT positioning + NbE acceleration cluster — @2026-06-03 [adr, compilation, nbe, normalization, evaluation, strategy, design]

Recorded Yap's compilation-strategy stance and the NbE acceleration design space. Two clusters, deliberately distinct in scope: one is the architectural commitment (AOT, with user-controlled compile-time optimisation, rejecting runtime JIT for user programs); the other is the elaborator-internal performance design space (where JIT *concepts* — speculation, dual representation, compiled dispatch — are still in play, applied to the compiler's own evaluator). The two meet at one precise hinge: D-007 explicitly does not foreclose internal acceleration of the elaborator's NbE.

Backlog check: `z-yap/tmp/zettel-quality-backlog.md` section #7 ("Normalization / evaluation") had been marked DONE in the 2026-05-28 pass, covering the *what the evaluator does today* cluster. Nothing on acceleration strategy, on the WHNF-vs-glued distinction, on JIT-vs-AOT positioning, or on partial evaluation as the JIT substitute existed. All four were added in this session.

Tag gap: none of the 12 zettels in the existing NbE cluster carried the `nbe` tag — not even `[[nbe]]` itself. The hub did not tag its own facet. All 12 received the `nbe` tag in this pass (excluded `[[strict-vs-lazy]]` as primarily-runtime).

Registered vocabulary additions in `REGISTRY.md`:

- **Core**: `strategy`, `alternative`, `user-control`, `extensibility`
- **Pipeline**: `nbe` (the facet that didn't exist as a registered tag)
- **Compiler**: `aot`, `jit`, `vm`, `optimization`, `partial-evaluation`, `monomorphisation`, `specialisation`, `meta-circular`
- **Representation**: `representation`, `dual-rep`
- **Infrastructure**: `profile`, `measurement`

No new edge labels — all 14 labels used (`INCLUDES`, `ADDRESSES`, `GROUNDED_IN`, `REFERENCES`, `APPLIES_TO`, `INFORMS`, `DOCUMENTS`, `MOTIVATES`, `REJECTS`, `RELIES_ON`, `IMPLEMENTS`, `COMPOSES_WITH`, `GENERALIZES`, `DEFERS`, `CONTRASTS_WITH`) were already registered.

### Spawned

SPAWN [[nbe-acceleration]] — design discussion: JIT concepts applied to the elaborator's NbE
SPAWN [[nbe-performance-profile]] — empirical grounding prerequisite (currently unmeasured)
SPAWN [[glued-evaluation]] — dual-rep evaluation strategy (Coq/Lean precedent)
SPAWN [[compiled-nbe]] — compile the evaluator itself (MetaCoq/Agda precedent)
SPAWN [[compilation-strategy.adr]] — D-007, AOT-with-user-controlled-optimisation, standalone
SPAWN [[aot-compilation]] — concept describing what AOT means concretely in Yap
SPAWN [[static-partial-evaluation]] — the JIT substitute: NbE + programmable passes + specialisation
SPAWN [[jit-for-user-programs]] — rejected alternative companion to D-007

### Updates

- 12 existing NbE cluster zettels gained the `nbe` tag: `[[nbe]]`, `[[whnf-vs-full-normalization]]`, `[[cbv-evaluation]]`, `[[variable-evaluation-dispatch]]`, `[[quoting]]`, `[[closures]]`, `[[trampoline-evaluator]]`, `[[knot-tying]]`, `[[evaluation-step-limit]]`, `[[application-evaluation]]`, `[[neutrals]]`, `[[nf-value]]`.
- `REGISTRY.md` — added 15 tag entries across 5 sections.

### Edges

[[nbe]] --[:INCLUDES]--> [[nbe-acceleration]]
[[nbe]] --[:INCLUDES]--> [[nbe-performance-profile]]
[[nbe]] --[:INCLUDES]--> [[glued-evaluation]]
[[nbe]] --[:INCLUDES]--> [[compiled-nbe]]
[[nbe-acceleration]] --[:ADDRESSES]--> [[nbe-performance-profile]]
[[nbe-acceleration]] --[:GROUNDED_IN]--> [[glued-evaluation]]
[[nbe-acceleration]] --[:REFERENCES]--> [[compiled-nbe]]
[[glued-evaluation]] --[:APPLIES_TO]--> [[closures]]
[[glued-evaluation]] --[:APPLIES_TO]--> [[quoting]]
[[glued-evaluation]] --[:APPLIES_TO]--> [[variable-evaluation-dispatch]]
[[compiled-nbe]] --[:APPLIES_TO]--> [[trampoline-evaluator]]
[[compiled-nbe]] --[:APPLIES_TO]--> [[variable-evaluation-dispatch]]
[[lean-4-influence]] --[:INFORMS]--> [[glued-evaluation]]
[[lean-4-influence]] --[:INFORMS]--> [[nbe-acceleration]]
[[agda-influence]] --[:INFORMS]--> [[compiled-nbe]]
[[compilation-strategy.adr]] --[:DOCUMENTS]--> [[aot-compilation]]
[[compilation-strategy.adr]] --[:MOTIVATES]--> [[static-partial-evaluation]]
[[compilation-strategy.adr]] --[:REJECTS]--> [[jit-for-user-programs]]
[[compilation-strategy.adr]] --[:RELIES_ON]--> [[programmable-gram-passes]]
[[aot-compilation]] --[:IMPLEMENTS]--> [[compilation-strategy.adr]]
[[aot-compilation]] --[:COMPOSES_WITH]--> [[compile-orchestration]]
[[aot-compilation]] --[:RELIES_ON]--> [[gram-canonical-ir.adr]]
[[programmable-gram-passes]] --[:IMPLEMENTS]--> [[compilation-strategy.adr]]
[[static-partial-evaluation]] --[:RELIES_ON]--> [[nbe]]
[[static-partial-evaluation]] --[:RELIES_ON]--> [[programmable-gram-passes]]
[[static-partial-evaluation]] --[:RELIES_ON]--> [[singleshot-static-specialization]]
[[static-partial-evaluation]] --[:GENERALIZES]--> [[singleshot-static-specialization]]
[[jit-for-user-programs]] --[:CONTRASTS_WITH]--> [[static-partial-evaluation]]
[[nbe-acceleration]] --[:RELIES_ON]--> [[compilation-strategy.adr]]
[[compilation-strategy.adr]] --[:DEFERS]--> [[nbe-acceleration]]
[[nbe-acceleration]] --[:CONTRASTS_WITH]--> [[jit-for-user-programs]]

---

## Session: PAP pass implementation — @2026-06-04 [gram, pap, bridge, lowering, implementation, bugfix]

Implemented the builtin PAP pass (`[[gram-pap-pass]]`) to resolve the bridge unsaturated external gap (`[[bridge-unsaturated-external]]`). The pass transforms unsaturated `EXTERNAL` nodes into explicit `PAP` nodes using a DPO rule plus imperative capture wiring (GRS cannot express variable-length aggregate patterns). The bridge translates PAP nodes into MIR closure wrapper chains.

Design follows GRAM's additive enrichment principle: PAP nodes connect to EXTERNAL via `:materializes` edges, preserving original structure. Bridge remains mechanical — GRAM adds semantics.

### Resolved

RESOLVED [[bridge-unsaturated-external]] — PAP pass eliminates unsaturated externals before bridge

### Updates

- `[[gram-pap-pass]]` — `planned` → `implemented`, removed status prose (Tests/Resolves lines)
- `[[bridge-unsaturated-external]]` — `bug`+`planned` → `implemented`+`bugfix`, removed "(resolved)" from title, removed Status line, fixed tense to past
- `[[pipeline-stabilization.thread]]` — item 13 marked implemented

### Edges

(Already recorded in prior session)
[[gram-pap-pass]] --[:RESOLVES]--> [[bridge-unsaturated-external]]

---

## Session: Bounded MBQI tracking — @2026-06-10 [solver, quantifiers, mbqi, verification, sat, implementation]

Recorded the bounded MBQI work (in flight on the `stabilization` branch, `src/verification/solver/quantifiers/mbqi.ts`) which previously existed in z-yap only as a gap note ("MBQI is not yet implemented" in [[quantifier-engine]]) and an anticipatory edge note ("Triggers → E-match, none → bounded MBQI"). The implementation plan lives in `resources/plans/bounded-mbqi-implementation.md`; its todo statuses were synced to reality (module, trace step, solver wiring complete; unit tests in progress; integration tests and audit pending).

The mechanism: when an E-matching round produces no lemmas, bounded MBQI enumerates ground terms by sort from the EUF arena and quantifier bodies, generates capped cartesian substitutions, and asserts simplified ground lemmas — closing the soundness gap where trigger-less quantifiers (pure arithmetic bodies) caused spurious SAT. A pure-quantifier fast path bypasses CNF/CDCL entirely. Deviation from full Ge–de Moura MBQI (no model-guided witness construction) recorded in the zettel with its justification.

Treated as a standalone post-M2 increment — M2 milestone/implementation records left untouched as history; positioning expressed via EXTENDS edges instead.

Registered vocabulary in `REGISTRY.md`:

- **Core**: `fallback`
- **Verification**: `mbqi`, `instantiation`
- **Connection labels**: `FALLS_BACK_TO`

### Spawned

SPAWN [[mbqi]] — bounded model-based quantifier instantiation mechanism, `implemented` + `incomplete`

### Updates

- [[quantifier-engine]] — replaced "MBQI is not yet implemented" status prose with positive two-stage dispatch description; added `instantiation` + `mbqi` tags.
- [[ge-de-moura-quantifiers]] — refreshed stale Z3-era prose (`z3-solver`/`V2/pretty.ts`) to reference the in-house engine and both instantiation regimes.
- [[verification-backend.thread]] — item 24 added: Bounded MBQI fallback, `implemented, incomplete`.
- `resources/plans/bounded-mbqi-implementation.md` — todo statuses synced.

### Edges

[[quantifier-engine]] --[:INCLUDES]--> [[mbqi]]
[[quantifier-engine]] --[:FALLS_BACK_TO]--> [[mbqi]]
[[mbqi]] --[:CONTRASTS_WITH]--> [[e-matching]]
[[ge-de-moura-quantifiers]] --[:INFORMS]--> [[mbqi]]
[[mbqi]] --[:USES]--> [[euf-theory]]
[[mbqi]] --[:INSTANTIATES]--> [[cdcl-t-solver]]
[[mbqi]] --[:EXTENDS]--> [[milestone-2-euf-quant-lia]]
[[mbqi]] --[:EXTENDS]--> [[m2-implementation]]
[[solver-trace]] --[:EXPOSES]--> [[mbqi]]
[[complementary-atom-encoding]] --[:APPLIES_TO]--> [[mbqi]]
[[verification-backend.thread]] --[:INCLUDES]--> [[mbqi]]

---

## Session: Solver v2 monadic port closeout — @2026-06-15 [solver, verification, monad, cdcl, quantifiers, tracing, adr, meta]

Closed out the solver v2 monadic port session and promoted its durable output into z-yap. The session implemented the additive v2 solver path under `src/verification/solver/v2`: generator RWSE runtime, domain-organized CDCL(T), EUF, arithmetic, quantifier, encoding, formulas, trace, and public solver API. It also surfaced two non-urgent deferred solver features and one meta/process follow-up for turning agent guidelines into zettels and reusable skills.

ADR-worthy decision: the solver v2 effect runtime is D-008. It records the RWSE generator runtime, the distinction between solver outcomes and internal errors, and the controlled mutation boundaries for the interpreter and solver state modules.

Registered vocabulary in `REGISTRY.md`:

- **Verification**: `cdcl`, `smt-theory`, `propagation`
- **Representation**: `cnf`
- **Infrastructure**: `agent`, `skills`
- **Zettelkasten**: `convention`
- **Connection labels**: `DEFERRED_TO`

### Spawned

SPAWN [[solver-v2-monadic-port.session]] — session record for the v2 solver monadic port
SPAWN [[solver-v2-monadic-port.implementation]] — implementation zettel for the additive v2 solver path
SPAWN [[solver-v2-effect-runtime.adr]] — D-008, accepted runtime decision
SPAWN [[theory-conclusions-propagation]] — deferred CDCL(T) theory propagation work
SPAWN [[incremental-abstraction-extension]] — deferred quantifier/CNF fresh-atom abstraction work
SPAWN [[agent-guidelines-zettelization]] — meta work item for convention/skill extraction

### Updates

- [[verification-backend.thread]] — added items 25–27 for the v2 solver port and the two deferred solver follow-ups.
- [[thread-queue-system.thread]] — added item 1 for agent guideline zettelization.
- [[global-pending-queue]] — enqueued [[agent-guidelines-zettelization]] as a cross-cutting meta item.
- [[sessions.hub]] — added [[solver-v2-monadic-port.session]] to the session index.
- `REGISTRY.md` — added new tags and `DEFERRED_TO`.
- `connections.md` — added the solver v2 closeout connection cluster.
- `sessions/f093a294-7950-4037-b562-eb4717ae7.jsonl` — copied the private transcript snapshot for continuity.

### Edges

[[sessions.hub]] --[:INCLUDES]--> [[solver-v2-monadic-port.session]]
[[solver-v2-monadic-port.session]] --[:PRODUCED]--> [[solver-v2-effect-runtime.adr]]
[[solver-v2-monadic-port.session]] --[:PRODUCED]--> [[solver-v2-monadic-port.implementation]]
[[solver-v2-monadic-port.session]] --[:PRODUCED]--> [[theory-conclusions-propagation]]
[[solver-v2-monadic-port.session]] --[:PRODUCED]--> [[incremental-abstraction-extension]]
[[solver-v2-monadic-port.session]] --[:PRODUCED]--> [[agent-guidelines-zettelization]]
[[solver-v2-monadic-port.session]] --[:FOLLOWS]--> [[m2-implementation]]
[[solver-v2-effect-runtime.adr]] --[:REFRAMES]--> [[solver-effect-system]]
[[solver-v2-effect-runtime.adr]] --[:IMPLEMENTS]--> [[z3-replacement.adr]]
[[solver-v2-effect-runtime.adr]] --[:MOTIVATES]--> [[solver-v2-monadic-port.implementation]]
[[solver-v2-effect-runtime.adr]] --[:CONSTRAINS]--> [[theory-conclusions-propagation]]
[[solver-v2-monadic-port.implementation]] --[:IMPLEMENTS]--> [[solver-v2-effect-runtime.adr]]
[[solver-v2-monadic-port.implementation]] --[:IMPLEMENTS]--> [[cdcl-t-solver]]
[[solver-v2-monadic-port.implementation]] --[:IMPLEMENTS]--> [[congruence-closure]]
[[solver-v2-monadic-port.implementation]] --[:IMPLEMENTS]--> [[arithmetic-theory]]
[[solver-v2-monadic-port.implementation]] --[:IMPLEMENTS]--> [[quantifier-engine]]
[[solver-v2-monadic-port.implementation]] --[:EXPOSES]--> [[solver-trace]]
[[solver-v2-monadic-port.implementation]] --[:DEFERRED_TO]--> [[theory-conclusions-propagation]]
[[solver-v2-monadic-port.implementation]] --[:DEFERRED_TO]--> [[incremental-abstraction-extension]]
[[verification-backend.thread]] --[:INCLUDES]--> [[solver-v2-monadic-port.implementation]]
[[verification-backend.thread]] --[:INCLUDES]--> [[theory-conclusions-propagation]]
[[verification-backend.thread]] --[:INCLUDES]--> [[incremental-abstraction-extension]]
[[thread-queue-system.thread]] --[:INCLUDES]--> [[agent-guidelines-zettelization]]
[[global-pending-queue]] --[:INCLUDES]--> [[agent-guidelines-zettelization]]
[[agent-guidelines-zettelization]] --[:EXTENDS]--> [[convention-zettel-promotion]]

## Session: MBQI testing completion + style audit + remediation — @2026-06-11 [solver, quantifiers, mbqi, verification, testing, audit, implementation]

Closed out the bounded MBQI plan's testing and audit todos (`resources/plans/bounded-mbqi-implementation.md`; also relocated the plan there from a stray `plans/` directory).

**Testing.** The four MBQI unit tests in `quantifier.test.ts` pass. Added two integration tests to `refinement-types.test.ts` (`badOne: Num [| \v -> v > 10 |] = 1` must fail, a `v < 10` counterpart must pass). Key finding: the integration pipeline helper computes the solver trace but excludes it from snapshots, and verification is not an enforcing pipeline stage (thread item 12 — solver dispatch not wired as default backend), so snapshots alone proved nothing; the tests now assert directly on the trace text (`[mbqi]` + `[unsat]`/`[sat]`), confirming MBQI engages in the real VC pipeline. Full suite verified against a HEAD worktree: zero MBQI-caused regressions; the 19 remaining failures are pre-existing stabilization wip (stale selfification snapshots from `elaborate.ts`, shift/reset, and [[euf-congruence-propagation-bug]]).

**Audit.** Ran the yap-reviewer skill (independent agent, rules-only prompt): 29 violations across 5 files, 16 questions; `normalize.test.ts` and `refinement-types.test.ts` clean; `mbqi.ts` itself near-clean (1 finding).

**Remediation (done).** MBQI-introduced subset: `mbqi.ts` grounded-formula dispatch → exhaustive ts-pattern match, header abbreviations + [[mbqi]] zettel link; `solver.ts` pure-quantifier check → match, narration comment and identity map removed, header zettel link + abbreviations; `quantifier.test.ts` `let arena` → const chaining, narration comments culled to two WHY comments, unused type imports dropped. Then `trace.ts` fully: inverted file structure righted (public `Trace` export first — safe because helpers are only called at runtime, never dereferenced at module init), both `as` casts removed (the `ArithTrace.Step` cast was redundant — the two-way `TheoryStep` union narrows via the `isEUFStep` guard), three mutation sites rewritten immutably (`evalClause` recursion + match, conditional `initialDoc`, single-expression `mergeClasses`), magic `36`/`+2` named (`REPLAY_COL_WIDTH`, `STATUS_GUTTER`), header completed. `trace.ts` lint: 19 problems → 0.

**Remaining** (plan todo `audit-remediation`, in progress): `ivl/build.ts` (mutable `simplify` export, loops/`else`, tag if-chains, `parseFloat` precision question) and `solver.ts` incremental push/pop API + `createBase` placement. All work uncommitted in both repos by request.

### Updates

- `src/__tests__/integration/refinement-types.test.ts` — two MBQI integration tests with trace-verdict assertions.
- `src/verification/solver/quantifiers/mbqi.ts`, `solver.ts`, `trace.ts`, `__tests__/quantifier.test.ts` — audit remediation as above.
- `resources/plans/bounded-mbqi-implementation.md` — todos: unit-tests, integration-tests, audit → completed; audit-remediation added (in progress).
- [[verification-backend.thread]] — item 24 status note refreshed (tests pass, audit done, remediation scope narrowed).

---

## Session: Solver v2 z-yap sync — @2026-06-15 [solver, verification, monad, quantifiers, tracing, documentation]

Synced the post-closeout solver v2 changes back into z-yap after the implementation moved beyond the first promoted notes. The sync keeps historical M2/current-solver zettels intact and updates only the records whose wording had drifted from the v2 implementation.

### Updates

- [[solver-v2-monadic-port.implementation]] — refreshed public API wording to `Solver.run(formula)` / `Solver.check(formula)`, documented the removal of incremental `create`/`assert`/`push`/`pop`, and recorded monadic E-matching/MBQI state access plus component-owned trace emission.
- [[solver-v2-effect-runtime.adr]] — removed assertion/scope state from the runtime decision text and narrowed mutation boundaries to `Core.Do` plus encapsulated solver-state/domain modules.
- [[solver-v2-monadic-port.session]] — added decisions for one-shot v2 API, removed clause IDs, and monadic quantifier subrounds.
- [[verification-backend.thread]] — refreshed items 24 and 25 so bounded MBQI no longer points at v2 incremental API remediation and solver v2 records the one-shot API, removed clause IDs, and monadic quantifier trace ownership.
- [[solver-trace]] — added a v2 note distinguishing RWSE writer-based `Solver.run(formula)` traces from the older traced incremental instance.
- [[mbqi]] — added a v2 note for `src/verification/solver/v2/quantifier/mbqi/`, monadic state access, fallback ownership, and `{ tag: "mbqi" }` trace events.
- [[e-matching]] — added a v2 note for `src/verification/solver/v2/quantifier/ematch/`, monadic matching, and `{ tag: "round" }` trace events.
- `resources/plans/solver-v2-algorithm-port.md` — corrected `trace/index.ts` wording and removed stale callback language from the Phase 6 drift note.

---

## Session: Solver v2 verification parity tests — @2026-06-15 [solver, verification, testing, integration, bug]

Migrated the temporary Z3-vs-v2 discrepancy findings into source-level integration parity coverage. The old discrepancy harness was temporary; permanent coverage belongs in `src/__tests__/integration` for Yap-source end-to-end cases. Integration snapshots now include `ivl` and `solverTrace` directly.

### Updates

- `src/__tests__/integration/refinement-types.test.ts` — added missing source-level refinement cases and direct `[sat]`/`[unsat]` v2 trace assertions.
- `src/__tests__/integration/helpers/pipeline.ts` — added `ivl` and `solverTrace` to integration snapshots.
- `src/verification/__tests__/check.test.ts`, `helpers.ts`, `__snapshots__/check.test.ts.snap` — removed after source-level parity moved to integration snapshots.
- `src/verification/__tests__/solver-v2-discrepancy.test.ts` — removed after its findings were promoted to integration tests and z-yap bugs.
- [[solver-v2-universal-refinement-false-sat]] — spawned and enqueued as a v2 false-SAT blocker.
- [[block-scoped-let-vc-parity-bug]] — spawned and enqueued as a v2/Z3 parity blocker plus VC-generation review item.
- [[verification-backend.thread]] — added items 28 and 29 for the two parity bugs.
- [[solver-v2-monadic-port.implementation]] and `resources/plans/solver-v2-algorithm-port.md` — replaced the temporary discrepancy-test note with permanent `DEFERRED_TO` references.

### Queue updates

ENQUEUE [[solver-v2-universal-refinement-false-sat]] — added to [[global-pending-queue]]
ENQUEUE [[block-scoped-let-vc-parity-bug]] — added to [[global-pending-queue]]

### Edges

[[solver-v2-monadic-port.implementation]] --[:DEFERRED_TO]--> [[solver-v2-universal-refinement-false-sat]]
[[solver-v2-monadic-port.implementation]] --[:DEFERRED_TO]--> [[block-scoped-let-vc-parity-bug]]
[[verification-backend.thread]] --[:INCLUDES]--> [[solver-v2-universal-refinement-false-sat]]
[[verification-backend.thread]] --[:INCLUDES]--> [[block-scoped-let-vc-parity-bug]]

---

## Session: Solver v1 and Z3 removal z-yap sync — @2026-06-15 [solver, verification, z3, documentation, migration]

Synced z-yap after the codebase removed the root-level v1 solver and remaining Z3 dependency. The active solver record now points at `src/verification/solver/v2`, D-001 states that `z3-solver` and `z3.adapter.ts` are gone, and the former Z3 adapter strategy is deprecated rather than presented as live infrastructure. The two known former-oracle disagreements remain open as integration `test.fails` parity bugs.

### Updates

- [[solver-v2-monadic-port.implementation]] — changed the port description from additive parallel path to current solver backend, refreshed validation, and removed stale "Z3 removal incomplete" wording.
- `resources/plans/solver-v2-algorithm-port.md` — marked current solver entrypoints as v2 and reframed Z3 discrepancy closure as completed removal plus remaining `test.fails` blockers.
- [[solver-v1-z3-removal]] — spawned as the implemented removal record for deleting v1 solver code and the Z3 dependency.
- [[verification-backend.thread]] — refreshed the thread overview, translation-boundary item, solver architecture item, trace item, and added item 30 for solver v1/Z3 removal closeout.
- [[z3-replacement.adr]] — updated status, architecture layers, top-level API, implementation list, and graph edge to reflect full adapter/dependency removal.
- [[z3-adapter-strategy]] — marked deprecated with a supersession banner.
- [[solver-trace]], [[mbqi]], and [[cdcl-t-solver]] — replaced live references to deleted v1 files with v2 paths and one-shot API wording.
- [[global-pending-queue]] — clarified that the two remaining parity bugs compare against the former Z3 oracle.

### Actions

SPAWN [[solver-v1-z3-removal]] — implemented removal record for deleting v1 solver code and Z3 dependency
RESOLVED [[z3-adapter-strategy]] — deprecated after `z3.adapter.ts` and `z3-solver` removal

### Edges

[[z3-replacement.adr]] --[:SUPERSEDES]--> [[z3-adapter-strategy]]  -- Adapter removed after v2 parity tests replaced the temporary oracle harness
[[solver-v1-z3-removal]] --[:IMPLEMENTS]--> [[z3-replacement.adr]]  -- Removed Z3 dependency and adapter
[[solver-v1-z3-removal]] --[:FOLLOWS]--> [[solver-v2-monadic-port.implementation]]  -- v2 became the active solver backend before v1 deletion
[[verification-backend.thread]] --[:INCLUDES]--> [[solver-v1-z3-removal]]  -- Thread item 30

---

## Session: VC validity discharge + Liquid fragment notes — @2026-06-16 [verification, solver, validity, liquid, quantifiers, adr, documentation]

Documented the validity-discharge finding from the SMT/refinement test investigation. The core result is D-009: Yap-generated Liquid VCs are verifier-facing validity obligations, while the in-tree CDCL(T) solver remains a raw satisfiability engine. Guarded `forall` / `implies` structure generated by the bidirectional refinement pipeline encodes binders and assumptions; validity discharge consumes that structure and sends counterexample queries to the solver at leaves.

The session also clarified the general SMT boundary. Bounded MBQI and incremental abstraction extension remain real completeness topics for arbitrary quantified SMT formulas, but ordinary nested Liquid VCs should not rely on full MBQI. The identity-refinement failure is therefore resolved/reframed for Yap's verification path, while the block-scoped-let case remains an upstream VC-generation issue.

Answered the naming question: Liquid Types abbreviates **Logically Qualified Data Types**, from Rondon, Kawaguchi, and Jhala.

### Spawned

SPAWN [[liquid-vc-fragment]] — Liquid VC fragment and the role of guarded quantifiers
SPAWN [[validity-vs-satisfiability]] — verifier validity vs raw solver satisfiability
SPAWN [[vc-validity-discharge]] — mechanism note for the validity middleware
SPAWN [[quantifier-instantiation-boundary]] — general quantified SMT vs Yap's Liquid fragment
SPAWN [[vc-validity-before-sat.adr]] — D-009 accepted decision
SPAWN [[vc-validity-discharge.session]] — session record

### Updates

- [[verification-backend.thread]] — added item 31 and reframed item 28.
- [[solver-v2-universal-refinement-false-sat]] — marked resolved/reframed for the verification path.
- [[global-pending-queue]] — marked the identity-refinement item resolved/reframed.
- [[mbqi]], [[incremental-abstraction-extension]], [[quantifier-engine]] — scoped general quantified-SMT concerns away from the ordinary Liquid VC path.
- [[z3-replacement.adr]] — marked reframed by D-009 and inserted the validity-discharge layer.
- [[verification-pipeline]], [[verification-backend]], [[refinement-types]], [[bidir-subtype-verification]], [[cdcl-t-solver]], [[solver-v2-monadic-port.implementation]], [[smt-solver-glossary]], [[liquid-haskell-influence]] — aligned wording with the validity/raw-SAT distinction.
- `REGISTRY.md` — registered Liquid/validity fragment vocabulary and CLARIFIES/AVOIDS/AFFECTS labels.
- `connections.md` — added the VC validity discharge edge cluster.

### Edges

[[vc-validity-before-sat.adr]] --[:REFRAMES]--> [[z3-replacement.adr]]  -- D-001 still stands; D-009 inserts validity between VC IR and raw SAT
[[vc-validity-before-sat.adr]] --[:REFRAMES]--> [[solver-v2-universal-refinement-false-sat]]  -- Identity refinement failure was missing validity discharge on the Yap path
[[vc-validity-discharge]] --[:RESOLVES]--> [[solver-v2-universal-refinement-false-sat]]  -- Resolves the Yap verification-path interpretation
[[vc-validity-discharge]] --[:AVOIDS]--> [[mbqi]]  -- Nested Liquid binders do not require full MBQI on the ordinary path
[[quantifier-instantiation-boundary]] --[:CLARIFIES]--> [[incremental-abstraction-extension]]  -- Fresh-atom extension is general quantified-SMT completeness work
[[verification-backend.thread]] --[:INCLUDES]--> [[vc-validity-before-sat.adr]]  -- Thread item 31 decision record

---

## Session: Testing audit z-yap integration — @2026-06-20 [testing, audit, snapshots, elaboration, integration, gram, verification]

Integrated the testing audit report into z-yap. The HTML report lives at `resources/audits/testing-01/index.html` and is represented in the graph by an audit zettel plus two methodology notes: direct semantic assertions paired with regression snapshots, and explicit triage for snapshot-embedded errors.

The main testing records now reflect the audit's stance: snapshots are still useful for regression, but correctness should be asserted directly; skipped tests are not the only coverage gap; and parser, elaboration, verification, GRAM, bridge, and backend errors should be classified by role before being treated as golden output.

### Spawned

SPAWN [[testing-audit-2026-06-20]] — testing audit findings and resource index
SPAWN [[semantic-assertions-with-regression-snapshots]] — methodology note for direct assertions plus regression snapshots
SPAWN [[snapshot-error-triage]] — classification note for snapshot-embedded errors

### Updates

- [[testing-strategy]] — added audit/methodology hub links and reframed snapshots as regression artifacts paired with semantic assertions.
- [[snapshot-testing]] — added semantic-pairing and error-triage guidance.
- [[integration-testing]] — updated from "one skipped integration test" to active source-level integration plus skipped REPL workflow coverage.
- [[test-coverage-gaps]] — replaced stale skipped-suite inventory with skipped, snapshot-primary, snapshot-error, parser-migration, and active-pipeline gaps.
- [[negative-testing]] — added the audit's first baseline of high-value negative tests.
- [[testing.thread]] — added the audit and derived methodology records.
- `connections.md` — added the testing audit edge cluster.
- `REGISTRY.md` — registered the `audit` tag.

### Edges

[[testing.thread]] --[:INCLUDES]--> [[testing-audit-2026-06-20]]  -- Audit resource and findings index
[[testing-strategy]] --[:INCLUDES]--> [[semantic-assertions-with-regression-snapshots]]  -- Direct assertions plus regression snapshots
[[testing-strategy]] --[:INCLUDES]--> [[snapshot-error-triage]]  -- Embedded snapshot error classification
[[semantic-assertions-with-regression-snapshots]] --[:CLARIFIES]--> [[snapshot-testing]]  -- Snapshots are regression artifacts paired with direct claims
[[snapshot-error-triage]] --[:INFORMS]--> [[test-coverage-gaps]]  -- Snapshot-embedded errors are coverage gaps until classified

---

## Session: Repository docs retirement audit — @2026-06-20 [documentation, audit, cleanup, drift, verification, gram, parser, elaboration]

Integrated the repository-docs audit into z-yap using lifecycle/status edges instead of broad body rewrites. The new audit record states the split: public-facing prose remains in the repository, while durable design authority lives in z-yap plus source paths. Internal architecture/design prose can be retired after unique TODO and reference atoms are migrated into the graph.

The session also corrected false current-state claims in existing zettels where they still described Z3 adapter/dependency paths or an obsolete file-compile pipeline as active. Historical Z3-era records remain preserved as historical records.

### Spawned

SPAWN [[repo-docs-retirement-audit-2026-06-20]] — audit/work item for retiring superseded internal repository docs
SPAWN [[z-yap-agent-skill]] — planned Cursor skill for the z-yap interaction protocol

### Updates

- [[documentation-debt]] — added documentation/audit/cleanup facets and removed the stale external issue-list pointer.
- [[global-pending-queue]] — added the repository-docs retirement audit and z-yap agent skill items; reframed the legacy file-compile item around remaining direct `lowerToMir` tests.
- [[legacy-file-compile]] — marked the file-compile migration implemented and the direct-lowering residue incomplete.
- [[compile-orchestration]], [[yap]], [[yap-explore]], [[v1-elaboration-pipeline]], [[translation-boundary-vc]], [[vc-ir]], [[fuzz-testing]], [[de-moura-bjorner-z3]], [[z3-stay-companion]], [[solver-module-layout]], [[smt-translation]], [[nelson-oppen]], [[m1-implementation]], [[compcert-cakeml-influence]], [[cas-instead-of-smt]], [[barbosa-cvc5]] — corrected active Z3 adapter/dependency and pipeline-shape claims.
- `REGISTRY.md` — registered the `documentation` tag.
- `connections.md` — added the repository-docs retirement edge cluster.

### Edges

[[global-pending-queue]] --[:INCLUDES]--> [[repo-docs-retirement-audit-2026-06-20]]  -- Documentation cleanup work item
[[repo-docs-retirement-audit-2026-06-20]] --[:DOCUMENTS]--> [[documentation-debt]]  -- Audit of stale repository prose
[[repo-docs-retirement-audit-2026-06-20]] --[:ADDRESSES]--> [[documentation-debt]]  -- Retire superseded internal docs and refresh public docs
[[repo-docs-retirement-audit-2026-06-20]] --[:INFORMS]--> [[verification-backend.thread]]  -- Internal verification docs are superseded by IVL/CDCL(T) zettels
[[repo-docs-retirement-audit-2026-06-20]] --[:INFORMS]--> [[gram-evolution.thread]]  -- Internal MIR/GRAM prose is superseded by canonical GRAM/MIR zettels
[[global-pending-queue]] --[:INCLUDES]--> [[z-yap-agent-skill]]  -- Planned Cursor skill for z-yap interaction protocol

---

## Session: Repository docs migration and deletion — @2026-06-20 [documentation, cleanup, syntax, references, parser, verification, gram]

Migrated the remaining knowledge blockers from the old repository docs into z-yap, then deleted the superseded internal documentation files. Public-facing prose (`README.md`, `examples/README.md`, `FAQ.md`) remains for a later refresh.

### Spawned

SPAWN [[surface-syntax-backlog]] — hub for deferred syntax sugar migrated from old TODO notes
SPAWN [[operator-and-application-syntax]] — infix/custom/variadic/named application syntax
SPAWN [[structural-data-traversal-syntax]] — indexing, traversal, deep access/update sugar
SPAWN [[implicit-hole-syntax]] — surface handle for implicit metavariable resolution
SPAWN [[lacks-exclusion-type-operator]] — row/effect exclusion design item
SPAWN [[dependent-match-implication-constraints]] — branch-local assumptions for dependent matches
SPAWN [[elaboration-zoo]], [[language-garden]], [[generating-verification-conditions]], [[dependent-contract-types]], [[implicit-calculus]], [[leijen-scoped-labels]], [[cong-asai-delimited-dependent]], [[thiemann-anton-coroutines]] — reference zettels migrated from old resources notes

### Updates

- [[repo-docs-retirement-audit-2026-06-20]] — migration blockers cleared; remaining work is public README/FAQ/examples refresh.
- [[global-pending-queue]] — added [[surface-syntax-backlog]].
- `AGENTS.md` and `.github/copilot-instructions.md` — removed links to deleted internal docs and pointed architecture guidance at z-yap.
- Removed superseded internal docs: `docs/*`, internal `ARCHITECTURE.md` files, GRAM READMEs, and the old multishot MIR sketch.

### Edges

[[repo-docs-retirement-audit-2026-06-20]] --[:PRODUCED]--> [[surface-syntax-backlog]]  -- Migrated TODO syntax backlog atoms before deleting old docs
[[surface-syntax-backlog]] --[:INFORMS]--> [[parser-migration.thread]]  -- Surface forms feed parser migration planning
[[repo-docs-retirement-audit-2026-06-20]] --[:PRODUCED]--> [[generating-verification-conditions]]  -- Migrated resources bibliography item
[[repo-docs-retirement-audit-2026-06-20]] --[:PRODUCED]--> [[leijen-scoped-labels]]  -- Migrated resources bibliography item
[[cong-asai-delimited-dependent]] --[:INFORMS]--> [[delimited-continuations.thread]]  -- Dependent typing pressure for shift/reset

---

## Session: Multishot MIR example preservation — @2026-06-20 [documentation, continuation, lowering, mir, gram]

Restored the pedagogical content from the deleted `src/lowering/continuations/multishot.mir.md` as a z-yap reference rather than keeping it as a source-tree Markdown file.

### Spawned

SPAWN [[multishot-mir-state-machine-example]] — annotated pseudo-MIR walkthrough for multishot continuation lowering

### Updates

- [[delimited-continuations.thread]] — added the worked example to the sequence and thread membership.
- [[multishot-bridge-serialization]] and [[shift-reset-bridge-lowering]] — added incoming links from the worked example.
- `z-yap/REGISTRY.md` — registered `state-machine`, `bridge`, and `legacy`; folded one-off `contracts`/`coroutine` references back into existing tags.

### Edges

[[multishot-mir-state-machine-example]] --[:CLARIFIES]--> [[multishot-bridge-serialization]]  -- Worked pseudo-MIR for the bridge-resident serialization shape
[[multishot-mir-state-machine-example]] --[:CLARIFIES]--> [[shift-reset-bridge-lowering]]  -- Concrete block-and-jump state-machine example
[[delimited-continuations.thread]] --[:INCLUDES]--> [[multishot-mir-state-machine-example]]  -- Pedagogical pseudo-MIR walkthrough of multishot lowering

---

## Session: Solver parity bugs close-out — @2026-06-21 [verification, solver, euf, ivl, validity, bug, testing]

Verified two open solver-parity bugs in the global queue against current code and closed both. The third candidate — the `lowerToMir` legacy-API residue — was checked and left open.

**EUF congruence propagation** ([[euf-congruence-propagation-bug]]): the solver was restructured under `src/verification/solver/v2/`. Congruence closure now propagates merges to function applications and detects disequality conflicts. `cc.test.ts` asserts `find(f(x)) == find(f(y))` after merging `x ≡ y` and that `(x = y) ∧ (f(x) ≠ f(y))` yields a conflict clause; `trace.test.ts` "EUF congruence contradiction" exercises the end-to-end UNSAT. The duplicate-class arena symptom is gone. This bug had no edges in `connections.md` — wired it into the graph as part of closing.

**Block-scoped let VC parity** ([[block-scoped-let-vc-parity-bug]]): the temporary Z3-oracle `test.fails` was replaced by "block-local let obligations verify through validity discharge", which asserts the unrefined `Num -> Num` block computation is `valid`. The contradictory `(= doubled (* doubled 2))` VC no longer appears; [[vc-validity-discharge]] discharges the obligation. The prior CONTRASTS_WITH edge ("remains VC-generation first") was replaced by a RESOLVES edge.

**Legacy file-compile** ([[legacy-file-compile]]) — checked, not closed. The file-compile production path is migrated (neither `compile.ts` nor `Codegen/modules.ts` reference `lowerToMir`), but `lowerToMir` remains in `src/lowering/lower.ts` (carrying `@deprecated Use GRAM.Bridge.emit instead.`) and is depended on by six test files: `lower.test.ts` (MIR-shape snapshots), `interpret.test.ts` (MIR interpreter, run-to-value), `pretty.test.ts` (MIR pretty-printer), and the three `Codegen/v2/{js,c,erlang}/__tests__/emit.test.ts`. Each uses `lowerToMir` only to obtain a `MIR.Module`. The run-to-value cases for captured-frame, multishot-with-local-frame, resumption-value-plus-captured-var, and struct-binding match are exercised only on this direct path (`interpret.test.ts`), not through the GRAM bridge; [[test-coverage-gaps]] already tracks these as active bridge/runtime parity gaps. Retirement requires repointing those test producers to `GRAM.Bridge.emit` (see the retirement path on [[legacy-file-compile]]). The `incomplete` residue stands.

### Resolved

RESOLVED [[euf-congruence-propagation-bug]] — congruence propagation and disequality conflict detection working; verified by cc/trace tests
RESOLVED [[block-scoped-let-vc-parity-bug]] — block-local let obligation discharges as valid via [[vc-validity-discharge]]

### Updates

- [[euf-congruence-propagation-bug]] — `resolved` tag, status/location/test refreshed to `v2/euf`, added Resolution section, original defect preserved as historical.
- [[block-scoped-let-vc-parity-bug]] — `resolved` tag, status and test name refreshed, added Resolution section, original defect preserved as historical.
- [[global-pending-queue]] — both bugs flipped to `[x]` with resolution notes.
- [[verification-backend.thread]] — item 29 marked resolved.
- `connections.md` — EUF bug wired into the graph (AFFECTS/FIXES/INCLUDES); block-scoped-let CONTRASTS_WITH → RESOLVES.

### Edges

[[congruence-closure]] --[:FIXES]--> [[euf-congruence-propagation-bug]]  -- Merge propagates to congruent applications; disequality conflict detected
[[m2-implementation]] --[:FIXES]--> [[euf-congruence-propagation-bug]]  -- EUF milestone delivers working congruence propagation
[[euf-congruence-propagation-bug]] --[:AFFECTS]--> [[congruence-closure]]  -- Defect was in merge propagation
[[euf-congruence-propagation-bug]] --[:AFFECTS]--> [[euf-theory]]  -- EUF decision returned spurious SAT
[[global-pending-queue]] --[:INCLUDES]--> [[euf-congruence-propagation-bug]]  -- Resolved solver parity bug
[[vc-validity-discharge]] --[:RESOLVES]--> [[block-scoped-let-vc-parity-bug]]  -- Block-local let obligation discharges as valid

---

## Session: Lowering test retirement scoping — @2026-06-22 [testing, lowering, mir, gram, bridge, tech-debt, documentation]

Traced the test surface around `lowerToMir` to make the [[legacy-file-compile]] residue actionable. Six test files depend on `lowerToMir` purely as a `MIR.Module` producer: `lower.test.ts` (MIR-shape snapshots), `interpret.test.ts` (MIR interpreter, run-to-value), `pretty.test.ts`, and the three `Codegen/v2/{js,c,erlang}/emit.test.ts`. Confirmed the integration layer: the `runScript` helper runs EB→GRAM→Bridge→MIR→codegen but snapshots MIR/codegen as strings; only the REPL test (`examples-readme.repl.test.ts`) actually interprets EB→GRAM→MIR→value, via `Pipeline.run`.

Recorded the retirement path on [[legacy-file-compile]]: repoint the six test files' MIR producer to `GRAM.Bridge.emit`, consolidating run-to-value assertions into the interpreter tests (where the captured-frame / multishot-with-local-frame / struct-binding-match cases belong) and leaving `bridge.test.ts` asserting emitted-MIR shape. [[test-coverage-gaps]] already inventories those run-to-value parity gaps; added a BLOCKS edge.

Considered and **rejected** a general "test-layer responsibility" zettel — the Core→codegen pipeline shape is lowering-specific, not a Yap-wide principle, and the unit-per-pass / integration-on-composition pattern is generic. Deferred a scoped "how Yap structures testing" methodology note to a queue item instead. Also corrected the imprecise "MIR-interpret boundary" wording in the 2026-06-21 close-out block above.

### Enqueued

ENQUEUE Document how Yap structures testing (methodology note, scope carefully) — added to [[global-pending-queue]]

### Updates

- [[legacy-file-compile]] — added a Retirement path section enumerating the six dependent test files and the producer-repoint steps; added `testing` tag.
- [[test-coverage-gaps]] — connected to the retirement via a BLOCKS edge (its active bridge/runtime parity gaps gate `lowerToMir` removal).
- `thread.md` — corrected the "MIR-interpret boundary" paragraph in the prior close-out block.

### Edges

[[test-coverage-gaps]] --[:BLOCKS]--> [[legacy-file-compile]]  -- GRAM-path run-to-value parity gaps gate lowerToMir retirement

---

## Session: MIR IR / direct-lowering split — @2026-06-22 [mir, ir, lowering, gram, bridge, codegen, deprecated, documentation, drift]

Split the `mir-lowering` hub to fix current-state drift and record the lowering evolution. The hub conflated two concerns: MIR-the-IR (live, consumed by codegen, produced by the bridge) and the `lowerToMir` direct driver (deprecated, no production callers). Verified against code: `lowerToMir` has zero non-test callers; `GRAM.Bridge.emit` is the producer in `pipeline/lower.ts` (REPL + file-compile) and `explore/pipeline.ts` (explorer).

New [[mir]] zettel holds the IR: block-SSA structure, type erasure, production via the bridge, consumption by JS/C/Erlang codegen. [[mir-lowering]] retitled "Direct MIR lowering (`lowerToMir`)", tagged `deprecated` + `legacy`, banner pointing at [[gram-to-mir-bridge]] and [[mir]]; its dispatch-module inventory preserved as historical reference. Edges triaged in `connections.md`: IR-level edges (codegen CONSUMES, bridge PRODUCES, GRAM representation contrasts, type erasure, REPL/explorer consumption) retargeted to [[mir]]; direct-lowering-act edges (EB.Term traversal, closure-conversion/pattern/defunctionalization translation, lowering-approach contrasts, the retrospective's rejection) stay on [[mir-lowering]]. Corrected the stale `compile-orchestration DELEGATES_TO mir-lowering` to the bridge.

This follows the same lifecycle pattern as the earlier `shift-reset-mir-lowering` → `shift-reset-bridge-lowering` deprecation.

### Spawned

SPAWN [[mir]] — the live MIR IR / format zettel, split out of the former lowering hub

### Updates

- [[mir-lowering]] — retitled and deprecated; now the direct `lowerToMir` driver record, IR knowledge moved to [[mir]].
- [[gram-to-mir-bridge]] — scope widened from "explorer" to explorer/REPL/file-compile; canonical-producer status and `lowerToMir` deprecation stated.
- `connections.md` — retargeted IR-level edges to [[mir]]; added SUPERSEDES/DEPRECATES/PRODUCES lifecycle edges.

### Edges

[[gram-to-mir-bridge]] --[:SUPERSEDES]--> [[mir-lowering]]  -- Bridge replaced the direct lowerToMir route as the canonical EB→MIR producer
[[gram-to-mir-bridge]] --[:DEPRECATES]--> [[mir-lowering]]  -- Lifecycle: direct lowering marked deprecated
[[mir-lowering]] --[:PRODUCES]--> [[mir]]  -- Direct path emitted the MIR IR (now produced by the bridge)
[[gram-to-mir-bridge]] --[:PRODUCES]--> [[mir]]  -- Emits MIR Module (retargeted from mir-lowering)
[[gram]] --[:SUPERSEDES]--> [[mir]]  -- As the canonical IR

---

## Session: Release artifacts and hosted Explorer — @2026-06-24 [release, distribution, deployment, fly-io, github-actions, explorer, automation, infrastructure]

Established Yap's first release/distribution path beyond "clone and run pnpm". Version tags now drive alpha releases, GitHub Actions rebuilds tagged trees into CLI tarballs, packaged commands carry their runtime assets, and Fly.io hosts the Explorer on separate release and mainline channels.

### Spawned

SPAWN [[tag-driven-alpha-release-flow]] — release tags, alpha versioning, and GitHub Release artifact flow
SPAWN [[package-artifact-distribution]] — installable CLI package boundary and runtime asset inclusion
SPAWN [[explorer-deployment-channels]] — Fly.io `try-yap` / `try-yap-next` channel split
SPAWN [[release-and-explorer-deployment.session]] — session record for the release/deploy work

### Updates

- [[yap]] — connected to release, package distribution, and Explorer deployment records.
- [[yap-explore]] — connected to package assets and hosted deployment channels.
- [[compile-orchestration]] — connected to package artifact distribution as the installed CLI boundary.
- [[ci-pipeline]] — connected to GitHub Actions release and deployment automation.
- `REGISTRY.md` — registered release/deployment/distribution tags and the `DEPLOYS` edge label.

### Edges

[[release-and-explorer-deployment.session]] --[:PRODUCED]--> [[tag-driven-alpha-release-flow]]  -- Release automation knowledge from alpha release setup
[[release-and-explorer-deployment.session]] --[:PRODUCED]--> [[package-artifact-distribution]]  -- Packaged CLI artifact boundary
[[release-and-explorer-deployment.session]] --[:PRODUCED]--> [[explorer-deployment-channels]]  -- Fly.io stable/next Explorer channels
[[tag-driven-alpha-release-flow]] --[:PRODUCES]--> [[package-artifact-distribution]]  -- Tags produce installable release tarballs
[[explorer-deployment-channels]] --[:DEPLOYS]--> [[yap-explore]]  -- Fly.io serves release and mainline Explorer channels

---

## Session: SPJ + Sprite survey; functional patterns and nondet substrate — @2026-06-26 [pattern, continuation, language, compiler, codegen, effect, elaboration, concept, exploration]

Surveyed two sources against the ZK. SPJ (1987), *The Implementation of Functional Programming Languages* — scanned book, full TOC rendered; 14 techniques mapped to ZK; open gaps identified: lambda-lifting (planned, unstarted), SCC dependency analysis for mutual recursion, tail-call optimization (no zettel). Sprite (Antoy & Jost, 2016, arXiv:1608.04016) — read in full; a native Curry compiler via LLVM and the Fair Scheme.

Discussion surfaced that [[functional-patterns]] conflated Curry-style functional patterns with Haskell view patterns — different semantics, different compilation paths. The zettel was rewritten to cover the actual concept: function symbols in pattern positions, run backwards to generate constructor preimages. The design space was split into [[narrowing-vs-residuation]] (full narrowing vs unification-based single-result). The compilation architecture was split into [[two-tier-pattern-compilation]] (constructor tier via Maranget decision trees; functional-pattern tier via a non-determinism substrate).

The proposition that shift/reset is the substrate for non-determinism in Yap — grounded in [[filinski-representation-theorem]] — was recorded as [[choose-fail-effect]] (expose `choose`/`fail` as an algebraic effect) and [[nondet-handler]] (handler selects the search strategy). [[fair-nondet-scheduling]] captures the work-queue + fair-rotation handler, the mechanism behind Sprite's operational completeness. [[call-time-choice]] records the strict-language property that eliminates the [[choice-fingerprints]] / [[pull-tab]] clone-consistency machinery that lazy graph rewriting requires. The Sprite paper itself is recorded as a reference zettel [[sprite]], with [[icurry]] and [[tagged-dispatch]] extracted as standalone technique zettels.

### Spawned

SPAWN [[filinski-representation-theorem]] — multi-shot shift/reset + reflection encodes any monad; theoretical anchor for choose/fail
SPAWN [[choose-fail-effect]] — expose nondeterminism as choose/fail algebraic effect; handler selects strategy
SPAWN [[nondet-handler]] — handler over choose/fail is the search strategy; different handlers give DFS/collect-all/fair
SPAWN [[fair-nondet-scheduling]] — work queue + fair rotation; operational completeness guarantee
SPAWN [[call-time-choice]] — strict let-binding forces choice at binding time; eliminates clone-consistency problem
SPAWN [[narrowing-vs-residuation]] — two readings of functional-pattern inversion: narrowing vs residuation
SPAWN [[two-tier-pattern-compilation]] — constructor tier (decision trees) + functional-pattern tier (nondet substrate)
SPAWN [[sprite]] — reference zettel for Antoy & Jost 2016
SPAWN [[pull-tab]] — lift a choice out of a needed position, sharing the unevaluated remainder
SPAWN [[tagged-dispatch]] — compile-time integer tags + static jump table + indirect branch
SPAWN [[choice-fingerprints]] — cloned choice consistency via identifier annotation
SPAWN [[icurry]] — two-IR split: declarative case-IR → imperative statement-IR with explicit choices

### Updates

- [[functional-patterns]] — full rewrite: removed impl-map content and view-pattern conflation; now covers the actual concept with [[narrowing-vs-residuation]] and [[two-tier-pattern-compilation]] as satellite zettels.

### Edges

[[functional-patterns]] --[:CONTRASTS_WITH]--> [[view-patterns]]  -- inverse vs forward; different semantics
[[functional-patterns]] --[:MOTIVATES]--> [[narrowing-vs-residuation]]  -- inversion requires a choice of semantics
[[filinski-representation-theorem]] --[:ENABLES]--> [[choose-fail-effect]]  -- grounds choose/fail as derivable
[[choose-fail-effect]] --[:CONTRASTS_WITH]--> [[nondeterminism-multishot]]  -- effect-based handler vs built-in replay
[[call-time-choice]] --[:ADDRESSES]--> [[choice-fingerprints]]  -- strictness removes the root cause
[[pull-tab]] --[:MOTIVATES]--> [[choice-fingerprints]]  -- pull-tab creates the clones that need tracking
[[icurry]] --[:CONTRASTS_WITH]--> [[gram-to-mir-bridge]]  -- explicit choice nodes vs nondet resolved upstream

---

## Session: Pulse editorial fill + Explorer thread split — @2026-06-27 [documentation, hub, reference, explorer]

Filled [[pulse]] — replaced all twelve `> **TODO**` placeholders with curated per-thread narrative paragraphs distilled from each thread's hub, members, and neighborhood (one investigation agent per thread, grounded against code where cheap). Split the former combined "Explorer Audit / Explorer Evolution" heading into two sections matching `status.js`: [[explorer-audit.thread]] (archived; full paragraph — snippet sweep, the fixes it produced, the implicit-generalization decision it forced, and the two findings handed to [[pipeline-stabilization.thread]]) and [[explorer-evolution.thread]] (short stub; 0/0, roadmap-only — provenance / cross-highlighting / diff / timing / graph-viz designed but untracked). Pulse header and the auto-managed connections block left intact.

Investigation surfaced ZK staleness to triage separately (discussed this session, not yet fixed): [[bubble-semantics]] status vs the landed Phase 1; [[mu-types]] redundant `implemented`+`incomplete` dual tag; [[milestone-5-explanations]] contradictory `planned`+`deprecated`; [[gram]] hub still framing [[gram-to-mir-bridge]] as speculative against D-006; [[gram-next-steps]] listing the built bridge as planned step 1 and lambda-lifting twice; [[gram-pap-pass]] `implemented` vs the GRAM thread sequence saying "planned"; stale edge notes on [[test-coverage-gaps]] and a vacuous `BLOCKS` from [[tmp-pipeline-stub]]. Quality-theory status-in-prose sweep and the repo-doc/code drift on usage-vector handling deferred to a later QC pass.

### Resolved

RESOLVED Fill in `pulse.md` editorial prose per active thread — closed in [[global-pending-queue]]

### Updates

- [[pulse]] — all thread sections written; Explorer split into Audit + Evolution.
- [[global-pending-queue]] — closed the pulse-fill item.

No new edges.

---

## Session: ZK staleness batch — status retags + edge repair — @2026-06-27 [documentation, drift, audit, cleanup, hub]

Cleared the staleness surfaced during the pulse fill. Status retags: [[bubble-semantics]] `planned`/`needs-design` → `in-progress` (Phase 1 landed, Phase 2 verification pending), with the DC thread-hub item 12 updated to match; [[mu-types]] dropped redundant `incomplete` (kept `implemented` — the mechanism works/tests pass; the occurs-check-recovery gap stays tracked on [[equirecursive-types]]); [[milestone-5-explanations]] dropped the contradictory `planned`, leaving it `deprecated` with the Z3-era body frozen (no replacement zettel — the explanations goal is desirable but not currently tracked live), and the verification thread-hub item 11 reworded to deprecated/superseded; [[gram-pap-pass]] thread-hub item 20 `planned` → `implemented` (matches the zettel). Prose-vs-decision: [[gram]] hub stopped framing [[gram-to-mir-bridge]] as "(speculative)" — now "(implemented; canonical MIR producer per D-006)"; [[gram-next-steps]] marked the bridge as done (step 1, in `src/GRAM/bridge/` not `src/lowering/`) and de-duplicated the doubled lambda-lifting entry.

Edge repair in `connections.md` (re-embedded): replaced the vacuous `[[tmp-pipeline-stub]] --[:BLOCKS]--> [[v2-elaboration-pipeline]]` (the tmp.ts stubs never materialised) with `[[v2-elaboration-pipeline]] --[:OBSOLETES]--> [[tmp-pipeline-stub]]`, and tagged tmp-pipeline-stub `legacy` (dropped `incomplete`) as a historical migration record. Corrected stale `inference.v2`/`checking.v2`/`modal.ts`-does-not-exist notes on three [[test-coverage-gaps]] edges to describe the real coverage gaps. Updated gram-next-steps roadmap edge notes for the renumbered items.

Deferred to a later QC pass: status-in-prose cleanup (scoped to content zettels — milestones, [[row-theory]] — not thread hubs, which legitimately carry per-item status) and the repo-doc/code drift on usage-vector handling (`.github/copilot-instructions.md` "v2 drops usages" vs code threading `Q.Usages`).

### Edges

[[v2-elaboration-pipeline]] --[:OBSOLETES]--> [[tmp-pipeline-stub]]  -- Live pipeline replaced the planned tmp.ts stubs

### Removed edges

[[tmp-pipeline-stub]] --[:BLOCKS]--> [[v2-elaboration-pipeline]]  -- Vacuous: the stub never existed

### Updates

- [[bubble-semantics]], [[mu-types]], [[milestone-5-explanations]], [[gram-pap-pass]] (via hub), [[tmp-pipeline-stub]] — status retags.
- [[gram]], [[gram-next-steps]] — bridge de-speculated / marked done; lambda-lifting de-duplicated.
- [[delimited-continuations.thread]], [[verification-backend.thread]], [[gram-evolution.thread]] — hub sequence lines reconciled to the retags.
- [[test-coverage-gaps]] — three edge notes corrected to current file layout.

---

## Session: Closure capture investigation + ABI queue item — @2026-06-28 [lowering, mir, closure, bridge, compiler, codegen, queue]

Investigated [[pipeline-stabilization.thread]] closure-capture gaps against the canonical GRAM → bridge pipeline. Confirmed [[gram-pap-pass]] applies only to unsaturated `EXTERNAL` nodes (FFI partial application), not user `:CLOSURE` / `:LAMBDA` nodes — PAP and lexical closure capture are separate tracks. The GRAM `closure` pass already records per-lambda `:ENV` and `:CAPTURE`; the gap is bridge emission (currently extra formals + bare `FuncRef`, not the `{ __fn, __env }` bundle convention used by legacy `lowerToMir` and `pap.ts`). Fix for curried returns under the bundle ABI is bridge-side, not a new GRAM pass. Lambda lifting ([[lambda-lifting]]) is a separate planned enrichment and not required for the bundle fix.

Deferred cross-cutting design: per-backend ABI choice and package/module reconciliation when targets or dependencies diverge on calling convention.

### Enqueued

ENQUEUE [[compilation-abi-selection]] — discuss bundle vs lifting vs native conventions per target, and package boundary coherence

### Spawned

SPAWN [[compilation-abi-selection]] — design-space zettel for ABI selection and package reconciliation

### Edges

[[compilation-abi-selection]] --[:ADDRESSES]--> [[compilation-by-selection]]  -- Backend-specific convention choice
[[compilation-abi-selection]] --[:ADDRESSES]--> [[package-artifact-distribution]]  -- Package boundary must carry ABI assumptions
[[global-pending-queue]] --[:INCLUDES]--> [[compilation-abi-selection]]  -- Deferred design discussion

---

## Session: Bridge closure capture resolved — @2026-06-28 [lowering, mir, closure, bridge, compiler, documentation]

Yap PR [#8](https://github.com/tiansivive/yap/pull/8) merged the bridge bundle ABI fix for curried returns: lifted functions take `[env, formal]`, first-class function values are `{ __fn, __env }`, and application reads the bundle before indirect call. GRAM's closure pass already records `:ENV` / `:CAPTURE`; the gap was bridge emission (extra formals + bare `FuncRef`), now aligned with [[closure-conversion]] and the legacy lowering path. Retagged [[bridge-closure-capture]] `implemented`; struck through on [[pipeline-stabilization.thread]] #12 and [[explorer-audit.thread]] #9; removed from [[gram-to-mir-bridge]] known gaps; updated [[pulse]] Explorer Audit, GRAM Evolution, and Pipeline Stabilization narratives.

### Resolved

RESOLVED [[bridge-closure-capture]] — yap#8 lands shared bundle ABI in GRAM→MIR bridge emission

### Updates

- [[bridge-closure-capture]] — durable bundle-ABI design prose; `implemented` retag; `code:tiansivive/yap#8` ref.
- [[pipeline-stabilization.thread]], [[explorer-audit.thread]], [[gram-to-mir-bridge]], [[pulse]] — closure capture closed across threads and editorial snapshot.

### Edges

[[bridge-closure-capture]] --[:RELIES_ON]--> [[closure-conversion]]  -- Shared bundle ABI convention
[[gram-to-mir-bridge]] --[:RESOLVES]--> [[bridge-closure-capture]]  -- Bridge emits bundle ABI for curried returns

---

## Session: Bridge label resolution design; closure capture refresh — @2026-06-29 [lowering, graph, gram, recursion, row-types, bridge, codata, mir]

Refreshed the pipeline-stabilization picture after the closure-capture work landed (PR #8, `{__fn, __env}` bundle ABI on both construction and call sides; [[bridge-closure-capture]] now implemented). Designed the remaining label track. The bridge's name-keyed label map, populated in field order, is the sole source of the forward/backward resolution asymmetry; resolving `:label` references to `:refers_to` graph edges in a dedicated GRAM pass ([[gram-label-resolution-pass]]) — mirroring bound-variable resolution and the `ctx.sigma` lookup ([[label-lookup]]) — removes it and keeps the bridge mechanical. A struct with inter-field references is a value-level `letrec` ([[recursive-struct-binding]]): strict knot-tying via in-place record construction (the lowering-level [[knot-tying]]) handles deferred reads under a lambda in any order; define-before-use for eager data references removes the need for dependency ordering, trading away the topological-sort / SCC treatment (GHC dependency analysis; Waddell-Sarkar-Dybvig *Fixing Letrec*; OCaml guarded recursive values). [[label-cycle-guardedness]] is the admissibility gate: lambda-guarded cycle = recursive function (admit); constructor-guarded eager cycle = codata (reject pending nu); unguarded = ill-founded (reject). Bumped codata/`ν` priority on [[recursion.thread]] — the first user-written stream hits the guardedness rejection.

### Spawned

SPAWN [[gram-label-resolution-pass]] — resolve `:label` to `:refers_to` edges via a row-scoped GRAM pass; subsumes the bridge name-map
SPAWN [[recursive-struct-binding]] — struct label group as value-level letrec; knot-tying + define-before-use, no dependency analysis
SPAWN [[label-cycle-guardedness]] — admissibility gate for recursive label cycles (lambda-guarded admit; eager codata / unguarded reject)

### Updates

- [[bridge-forward-label-refs]] — reframed from topological-sort pass to edge-based resolution + define-before-use.
- [[pipeline-stabilization.thread]] — items 9/9a annotated with the converged design.
- [[recursion.thread]] — codata/nu priority bump recorded.

### Edges

[[gram-label-resolution-pass]] --[:SUPERSEDES]--> [[bridge-label-resolution]]  -- Edge resolution replaces the order-dependent name map
[[recursive-struct-binding]] --[:MIRRORS]--> [[knot-tying]]  -- Lowering-level placeholder-and-mutate
[[label-cycle-guardedness]] --[:SPECIALIZES]--> [[syntactic-guardedness]]  -- Guardedness as a lowering-time admissibility check
[[label-cycle-guardedness]] --[:MOTIVATES]--> [[nu-types]]  -- Erroring on eager codata forces value-level coinduction

---

## Session: PR explorer previews, governance refresh, agent-instruction consolidation — @2026-06-30 [infrastructure, deployment, fly-io, github-actions, documentation, agent, skills, convention, automation, elaboration]

Three strands of repository-hygiene work plus one knowledge correction. (1) Added label-gated per-PR Explorer previews on Fly.io: a `deploy:explorer` label spins up an isolated `try-yap-pr-<n>` app (reusing `fly.try-yap-next.toml` + `Dockerfile`), redeploys on push, posts the preview URL as a sticky PR comment, and destroys the app on close/merge or label removal — a third, ephemeral channel beside the `try-yap`/`try-yap-next` channels. (2) Refreshed `.github` governance: renamed stale `lama`→`yap` throughout, rewrote CONTRIBUTING to a personal/discuss-first posture, moved SECURITY to GitHub private vulnerability reporting (no email), pointed the CoC contact at the maintainer handle, and cut the PR template to `## Summary` + `## How to test`. (3) Consolidated agent instructions: `AGENTS.md` is now the canonical, load-independent entry — it states that design knowledge lives in z-yap, defines a session contract (start `/load` · during: consult-rules-by-task + design posture + proactive cross-cutting/cross-disciplinary ideation + enqueue future work · close-out: record in z-yap), and carries a task→rule routing table. `.github/copilot-instructions.md` reduced to a pointer; `.cursor/rules/*` made the single detailed source with `alwaysApply` preserved; added `communication.mdc` (prose density/variation/forward-progress) mirrored to global `~/.claude/CLAUDE.md`.

The knowledge correction: elaboration **does** thread `Q.Usages` (`check`/`infer` return `[EB.Term, Q.Usages]`), but that threading is deprecated — the upcoming usage-semantics system enforces multiplicities in the verification pass and will not consume the elaboration-threaded vectors. The prior framing (modal wrappers stripped / usages absent in inference) is inaccurate about the vector's presence; the enforcement-doesn't-exist claim stands.

### Enqueued

ENQUEUE usage-semantics framing correction — reconcile [[modality-system]] / [[verification-modal-phase]] / [[pulse]] wording to "usage vectors are threaded through elaboration but deprecated and unconsumed", not absent.

### Notes

- This advances [[agent-guidelines-zettelization]] (operational agent rules consolidated into a canonical entry + routing) without yet extracting the convention zettels it scopes — that work and [[convention-zettel-promotion]] remain open.
- Proposed but not created pending confirmation: a `pr-explorer-preview-deploys` zettel extending [[explorer-deployment-channels]], and a session zettel for the agent-instruction restructure.

---

## Session: GRAM struct node, label resolution, and the record-capture knot — merged @2026-06-30 [lowering, graph, gram, recursion, row-types, bridge, codata, mir]

Implemented and merged (PR #9, branch gram-record-labels) the vertical designed over the preceding sessions. Record values now lower through a flat [[gram-struct-node]] (`struct` node with `:field` edges) instead of the type-level row cons-list, emitted by `translate` for the `Struct`-atom form only. The [[gram-label-resolution-pass]] resolves each `:label` to a `:refers_to` edge via a frame/lambda scope stack and emits `:scope` to the lambdas a reference escapes; the closure pass then captures the owning record for those crossings, and a `knot` pass marks record-capturing fields `backpatch` so the bridge allocates the record, binds it, and fbip-fills once the capturing closures are built — keeping the bridge a mechanical translator ([[recursive-struct-binding]]). Eager-only cycles are rejected and lambda-guarded ones admitted by the `label-cycles` pass ([[label-cycle-guardedness]]). Verified at MIR + runtime: forward/backward label refs, a label captured into a closure reading off the record, and self/mutual recursion tying via the shared record. An independent style audit drove follow-ups: ts-pattern dispatch, immutable traversal (dropped dead visited sets, functional cycle check), removed casts, and a shared `structOf` helper.

Deferred (registered in the plan): the eager-reference-to-a-backpatched-field knot invariant; where coinduction lives (typing `ν` vs a GRAM productivity check); replacing the resolve-labels traversal with LoGRAM; and the source-level recursion blocker (occurs-check / mu types in elaboration). All unreachable-from-source today since recursive struct types error in elaboration first.

### Resolved

RESOLVED [[bridge-forward-label-refs]] — edge-based resolution + demand-driven bridge walk
RESOLVED [[bridge-label-closure-gap]] — capture-the-record + knot; labels resolve through closures

### Updates

- [[gram-struct-node]], [[gram-label-resolution-pass]], [[recursive-struct-binding]], [[label-cycle-guardedness]] → `implemented`, with `branch:gram-record-labels` / `code:tiansivive/yap#9` refs; bodies reconciled to the shipped mechanism (demand-driven walk, knot, no define-before-use).
- [[pipeline-stabilization.thread]] — items 9 / 9a marked implemented.

### Edges

[[gram-label-resolution-pass]] --[:FIXES]--> [[bridge-forward-label-refs]]
[[gram-label-resolution-pass]] --[:FIXES]--> [[bridge-label-closure-gap]]
[[recursive-struct-binding]] --[:FIXES]--> [[bridge-label-closure-gap]]

---

## Session: Variant discriminant representation and struct dispatch bridge — implemented @2026-07-01 [pattern, lowering, gram, mir, codegen, verification, row-types]

Implemented `z-yap/resources/plans/variant-dispatch-rework.plan.md` on branch `variant-dispatch-struct-bridge`. Variant values now elaborate to the runtime struct `{ __tag: Atom(tag), payload: value }` while retaining `Variant(row)` as their type; NbE pattern `meet`, pattern evaluation, the GRAM pattern pass, deprecated MIR lowering, and verification now read that representation consistently. The GRAM bridge no longer throws for `switch{kind:"struct"}`: `emitSwitch` resolves the switch's own `:inspect` edge, routes tag switches through `__tag`, and routes struct switches into the projected branch subtree so field binders, literal fields, and nested struct fields execute end-to-end.

Validation: `pnpm test` passes (92 files, 838 tests, 45 skipped) and `pnpm typecheck` passes. Targeted refinement tests confirmed the ordered-list negative case is again `invalid` after verification was taught the `__tag`/`payload` format. Changed-file ESLint still reports the repository's existing lint debt in touched legacy tests and modules; the newly introduced restricted `E.isLeft` inspection was removed.

### Resolved

RESOLVED [[bridge-struct-dispatch]] — struct switches lower through inspect/projection branches instead of tag-style string comparison

### Updates

- [[variant-types]] — value-arm representation recorded as `{ __tag, payload }`, with verification alignment.
- [[tagged-values]] — tagged inference now documented as runtime discriminant construction.
- [[pipeline-stabilization.thread]] — bridge struct dispatch marked implemented; type erasure remains the stabilization frontier.
- [[pulse]] — Pipeline Stabilization paragraph now names type erasure as next step.

### Deferred

- The plan's optional tracking item remains pending: new design zettel / value-representation ADR / string-comparison defect zettel require a separate confirmation before creation.

---

## Session: Variant dispatch tracking close-out — @2026-07-02 [pattern, gram, row-types, lowering, verification, adr, zettelkasten]

Closed the remaining z-yap tracking item for `variant-dispatch-rework.plan.md`. D-010 records the settled `{ __tag, payload }` runtime discriminant representation for tagged variant values. The deferred typed/polymorphic dispatch-equality question remains valid after the bridge fix: GRAM decision trees identify discriminants, but semantic equality for non-tag dispatch belongs in elaboration where type information and equality evidence are available. The float/record stringification issue is now a separate deferred bug, scoped to literal/general dispatch rather than variant tags.

### Spawned

SPAWN [[variant-discriminant-representation.adr]] — accepted ADR for the fixed tagged-value runtime discriminant
SPAWN [[typed-dispatch-equality]] — deferred design note for elaboration-resolved dispatch equality and discrimination
SPAWN [[string-dispatch-float-record-bug]] — deferred bug for literal/general dispatch through lossy stringification

### Enqueued

ENQUEUE [[typed-dispatch-equality]] — dispatch equality design belongs after the representation fix
ENQUEUE [[string-dispatch-float-record-bug]] — literal/general dispatch bug remains orthogonal to variant tags

### Updates

- `z-yap/resources/plans/variant-dispatch-rework.plan.md` — setup-tracking marked completed.
- [[variant-types]], [[tagged-values]], [[bridge-struct-dispatch]] — linked to adr:D-010.
- [[pipeline-stabilization.thread]], [[pattern-matching.thread]], [[pulse]], [[global-pending-queue]] — updated with the deferred follow-ups.

### Edges

[[variant-discriminant-representation.adr]] --[:DEFINES]--> [[variant-types]]  -- Runtime value representation for row variants
[[variant-discriminant-representation.adr]] --[:DEFINES]--> [[tagged-values]]  -- Tagged introduction writes the fixed discriminant shape
[[typed-dispatch-equality]] --[:ADDRESSES]--> [[gram-pattern-pass]]  -- Decision trees need typed comparison for non-tag discriminants
[[string-dispatch-float-record-bug]] --[:MOTIVATES]--> [[typed-dispatch-equality]]  -- Mis-stringified values show why dispatch equality must be typed

## Session: Lint governance overhaul — audit, ratchet, typed monad primitives @2026-07-03 [infrastructure, tooling, automation, convention, monad, testing, agent, cleanup]

Audited the ESLint ruleset against its stated goal (better LLM output) and found the failure mode: ~1500 violations, CI lint red on main, merges over failing checks — a permanently red gate carries no information. Restructured in layers. (1) Rule/idiom reconciliation: dropped rules that fight the house style (`require-yield` vs uniform `function*` handlers, `no-namespace`, `no-plusplus` supply counters, `no-duplicate-type-constituents` vs open-vocabulary `Tag | Label` docs); scoped relaxations for tests (unsafe-\*, non-null, Either narrowing) and CLI/config boundaries; deleted dead code outright (`scripts/test.ts` importing removed z3-solver; the orphaned direct EB.Term→JS `Codegen/terms.ts`/`modules.ts`, corroborated by knip). (2) Unified the split tsconfig: fixed the 29 type errors in five stale test files (Clause namespace, Err/Conflict channel, statement `location`, `satisfies`-keeps-`never[]` in quantifier `State.empty`, one autofix-eaten load-bearing cast), deleted `tsc.tsconfig.json` — killing the phantom `Unsafe … of type error` class, which was TS's internal error type leaking from the divergent lint graph. (3) Typed the monad Do protocol: `Prim<A> = Generator<Eff<A>, A, A>` for single-effect leaves, `yield* pure(effect)` replacing bare yields, TNext=any retained on composites (delegation requires outer-assignable-to-inner), circular-inference pitfall documented — recorded in [[generator-monad]]. Sanctioned imperative cores (Do drivers, NbE evaluator pending [[evaluation-monad-rework]], supplies) carry scoped carve-outs. (4) The ratchet: ESLint 9.39 + `eslint-suppressions.json` baselining the remaining 371 (1476 → 371, 75% real reduction); knip entries made truthful (CLI, tests, Codegen barrels as declared API surface) with category severities warn-only pending cleanup. `pnpm lint` and `pnpm lint:knip` green for the first time. Instruction files synced: lint contract + `_`-prefix + sanctioned cores in coding-style.mdc, one-tsconfig in conventions.mdc (bare-tsc warning retired), test lint posture in testing.mdc, gate policy in DEVELOPMENT.md; knip exposed and fixed stale `infer.ts` dispatch references.

### Spawned

SPAWN [[lint-governance]] — gate-design principle: zero-baseline diff-scoped enforcement, channel separation, ratchet, sanctioned mutable cores
SPAWN [[evaluation-monad-rework]] — NbE evaluator work-stack machine to be absorbed into an Evaluation generator monad; lint carve-out self-retires
SPAWN [[lint-governance.session]] — session zettel + transcript (aea7463d)

### Enqueued

ENQUEUE [[legacy-file-compile]] — migrate live MIR surface (`mir.ts`, `interpret.ts`, `shared/primops`) out of lint-ignored `src/lowering`
ENQUEUE [[evaluation-monad-rework]] — evaluator monad port
ENQUEUE knip cleanup pass — delete verified orphans (incl. `elaboration/infer.ts`, `shared/cont.ts`, `logging.ts`+winston, immutagen), then flip knip `files`/`dependencies` back to error

### Updates

- [[generator-monad]] — yield-protocol typing discipline added; `MutState` skolems drift fixed.
- [[ci-pipeline]] — lint/knip/typecheck gate semantics updated to the baseline world.
- [[legacy-file-compile]] — lint-ignore note + live-file migration path.

### Edges

[[lint-governance]] --[:CONSTRAINS]--> [[ci-pipeline]]  -- Gate severities, suppression baseline, knip entry policy
[[lint-governance]] --[:REFERENCES]--> [[generator-monad]]  -- Do drivers as sanctioned imperative cores
[[lint-governance]] --[:MOTIVATES]--> [[evaluation-monad-rework]]  -- Evaluator carve-out is temporary
[[lint-governance]] --[:AFFECTS]--> [[legacy-file-compile]]  -- src/lowering lint-ignored pending retirement

## Session: Register GRAM record/label deferred work — @2026-07-03 [gram, recursion, verification, elaboration, zettelkasten, deferred]

The GRAM record-value / label-resolution / knot vertical (PR #9) closed with its deferred work living only in the plan and thread prose. Transcribed the six deferred items into durable zettels and queue entries so they are reachable by graph traversal. Two are upstream defects surfaced while building the label path (a checking-path scope loss and a missing IVL formula case); one is the knot capture-order invariant flagged in the PR #9 review; one is the open fork on where coinduction/productivity lives. The remaining two — replacing the resolve-labels descent with a LoGRAM query, and the open-`:tail` / bridge-row-utils cleanup — attach to existing zettels rather than new ones.

### Spawned

SPAWN [[checking-path-label-unbound]] — upstream elaboration bug: annotated struct label ref unbound on the `[struct, Sigma]` check path
SPAWN [[ivl-label-translation]] — upstream verification bug: no `Label` case in IVL formula synthesis
SPAWN [[knot-eager-capture-invariant]] — knot correctness rests on capture-after-allocation; mixed eager+guarded cycles violate it
SPAWN [[coinduction-typing-vs-lowering]] — decision-pending: productivity as a typing property vs a lowering-time check

### Enqueued

ENQUEUE [[checking-path-label-unbound]] — fix the annotated infer-then-check label context
ENQUEUE [[ivl-label-translation]] — resolve labels before formula synthesis or add the `Label` case
ENQUEUE [[knot-eager-capture-invariant]] — enforce capture-after-alloc with codata/ν-records
ENQUEUE [[coinduction-typing-vs-lowering]] — decide productivity placement when streams are taken on
ENQUEUE [[gram-label-resolution-pass]] — replace the hand-rolled scope descent with a LoGRAM query
ENQUEUE [[gram-struct-node]] — remove deprecated bridge type-row value utils; build open-`:tail` semantics

### Edges

[[gram-label-resolution-pass]] --[:REVEALS]--> [[checking-path-label-unbound]]
[[gram-label-resolution-pass]] --[:REVEALS]--> [[ivl-label-translation]]
[[recursive-struct-binding]] --[:RELIES_ON]--> [[knot-eager-capture-invariant]]
[[label-cycle-guardedness]] --[:REVEALS]--> [[knot-eager-capture-invariant]]
[[knot-eager-capture-invariant]] --[:DEFERS_TO]--> [[nu-types]]
[[label-cycle-guardedness]] --[:MOTIVATES]--> [[coinduction-typing-vs-lowering]]
[[coinduction-typing-vs-lowering]] --[:MAY_RESOLVE_VIA]--> [[nu-types]]
[[coinduction-typing-vs-lowering]] --[:MAY_RESOLVE_VIA]--> [[productivity-checking]]
[[gram-label-resolution-pass]] --[:MAY_RESOLVE_VIA]--> [[logram]]
[[gram-struct-node]] --[:ENABLES]--> [[dynamic-reflection]]

## Session: Elaboration meta-handling — nested-sigma solve, principal-type generalization, debugging discipline — @2026-07-06 [elaboration, normalization, generalization, unification, metavariable, row-types, debugging, codegen, agent, zettelkasten]

Debugged two elaboration defects surfaced by an explorer re-scan, then turned the debugging process itself into a durable rule. (1) **Nested dependent structs** crashed constraint solving: row unification mints fresh metas mid-solve, but the solver's reader `ctx.metas` is a pre-solve snapshot, so a flex-flex kind lookup on a just-minted meta dereferenced a missing entry. Fixed by an interim patch in `rows.ts` that `listen`s the told metas and splices them into the reader (`V2.local`) for the recursive `unify` calls; it retires when metas move onto threaded State ([[monad-split]]). (2) **Unconstrained pattern binders** generalized to types that leaked metavariables and produced spurious `Any`. Two collection bugs: `collectMetasNF` discarded row-field metas that preceded a solved row tail, and `generalize` never collected the *kind* annotations of the metas it generalized. The fix accumulates field metas across solved tails and pulls kind annotations in transitively, ordering each kind-meta before the meta it kinds — yielding the principal type (`Π(a: Type) => Π(A: a) => …`, per Pierce) with no leak and no `Any`. The residual `Any` default at instantiation is surfaced as an open design question. A **retrospective** on an anchoring failure during the debug — a runtime-confirmed *mechanism* (an `instantiate` scope guard skipping metas) mistaken for the root cause and defended against repeated expert caution while the real defect was in collection — produced a new `.cursor/rules/debugging.mdc` (mechanism ≠ root cause; state the invariant first; treat expert hesitation as a falsification signal; distrust make-it-disappear defaults) and a sharpened hypothesis-vs-position carve-out in `communication.mdc`. Regression coverage landed as `dependent-structs.test.ts` and `pattern-polymorphism.test.ts`. The explorer re-scan additionally confirmed three still-open backend codegen bugs — orthogonal to correct MIR — that the archived Explorer Audit had not fixed.

### Spawned

SPAWN [[solver-meta-threading]] — interim reader/writer meta threading during solve; retires with [[monad-split]]
SPAWN [[instantiate-any-default]] — open design question: default unconstrained metas to `Any` vs generalize (needs-design)
SPAWN [[codegen-correctness-gaps]] — three confirmed backend codegen bugs from the explorer re-scan
SPAWN [[variant-match-generalization.session]] — session zettel + transcript (45004fd5)

### Resolved

RESOLVED nested-sigma solve crash — interim meta-threading in row unification ([[solver-meta-threading]])
RESOLVED variant-match meta leak / spurious `Any` — transitive kind collection in [[generalization]]

### Enqueued

ENQUEUE [[instantiate-any-default]] — design discussion on `Any`'s role before removing the default
ENQUEUE [[codegen-correctness-gaps]] — deferred backend emitter/erasure fixes (MIR unaffected)
ENQUEUE [[solver-meta-threading]] — remove the interim splice when [[monad-split]] lands

### Updates

- [[generalization]] — collection traverses solved row tails and generalizes kind annotations transitively (principal type).
- `.cursor/rules/debugging.mdc` (new), `communication.mdc`, `session-start.mdc`, `AGENTS.md` — debugging/hypothesis discipline; advances [[agent-guidelines-zettelization]].
- [[pulse]] — Elaboration V2 and Explorer Audit paragraphs updated.

### Edges

[[solver-meta-threading]] --[:APPLIES_TO]--> [[flex-flex-unification]]  -- Fresh metas from row-tail rewriting are the trigger
[[solver-meta-threading]] --[:DEFERS_TO]--> [[monad-split]]  -- The real fix is threaded State, making new metas visible at any depth
[[generalization]] --[:MOTIVATES]--> [[instantiate-any-default]]  -- Transitive kind gen removes one Any source; the residual default is the question
[[instantiate-any-default]] --[:EXTENDS]--> [[implicit-generalization-semantics]]  -- Same generalize-not-default principle, now at the kind level
[[codegen-correctness-gaps]] --[:REVEALS]--> [[type-erasure]]  -- Type-leak-to-runtime is the erasure gap's runtime face
[[codegen-correctness-gaps]] --[:REFERENCES]--> [[string-dispatch-float-record-bug]]  -- Sibling lossy-lowering case
[[variant-match-generalization.session]] --[:PRODUCED]--> [[solver-meta-threading]]
[[variant-match-generalization.session]] --[:PRODUCED]--> [[instantiate-any-default]]
[[variant-match-generalization.session]] --[:PRODUCED]--> [[codegen-correctness-gaps]]
[[variant-match-generalization.session]] --[:INFORMS]--> [[generalization]]  -- Transitive kind collection
[[variant-match-generalization.session]] --[:INFORMS]--> [[agent-guidelines-zettelization]]  -- debugging.mdc + communication.mdc sharpening

## Session: Multi-arm struct match — redundancy, not a semantics or merge bug — @2026-07-07 [pattern, elaboration, inference, row-types, lowering, gram, mir, diagnostics, zettelkasten]

A correctness re-scan of the explorer's built-in snippets (judging output, not just liveness, across parse → elaborate → NF → GRAM → MIR) found `nested-match` — `\x -> match x | { foo: {y}, bar: f } -> f y | { z: {w} } -> w` — lowers to only its first arm: no dispatch node, the second arm absent from MIR though both `case` nodes survive in GRAM. Worked through in discussion: this is **not** shape dispatch (records are products with fixed rows and no width subtyping, so nothing at runtime distinguishes the shapes — [[structural-records]]), and **not** a merge bug — the scrutinee-type intersection requiring `foo`, `bar`, and `z` is faithful inference, reflecting the fields the code is written to read; pruning `z` because its arm is dead would make signatures depend on a liveness analysis. The single defect is a **missing redundancy diagnostic**: an irrefutable earlier arm shadows every later arm, and that fact is already latent in the Maranget decision tree (an unreachable clause never becomes a leaf, which is why it drops during lowering — [[pattern-matching-compilation]]). Faithful, non-pruning inference also buys stability: making an earlier arm refutable promotes a shadowed arm to live without changing the scrutinee type, so a reachability edit carries no blast radius through callers. Recorded the reframe and the faithfulness/stability principle as a zettel under [[exhaustiveness-checking]]'s needs-design redundancy half. The sibling `block-proj` over-generalization finding from the same re-scan is held for a later session.

### Spawned

SPAWN [[redundant-match-arms]] — redundancy is a diagnostic layered on faithful inference; irrefutable arm shadows the rest; stability under refutability edits

### Edges

[[pattern-matching.thread]] --[:INCLUDES]--> [[redundant-match-arms]]
[[redundant-match-arms]] --[:EXTENDS]--> [[exhaustiveness-checking]]  -- Redundancy half; diagnostic, not typing
[[redundant-match-arms]] --[:RELIES_ON]--> [[pattern-matching-compilation]]  -- Unreachable clause never becomes a leaf
[[redundant-match-arms]] --[:RELIES_ON]--> [[structural-records]]  -- Fixed rows / no width subtyping ⇒ redundancy not dispatch
[[redundant-match-arms]] --[:CONSTRAINS]--> [[bidirectional-checking]]  -- No reachability pruning of the scrutinee type
[[redundant-match-arms]] --[:CONTRASTS_WITH]--> [[variant-types]]  -- Variants dispatch on a runtime tag
[[redundant-match-arms]] --[:APPLIES_TO]--> [[match]]

## Session: Pipeline bug-squashing — MIR match-merge params + generalization zonker-consistency @2026-07-07 [pattern, lowering, mir, gram, bridge, elaboration, generalization, bugfix, debugging, zettelkasten]

A correctness re-sweep of the explorer's 19 built-in snippets (judging output, not liveness, across elaborate → NF → GRAM → MIR) surfaced two defects, both fixed. (1) **MIR match merge:** the GRAM→MIR bridge threaded each arm's result through a shared case-block-local variable and a parameterless jump into a paramless join, so the join's read (`match1` at `join3`) was out of scope. Fixed in `bridge/decisions.ts` to use the IR's block-parameter/jump-argument mechanism — each case/default jumps `join(val)` and the join binds `resultVar` as its parameter. This also resolves the codegen "match join-block scoping" symptom: codegen already lowers block params to a hoisted function-scoped mutable, so the emitted merge is now in scope — reclassifying that symptom as a MIR-generation defect, not a codegen gap. (2) **block-proj over-generalization:** `collectMetasEB` collected a row-tail `Meta` without consulting the zonker, unlike its own `Var` case and the NF collector, so an already-generalized row meta from an unused inner `let` was re-collected and re-quantified, giving a unit-returning block the type `Π(r: Row) => Unit`. Fixed by resolving row-tail metas through the zonker; root-caused with runtime instrumentation, regression coverage in `polymorphism.test.ts`. Also this session: the `redundant-match-arms` design note (product-match redundancy is a diagnostic, not a semantics/merge bug), the PR #12 review response (`expandKinds` → `Annotations.closeOver`, narration comments removed), and a typescript-eslint 8.4→8.62 bump that surfaced pre-existing type-aware lint debt (suppressions baseline regenerated). Full suite green (845), typecheck + lint clean; 15 match-related snapshots updated for the merge-param threading.

### Spawned

SPAWN [[match-merge-block-params]] — merge threading via block parameters; also resolves the codegen match-join symptom
SPAWN [[meta-collection-zonker]] — meta collection must honor the zonker in every position, row tails included
SPAWN [[pipeline-bug-squashing.session]] — session zettel + transcript (3c204de9)

### Resolved

RESOLVED match join-block scoping — reclassified as a MIR merge-threading defect, fixed via [[match-merge-block-params]]
RESOLVED block-proj over-generalization — [[meta-collection-zonker]]; residual of [[letpoly-implicit-escape]]

### Updates

- [[codegen-correctness-gaps]] — down to two genuine codegen gaps (positional access, type-leak); match-join-scoping reclassified + resolved.
- [[pipeline-stabilization.thread]] — items 15 (match merge params) and 16 (block-proj) added, implemented.
- [[pulse]] — Pipeline Stabilization and Elaboration V2 paragraphs updated.

### Edges

[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[match-merge-block-params]]
[[match-merge-block-params]] --[:FIXES]--> [[codegen-correctness-gaps]]
[[match-merge-block-params]] --[:RELIES_ON]--> [[pattern-matching-compilation]]
[[match-merge-block-params]] --[:APPLIES_TO]--> [[gram-to-mir-bridge]]
[[meta-collection-zonker]] --[:EXTENDS]--> [[letpoly-implicit-escape]]
[[meta-collection-zonker]] --[:APPLIES_TO]--> [[generalization]]
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[meta-collection-zonker]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[meta-collection-zonker]]
[[pipeline-bug-squashing.session]] --[:PRODUCED]--> [[match-merge-block-params]]
[[pipeline-bug-squashing.session]] --[:PRODUCED]--> [[meta-collection-zonker]]
[[sessions.hub]] --[:INCLUDES]--> [[pipeline-bug-squashing.session]]

## Session: Label fixes — self-referencing struct checking + refinement label translation — @2026-07-08 [verification, elaboration, row-types, dependent, refinement, label, sigma, checking, bugfix, zettelkasten]

Fixed two related `:label` defects and merged them as PR #14. **Elaboration:** a struct with a self-referencing computed field (`{ width, height, area: :width * :height }`) annotated with a record type failed to check — record-type annotations elaborate unconditionally to a `Σ`, and the `[struct, Sigma]` re-check evaluated field values in a context lacking the sibling bindings (throwing "Unbound label"), while `traverseRow`'s per-field `value ~~ meta` constraint pinned each label meta to a concrete field value that then collided with the sibling's typed use ("Cannot unify 20 with Num", exposed only once labels resolved). Threading the inferred value row into `ctx.sigma` for the re-check, plus constraining the label meta to the field's declared type rather than its value, resolved both (the constraint change was the user's; the sigma-threading mine). **Verification:** a `:label` in a refinement reached IVL translation unresolved and threw; the fix establishes the sibling-label scope at every record boundary (`withRowLabels`, the verification analogue of elaboration's row-walk label context — applied in subtype's `contains` and threaded left-to-right in `synthStructRow`) and resolves a surviving label to its concrete sibling value via `ctx.sigma` or a logical constant of the field's sort. Two reframings, not fixes: the `traverseRow` "three overrides" are the elaborator's uniform fresh-metas-per-judgment discipline reconciled by unification (deliberate — a single upfront pass would couple every dispatch case), and the correct locus for label collection is the record boundary that *has* the row, not the translation leaf (`[Modal,Modal]` subtyping is a pure consumer with no row in hand). A pre-existing solver/discharge bug surfaced and was confirmed on `main` via stash: a symbolic record-field refinement (`n > n`) discharges as false-valid, with MBQI leaving `v = n` residual and a redundant `∧ (= n n)` conjunct flipping the verdict versus the correctly-rejected scalar analogue. Design concern noted: the `ctx.labels` / `ctx.sigma` / `ctx.record` trichotomy.

### Spawned

SPAWN [[verification-label-scope]] — sibling-label scope re-established at record boundaries; verification analogue of `withLabelContext`
SPAWN [[record-refinement-false-valid.bug]] — pre-existing false-valid discharge of symbolic record-field refinements
SPAWN [[label-context-trichotomy]] — design concern: three overlapping label-resolution maps
SPAWN [[label-refinement-verification.session]] — session zettel (transcript UUID pending)

### Resolved

RESOLVED [[checking-path-label-unbound]] — sigma-threaded `[struct, Sigma]` re-check + declared-type constraint in `traverseRow`
RESOLVED [[ivl-label-translation]] — sibling-label scope at record boundaries + `term()` label resolution

### Enqueued

ENQUEUE [[record-refinement-false-valid.bug]] — solver/discharge bug; likely lives under [[quantifier-instantiation-boundary]]
ENQUEUE [[label-context-trichotomy]] — consolidate/clarify labels/sigma/record

### Updates

- [[checking-path-label-unbound]], [[ivl-label-translation]] — marked resolved (bugfix), added PR #14 refs + resolution notes; corrected the stale `synth.ts` locus on the latter.
- [[pulse]] — Verification Backend, Row Types, Pipeline Stabilization paragraphs updated.

### Edges

[[label-refinement-verification.session]] --[:RESOLVED]--> [[checking-path-label-unbound]]
[[label-refinement-verification.session]] --[:RESOLVED]--> [[ivl-label-translation]]
[[label-refinement-verification.session]] --[:PRODUCED]--> [[verification-label-scope]]
[[label-refinement-verification.session]] --[:PRODUCED]--> [[record-refinement-false-valid.bug]]
[[label-refinement-verification.session]] --[:PRODUCED]--> [[label-context-trichotomy]]
[[verification-label-scope]] --[:RESOLVES]--> [[ivl-label-translation]]
[[verification-label-scope]] --[:MIRRORS]--> [[label-lookup]]
[[record-refinement-false-valid.bug]] --[:EXTENDS]--> [[quantifier-instantiation-boundary]]
[[record-refinement-false-valid.bug]] --[:AFFECTS]--> [[vc-validity-discharge]]
