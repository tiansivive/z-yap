---
tags:
- queue
- meta
- project
- thread
- infrastructure
- tooling
- milestone
- planned
- concept
---
# Global Pending Queue

Pending work items not assigned to a specific thread. FIFO — oldest first.
`[ ]` open, `[x]` resolved, `[~]` dropped.

Thread-specific items have been extracted into their respective thread hubs.
See [[delimited-continuations.thread]], [[row-types.thread]],
[[usage-semantics.thread]], [[recursion.thread]], [[pattern-matching.thread]],
[[verification-backend.thread]], [[gram-evolution.thread]],
[[elaboration-v2.thread]], [[parser-migration.thread]].

## Open items

- [x] [[solver-v2-universal-refinement-false-sat]] — reframed by [[vc-validity-discharge]]; raw quantified SMT discrepancy remains scoped to general solver completeness
- [x] [[block-scoped-let-vc-parity-bug]] — resolved 2026-06-21; block-local let obligation discharges as valid via [[vc-validity-discharge]]
- [x] [[euf-congruence-propagation-bug]] — resolved 2026-06-21; congruence closure propagates merges to applications, disequality conflict detected
- [ ] [[spineful-applications]] — cross-cutting IR refactor (App representation migration)
- [ ] [[surface-syntax-backlog]] — deferred parser/elaboration sugar backlog migrated from old TODO notes
- [ ] [[where-clauses]] — deferred surface syntax, no parser/elab support
- [ ] [[lsp]] — Language Server Protocol, depends on stable CST + incremental elaboration
- [ ] [[repl]] — interactive evaluation mode
- [ ] [[module-system]] — grammar drift, qualified/hiding shapes not produced by Nearley
- [ ] [[block-level-using-gap]] — implicit scoping bug: module `using` updates implicits but block inference does not
- [ ] [[documentation-debt]] — README/FAQ drift and stale repository prose
- [ ] [[repo-docs-retirement-audit-2026-06-20]] — migrate unique TODO/resource atoms, retire superseded internal docs, then refresh public docs
- [x] [[type-erasure]] — graduated to usage-semantics + gram-evolution threads
- [ ] [[dynamic-reflection]] — design-space only, runtime witness / gradual typing
- [x] [[ffi-saturation]] — split into [[ffi-saturation-gram]] (implemented) and [[ffi-saturation-mir]] (deprecated)
- [ ] [[whnf-codification]] — no explicit WHNF vs full-NF API flag; modes are implicit

## ADR / pulse / current-state follow-ups (2026-06-02)

- [ ] [[z3-stay-companion]] — decide if D-001 needs a stay-on-Z3 rejected-alternative companion
- [ ] [[convention-zettel-promotion]] — decide whether to extract conventions into `<name>.convention.md` meta zettels
- [ ] [[agent-guidelines-zettelization]] — distill agent/code guidelines into convention zettels and reusable skills
- [ ] [[z-yap-agent-skill]] — create a Cursor skill for z-yap interaction protocol, derived from an existing local skill template
- [ ] [[transcripts-private-submodule]] — migrate `sessions/` to a private GitHub submodule
- [x] Fill in `pulse.md` editorial prose per active thread — done 2026-06-27; all twelve thread sections written, Explorer split into Audit + Evolution
- [ ] Fill in `yap-baseline.md` sections and replace `<org>` placeholder with the real GitHub org
- [ ] Decide D-005 epistemic status (currently has none)
- [ ] Add `INCLUDES` edge from `[[verification-backend.thread]]` to `[[first-order-restriction.adr]]`
- [ ] Review ADR slug names: `gram-graph-ir.adr`, `direct-style-lowering.adr`

## GRAM canonical IR follow-ups (2026-06-03)

- [ ] [[legacy-file-compile]] — file compile migrated to pipeline lowering; direct `lowerToMir` tests still block removing the legacy API

## Testing follow-ups (2026-06-22)

- [ ] Document how Yap structures testing — unit tests per pass/transformation, integration tests when composing them. Methodology note; scope carefully (the Core→codegen pipeline shape is lowering-specific, not a general principle).

## Compilation ABI (2026-06-28)

- [ ] [[compilation-abi-selection]] — discuss per-backend/target closure calling conventions (bundle vs lifting vs native), and how package/module boundaries reconcile when projects or dependencies pick different ABIs

## Session follow-ups (2026-06-30)

- [ ] Usage-semantics framing correction — elaboration threads `Q.Usages` (`check`/`infer` return `[EB.Term, Q.Usages]`) but the threading is deprecated and unconsumed; reconcile [[modality-system]] / [[verification-modal-phase]] / [[pulse]] wording (the "vector absent / modal wrappers stripped" framing is wrong; "enforcement doesn't exist" stands).

## Variant dispatch follow-ups (2026-07-02)

- [ ] [[typed-dispatch-equality]] — elaborate dispatch equality through typed equality evidence rather than GRAM/backend stringification
- [ ] [[string-dispatch-float-record-bug]] — fix literal/general dispatch cases where stringification misrepresents floats or records

## Lint governance follow-ups (2026-07-03)

