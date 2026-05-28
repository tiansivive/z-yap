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
