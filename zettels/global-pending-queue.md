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
- [ ] [[codegen-correctness-gaps]] — deferred backend type-erasure bug: type-level values reach runtime despite correct MIR semantics

## Label fixes follow-ups (2026-07-08)

- [ ] [[record-refinement-false-valid.bug]] — symbolic record-field refinement (`n > n`) discharged as false-valid; MBQI leaves `v=n` residual and a redundant `∧ (= n n)` conjunct flips the verdict vs the scalar analogue
- [ ] [[label-context-trichotomy]] — consolidate or clarify the `ctx.labels` / `ctx.sigma` / `ctx.record` split (dead `extendRecord` helper; overlapping resolution roles)
- [ ] Resolution-level privacy for NbE internals — extract a shared kernel package (Term/Value/Context types) to break the EB↔NF type-level cycle, then split normalization into a workspace package with an `exports` map (barrel-only entry) and bump `moduleResolution` off node10 (node16-CJS or bundler; bundler also moves the CLI off ts-node-CJS). Supersedes the interim `no-restricted-imports` boundary rules in eslint.config.mjs (effectful-subsystems plan, 2026-08-11)

## Nested refinement verification follow-up (2026-07-23)

- [x] [[nested-refinement-outer-label-capture.bug]] — resolved 2026-07-24: explicit blocked eliminations resume the outer projection in concrete Sigma scope

## Neutral semantics regression follow-up (2026-07-24)

- [x] [[neutral-semantics-dependent-regression.bug]] — resolved 2026-07-24: explicit categories preserve symbolic scrutinees and seal recursive μ folds

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
- INCLUDES → [[record-refinement-false-valid.bug]] — Deferred solver/discharge bug
- INCLUDES → [[label-context-trichotomy]] — Deferred context-consolidation review
- INCLUDES → [[nested-refinement-outer-label-capture.bug]] — Deferred verification follow-up
- INCLUDES → [[neutral-semantics-dependent-regression.bug]] — Resolved neutral-category audit
- INCLUDES → [[default-context-substitution-aliasing.bug]]
- INCLUDES → [[generalized-body-display-offset.bug]]

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[thread-queue-system.thread]] ← INCLUDES — Queue is part of the meta system

<!-- connections:end -->

- [x] **Generalization's substitution has no correct commit time** (2026-08-13, regression triage; resolved 2026-08-14). The premise was wrong: committing after the wrap is correct and stands. The row-annotation symptom came from row-variable resolution installing a solution that named a binder rather than following it to the slot the use site had just filled with a fresh meta. Fixed by quoting the solution back into the reading scope and re-evaluating, which reuses the level-to-index conversion already in quoting. Let-generalization is not blocked. See [[row-solution-dereference]].

- [ ] **Fuse `Stmt.infer`'s `let` case with `letdec`** (2026-08-13, block constraint-scoping fix). `letdec` is not inference — it is the let boundary (solve this declaration's constraints, generalize, instantiate, wrap implicits). Because it reads its constraints with `writer.peek()`, the caller must open a scope spanning the preceding `infer`, which is the only reason `block.ts` wraps both calls in a bespoke generator. Also leaks two statements (the caller must pick the generalized one) and a cast in `module.ts`. Cheap now: `letdec`'s returned `Context` is `const next = ctx` — vestigial since the registry migration — so the return can shrink and the `let` case can own the whole rule and its own `listen`. See [[letdec-boundary-split]].

- [ ] **Does an aborted scope have an output?** (2026-08-13, writer rewrite over `Eff.with`). A run reads its handlers' outputs when a clause aborts; an `Eff.with` aborted from outside reports nothing, so the same effect answers two ways depending on whether a scope boundary sat between the `tell` and the abort. Transformers settle this by stacking order (`WriterT w (Either e)` discards, `ExceptT e (Writer w)` keeps); a single writer effect has no order to appeal to. Either answer is fine, the hybrid is not. Free choice today — the elaboration suite is indifferent. See [[scope-output-on-abort]].

- [ ] **Small-step neutrals: Sealed/Blocked as explicit redex states** (2026-08-12, M4 discussion). Today Mu's loop-breaker is distributed choreography: `EB.unfoldMu` plants a marked env entry, the machine's Bound case answers `Neutral("Sealed", …)` for it, and unification's pattern order gates when unfolding is attempted. Proposal: make unfolding produce its own evidence — `unfoldMu` answers the body with the recursive occurrence wrapped `Sealed` (one deliberate step; unsealing is explicit), mirroring how `Blocked` already makes stuck matches data with `resume` as the explicit step. Extends to any unfolding redex. For unification of recursive types, consider Amadio–Cardelli coinductive assumption sets (in-progress (l, r) pairs, could ride the Unification row like the subst accumulator) over env-marking. Precedent: Coq's fix ι-reduces only on constructor-headed arguments (demand-guarded reduction). Semantics redesign — post-migration.

- [ ] **The default context's zonker is a shared singleton** (2026-08-13, snapshot triage). `defaultContext()` hands out the module-level empty substitution by reference, so a direct write through any context's zonker (`ctx.zonker[n] = v`) publishes that meta solution to every context in the process. Purely functional composition hides it until someone writes through the record. Meta collection follows solutions, so a borrowed solution makes generalization skip the meta, return its input untouched, and display expand the borrowed value — eight generalization expectations on `main` encode exactly that, which is why the suite is green. Reproduces by running one of those tests alone, or by freezing the shared record. Fix the writers, and consider making the default non-aliasing. See [[default-context-substitution-aliasing.bug]].