- [ ] [[legacy-file-compile]] — migrate the live MIR surface out of the lint-ignored `src/lowering` (`mir.ts`, `interpret.ts`, `shared/primops` are canonical-pipeline imports); the deprecated remainder then deletes with `lowerToMir` retirement
- [ ] [[evaluation-monad-rework]] — port the NbE evaluator's imperative work-stack machine to an Evaluation generator monad owning the stack as state; lint carve-out header retires with it
- [ ] Knip cleanup pass — verify and delete the ~10 orphaned files (`elaboration/infer.ts`, `shared/cont.ts`, `shared/logging.ts` + `winston`, `lowering/index.ts`, …) and the dead `immutagen` dep, then flip knip `files`/`dependencies` rules from warn back to error to regain the gate (policy: [[lint-governance]])

## GRAM record/label deferred work (PR #9, 2026-07-03)

- [x] [[checking-path-label-unbound]] — resolved 2026-07-08 (PR #14): `[struct, Sigma]` re-check threads the inferred value row into `ctx.sigma`; `traverseRow` constrains the label meta to the declared type
- [x] [[ivl-label-translation]] — resolved 2026-07-08 (PR #14): sibling-label scope at record boundaries ([[verification-label-scope]]) + `term()` label resolution
- [ ] [[knot-eager-capture-invariant]] — enforce capture-after-allocation: reject eager refs to backpatched fields (or route through the knotted phase); belongs with codata/ν-records
- [ ] [[coinduction-typing-vs-lowering]] — decide where productivity lives: `ν` types in the type system vs a productivity check at GRAM lowering
- [ ] [[gram-label-resolution-pass]] — replace the hand-rolled scope descent with a declarative LoGRAM/Datalog query (see [[logram]])
- [ ] [[gram-struct-node]] — remove the deprecated bridge type-row value utils (`isStructApp`/`structFromApp`/`struct`/`collectFields`)
- [ ] [[gram-struct-node]] — open `:tail` runtime-polymorphism / reflection semantics beyond carrying the edge (see [[dynamic-reflection]])

## Elaboration meta-handling follow-ups (2026-07-06)

- [ ] [[instantiate-any-default]] — needs design discussion: does an unconstrained meta default to `Any` or generalize? `Any` has no unification semantics; decide its role before removing the default
- [ ] [[solver-meta-threading]] — remove the interim `rows.ts` reader-splice once metas move onto threaded State ([[monad-split]])
- [ ] [[codegen-correctness-gaps]] — deferred backend emitter/erasure bugs (match join-block scoping, positional `.0` access, type-leak-to-runtime); MIR is correct, so semantics are unaffected

## Label fixes follow-ups (2026-07-08)

- [ ] [[record-refinement-false-valid.bug]] — symbolic record-field refinement (`n > n`) discharged as false-valid; MBQI leaves `v=n` residual and a redundant `∧ (= n n)` conjunct flips the verdict vs the scalar analogue
- [ ] [[label-context-trichotomy]] — consolidate or clarify the `ctx.labels` / `ctx.sigma` / `ctx.record` split (dead `extendRecord` helper; overlapping resolution roles)

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[spineful-applications]]
- INCLUDES → [[where-clauses]]
- INCLUDES → [[lsp]]
- INCLUDES → [[repl]]
- INCLUDES → [[module-system]]
- INCLUDES → [[block-level-using-gap]]
- INCLUDES → [[documentation-debt]]
- INCLUDES → [[type-erasure]]
- INCLUDES → [[dynamic-reflection]]
- INCLUDES → [[ffi-saturation-gram]]
- INCLUDES → [[whnf-codification]]
- INCLUDES → [[legacy-file-compile]] — Tech debt tracked in the global queue
- INCLUDES → [[agent-guidelines-zettelization]] — Cross-cutting queue item
- INCLUDES → [[solver-v2-universal-refinement-false-sat]] — Resolved/reframed queue item
- INCLUDES → [[block-scoped-let-vc-parity-bug]] — Pending v2/VC parity bug
- INCLUDES → [[repo-docs-retirement-audit-2026-06-20]] — Documentation cleanup work item
- INCLUDES → [[z-yap-agent-skill]] — Planned Cursor skill for z-yap interaction protocol
- INCLUDES → [[surface-syntax-backlog]] — Deferred syntax backlog
- INCLUDES → [[euf-congruence-propagation-bug]] — Resolved solver parity bug
- INCLUDES → [[compilation-abi-selection]] — Deferred design discussion
- INCLUDES → [[typed-dispatch-equality]] — Deferred dispatch-equality design
- INCLUDES → [[string-dispatch-float-record-bug]] — Deferred literal/general dispatch bug
- INCLUDES → [[evaluation-monad-rework]] — Deferred evaluator monad rework
- INCLUDES → [[instantiate-any-default]] — Deferred design discussion
- INCLUDES → [[codegen-correctness-gaps]] — Deferred backend fixes
- INCLUDES → [[solver-meta-threading]] — Remove interim splice at monad-split

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[thread-queue-system.thread]] ← INCLUDES — Queue is part of the meta system

<!-- connections:end -->
