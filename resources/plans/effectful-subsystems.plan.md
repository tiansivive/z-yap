---
name: Effectful subsystems on the freer runtime
overview: "Re-express the stateful-registry migration (elaboration-meta-state.plan.md, branch refactor/monad-v3-stateful-registry) over the freer effect system on refactor/v3-free-monad: a registry effect replaces ctx.zonker/ctx.metas and the writer meta/zonker channels; normalization, generalization, displays, solver/unification, and verification become effectful functions with subsystem runners at pure boundaries. Headline acceptance: one authoritative metacontext, visible through nested solve/replay, with no parallel zonker and no Writer-to-Reader splices."
todos:
  - id: setup-tracking
    content: "Align tracking: supersession note on elaboration-meta-state.plan.md; thread/queue sync (full zettel reconciliation deferred by user to a later pass)"
    status: pending
  - id: step0-merge-pr17
    content: "Merge origin/fix/using-in-block-implicits into refactor/v3-free-monad; resolve conflicts in freer style"
    status: completed
  - id: milestone-runtime
    content: "Eff.with combinator; registry effect in shared/metas.ts; MutState split (registry out)"
    status: completed
  - id: milestone-normalization
    content: "Callstack effect (NF-private), effectful evaluate/quote/force, normalize + public api surface, call-site ripple; harness change remains behind its stop-point"
    status: completed
  - id: milestone-consumers
    content: "Generalization + implicits onto the registry effect (per-pass rows: Generalization/Abstraction/Zonking; effectful collectors; callers letdec/inferReturn)"
    status: completed
  - id: milestone-solver
    content: "ctl redesign (handler-decides control), subst effect, Registry.register split; unification/solver effectful; solve commits; speculation = Eff.with raise-clause (resolveImplicit) / forked registry + merge (replay)"
    status: completed
  - id: deferred-displays-harnesses
    content: "Deferred M3 remainder — displays DONE (effectful Display<A> row, 2026-08-12; supersedes the registry-view design: reader.local descent, boundaries are plain runs, DisplayContext deleted; Err snapshot moot — boundaries hold the registry). Remaining: test-harness migration (generalization/inference/unification suites)"
    status: in_progress
  - id: milestone-context-surgery
    content: "Delete ctx.zonker/ctx.metas; convert letdec/block/module driver; install run boundary (module, pipeline, repl)"
    status: completed
  - id: milestone-verification
    content: "Verification V2 (check/synth/subtype/translate/refinements) onto the registry effect"
    status: pending
  - id: verification
    content: "Focused meta/unification/normalization/solver/let-poly suites; pnpm typecheck, pnpm lint, full suite; snapshot updates reviewed not bulk-accepted"
    status: pending
  - id: paper-trail-close-out
    content: >-
      Per the create-plan and zettelkasten skills: thread.md session block(s), connections.md,
      zettel status updates (monad-split → in-progress/implemented, solver-meta-threading,
      evaluation-monad-rework), queue [x]; zettelkasten reconciliation with user confirmation
    status: pending
isProject: false
---

## Agent guardrails (read first)

- **Stop and ask the user** if requirements conflict, specs are ambiguous, or the next step needs **substantial unplanned design** not covered here or in linked zettels/ADRs.
- **Do not** expand scope silently or guess intent. When in doubt, **ask** and quote the unclear passage.
- Typechecking the whole repo is **not** a per-milestone gate: the migration works leaf-first and the v2 frontier is expected to error until context surgery lands. The gate is that the *converted* subtree is clean and the frontier shrinks monotonically.

## Review policy

- **Stop after each todo / milestone**: yes
- **Who validates**: both

## Scope

- **In scope**: registry effect owning the metacontext (`Meta.Entry = {meta, annotation: NF.Value, solution?}`); `Eff.with` scoped-handler combinator; callstack effect + `normalize`/`NF.run`; effectful normalization, generalization, implicits, displays, unification, solver, module driver, verification V2; removal of `ctx.zonker`/`ctx.metas` and the v2 meta/zonker writer channels on this path; PR #17 semantics merged in (step 0).
- **Design links**: [[monad-split]] (this plan realizes it), [[elaboration-monad]], [[solver-meta-threading]] (retires here), [[evaluation-monad-rework]] (absorbed by the callstack milestone), [[generalization]], [[letpoly-implicit-escape]], D-008 (solver v2 effect runtime, prior art for effect-runtime verification), `elaboration-meta-state.plan.md` (superseded — same destination, v2-State vehicle).

### Out of scope (planned non-goals)

- Err/diagnostics rework. Evaluator invariants and budget exhaustion **throw plain JS exceptions — crash, no handling**. `try/finally` is not supported in effect programs by design (abort does not unwind; `Eff.with` documents this).
- New NbE modes. `normalize` creates the toggle point; only the existing behavior (incl. #17's `noInlineBindings`) is wired.
- Usage-semantics enforcement; provenance stamping on tell/fail (deferred since freer pass 1); recursive-let Mu detection (post-migration TODO in `statements.ts`: `va == Type` + occurs-check).
- Block residual semantics (carried over from the superseded plan).
- Deleting `monad.v2.ts` (falls out only when the last consumer converts; tracked as deferred, not a goal).

### Deferred work (postponed during implementation)

- Record here as it surfaces; candidates: [[label-context-trichotomy]] (adjacent to context surgery), monad.v2 deletion, lint carve-out removals beyond the evaluator's.
- Two-tier row aliases (use-site row vs driver row) to type-enforce that driver-only actions (`Callstack.begin/next/finish`) can't be yielded from branch code; today the discipline is convention.
- Rename the normalization barrel's outward alias `NF` → `NbE` at consumer sites (post-migration churn).
- ~~Lint-enforce the NbE boundary~~ **done**: two `no-restricted-imports` scopes in eslint.config.mjs — outside code cannot deep-import `normalization/*` (barrel only; `Modal.combine` carries explicit sanctioned disables), and the machine layer (evaluation.v2/quoting/callstack/recursion/arity/patterns/api) cannot import the barrel `"."` (machine files import syntax/* and siblings directly). Both rules negative-tested. Motivating incident: the quoting↔api↔barrel cycle degraded api's inferred exports to `any` for cyclic importers, letting quoting call the *public* `apply` (fresh machine mid-drive) unawaited and untyped, invisible to tsc. Strongest future option — a workspace package with an `exports` map (resolution-level privacy) — requires bumping `moduleResolution` off node10.
- Split `evaluation.v2.ts` (machine, helpers, meet/matching could be separate modules).

## Acceptance criteria

Carried over from `elaboration-meta-state.plan.md` (still exact) plus freer-specific:

- `Meta.Entry` stores `meta`, semantic `annotation: NF.Value`, optional `solution`; **no parallel zonker exists**.
- Reader `Context` contains lexical scope only (`zonker`/`metas` fields deleted); semantic consumers read the registry effect.
- New and solved metas remain visible through nested solve, unification, block, and let boundaries **without Writer-to-Reader splices** (the interim `rows.ts` splice from [[solver-meta-threading]] is removed).
- Replay and `resolveImplicit` fork the registry per candidate via `Eff.with` + a copied handler and merge via `Metas.merge`; no serial candidate-local leakage.
- Elaboration's row never contains Callstack actions (callstack is NF-private, fresh per `normalize` entry).
- Boundary runs are greppable: handlers are installed only in `NF.run`, subsystem runners, and the pipeline/module/repl boundary.
- `pnpm typecheck` clean at the end (no remaining v2 frontier on the elaboration path); full test suite green; snapshot diffs reviewed and explained.

## Work breakdown

0. **Merge PR #17** (`fix/using-in-block-implicits`) into `refactor/v3-free-monad`. Take #17 verbatim where we didn't touch (module.ts, generalization.ts, evaluation.v2.ts, solver, unification, tests/snapshots); resolve in freer style where both sides changed: `block.ts` (Using branch → `M.reader.local` over implicits; solve/abstract `inferReturn` stays a v2-frontier call until milestone-solver), `statements.ts` (4-tuple + `introduced` flag), `implicits.ts`, `context.ts` (implicits as `[NF.Value, NF.Value]`), `supply.ts`/`metas.ts` (keep our `Metas.fresh`; `annotation: NF.Value` — #17's `EB.Term` quoting is obsoleted by registry threading and is **not** adopted).
1. **Runtime + registry.**
   - `Eff.with(handlers, program)` in `freer.ts`: drives a nested generator, answers locally covered tags, re-yields the rest to the enclosing run; row type subtracts covered tags. Exported via alias (`with` is reserved as an identifier; `export { scoped as with }` — callers use `Eff.with`). Comment: no finalization — abort does not unwind inner generators; do not use `try/finally` in effect programs.
   - Registry effect in `shared/metas.ts` (own tags, `Registry.get`/`Registry.modify`; pure algebra `register`/`solve`/`withSolutions`/`merge` rides in payloads). Single instance — one identity shared by every row.
   - `MutState` drops `registry` (keeps delimitations + nondeterminism); `M.Elaboration` row gains the registry effect; pass-1 call sites (`freshMeta`, lambda/reset registry reads, block's `withSolutions`) move from `st` to `registry`.
2. **Normalization.** Callstack effect (private module-level instance in normalization; work stack owned by handler; step budget throws). `evaluate` becomes the effectful machine (closure-captured contexts remain machine data; the reader supplies the entry context); `quote`/`force`/`instantiate`/`apply` read the registry (solutions replace zonker lookups; annotations read from entries). `normalize(term) = Eff.with([callstack.handlers()], () => evaluate(term))` — the NbE-mode toggle point. `NF.run(ctx, registry, program)` installs reader + registry + callstack for true boundaries (tests, CLI, codegen).
3. **Consumers** *(done 2026-08-11; displays deferred)*. Landed: `Metas.collectors()` — one effectful generator, `get()` once, both walkers close over the snapshot (`closeOver` likewise); per-pass rows scoping capabilities to exactly reader + registry — `Generalization`/`Abstraction` (generalization.ts), `Zonking` (implicits.ts, the honest name for the instantiate pair); annotations consumed **raw** (globality resolves lazily at quote/force — no re-normalization; mirrors the registry branch); `generalize`/`abstract` record which bound variable each meta solves to via one batch `withSolutions` write; callers (`letdec`, `inferReturn`) drop zonker recomposition, scope via `reader.local`, and carry an interim solve→registry bridge line that milestone 4 deletes. Deferred to `deferred-displays-harnesses`: displays/error rendering (`DisplayContext` → registry view) and the `Err`-carries-registry-snapshot question (an effects.ts→metas.ts runtime import cycles; revisit there).
4. **Solver + unification** *(design settled 2026-08-12)*.
   - **ctl redesign first** (own stop-point; freer suite extended): control moves from the action declaration to the handler — `Action` loses its `Control` parameter; every clause returns an explicit `ctl.resume(v)` or `ctl.abort(v)`. Run-level except behaves as today (abort to run, outputs survive, `failed()`). A with-installed clause that aborts **delimits at that `Eff.with`**; without a local clause the abort forwards to the run as before. `Forwarded` simplifies to plain tag exclusion. No `Eff.attempt` util — sites write their own `Eff.with` raise clause. Resuming raise handlers become expressible (resumable errors); resolution wants abort-at-the-with, not resume (raise sites expect no answer).
   - **Registry.register** action splits from `Registry.modify`: register adds a fresh entry (`Metas.fresh` yields it), modify covers solving/batch writes. New row util `Eff.Only<Effect, Tags>` (Extract over the action union) lets rows name exactly the actions they may yield.
   - **Subst effect** (unification.ts, own tags): ops `get`/`bind`; the handler owns the accumulator, its output is the final subst. `unify(l, r, lvl)` — the subst parameter disappears from unify/bind/occurs/rows. `lvl` stays a parameter (advances under binders without extending the env). In-flight visibility: force through the registry, then chase the head meta through the local subst.
   - **Mints immediate, solutions local** (the #17 leak, verified against the registry branch): row-tail mints commit via `Registry.register` as they happen — an entry surviving a failed attempt is harmless, a lost entry was the bug; solutions accumulate in the subst effect and only the boundary commits. Row: `Unification<A>` = reader | registry(get, register) | supply | subst | except | tracer — type-enforced "can read and mint, cannot solve".
   - **`solve`** installs the subst handler via `Eff.with`, commits the final subst with one `Registry.modify(withSolutions)`, and answers `{resolutions}` only — callers' zonker destructures go loud until milestone 5, per the standing posture.
   - **`resolveImplicit`**: per candidate, `Eff.with([fresh subst handler, raise clause → ctl.abort(failure)])` — no registry fork needed since unify writes no solutions; reject candidates whose final subst is non-empty (premature instantiation), preserving the Idris2/Lean-style deferral.
   - **`replay`**: fork the registry per candidate (`Eff.with([registry.handlers(seeded)])`), `Metas.merge` the agreed entries back.
5. **Context surgery + boundary.** Delete `ctx.zonker`/`ctx.metas`; retire `Metas.asContext`; convert `letdec`, block `inferReturn` (post-#17 shape: solve + `NF.abstract` at block boundary), module driver (`letdec`/`statements`/`using` in module.ts) to effectful; install the real run boundary in module/pipeline/repl (`Eff.run` + `failed()` replacing `E.isLeft`). Elaboration end-to-end on freer.
6. **Verification V2.** `check`/`synth`/`subtype`/`translate`/`refinements` consume the registry effect (read-mostly); verification gets its own runner or reuses `NF.run`'s row. Downstream of elaboration outputs, hence last.

## Design notes

Effect/row shape:

```
registry  (shared/metas.ts, single instance)   — get/register/modify over Metas.Registry
callstack (normalization-private)              — work stack + step budget; throws on exhaustion
supply    (existing)                           — fresh ids
subst     (unification-private)                — get/bind over the unification accumulator
M.Elaboration row = writer(constraints) | reader(Context) | except(Err) | st(MutState′) | supply | registry | tracer
NF rows: evaluate = reader | registry | callstack ; quote/display = reader | registry
Pass rows (concern-scoped aliases): Generalization/Abstraction = reader | registry ; Zonking = reader | registry
Unification = reader | registry(get, register) | supply | subst | except | tracer
```

Call conventions:

```ts
// inside any active run:
const v = yield* NF.normalize(term);         // callstack handled internally by Eff.with
// true boundary:
const v = NF.run(ctx, registry, () => NF.normalize(term));
// speculation (candidate attempt): fresh accumulator + local failure delimiter
const outcome = yield* Eff.with([U.subst.handlers(), { clauses: { "Except.raise": err => ctl.abort(candidateFailed(err)) } }], () => U.unify(l, r, lvl));
```

Rules: **inside an active run, always `yield*` / `Eff.with`; never nested `Eff.run`** (a fresh top-level run forks shared state — the metas leak reborn). Forwarded effects stay shared by construction; only locally-handled effects (callstack, forked registry) are private.

## Risks, complications, and breaking changes

- **Step-0 merge risk**: both sides rewrote block.ts/statements.ts; #17's semantics (Using threading, `NF.abstract`, `introduced`) must survive re-expression. Mitigate with #17's snapshot suite (typeclasses, let-polymorphism) once the pipeline runs again (milestone 5).
- **Nothing executes between step 0 and milestone 5** on the elaboration path — same accepted posture as freer pass 1; correctness lands with the run boundary and is validated by the full suite then.
- **Snapshot churn**: solved-meta rendering through the registry may shift output (flagged in the superseded plan too). Review, don't bulk-accept.
- **Evaluator conversion** is the highest-risk single item (hot path, imperative work-stack, ~900 lines): keep the machine's shape, move only stack ownership and registry reads.
- `brainstorming/yap/V2-MIGRATION.md` (named by agent rules) is absent from the tree — recorded drift, carried over from the superseded plan.
- **Breaking changes**: none intended at the language surface; internal APIs change wholesale on the elaboration path.

## Plan drift

- **Milestone 2 (machine, corrected design)**: the callstack effect is **ambient** — one machine per run, installed at the boundary, the direct replacement of the old module-global stacks. Every evaluation entry (`evaluate`, `matching`, later `apply`) is a *marked drive on the same machine*, so shift capture sees delimiters across entries exactly as the global-stack code did (capture crossing marks is load-bearing: shift inside a match arm must reach the enclosing reset). The **reader is the single env authority**: the driver re-binds it per step from the frame's stored env (the CEK E, storage only); `Stack.current()` and the handler's env register do not exist. Ops: `eval(term)`, `cont(arity, k)`, `ret`, `delimit`/`delimited`/`capture`/`resume`, `begin`/`next`/`finish` (driver protocol). The scheduling ops **ask the reader themselves** and snapshot it into the frame — no op takes an env; `reader.local` is the only way to schedule under another scope (binder entry, closure consumption, blocked-match resumption, closure-body quoting). An earlier fresh-machine-per-`matching` variant was rejected as a semantics change; an intermediate env-parameter op vocabulary (`with(env, …)`, `cont(env, …)`) was rejected as parameter-threading.
- **Milestone 2 (layering)**: the callstack is **not** in elaboration's row — the boundary is elab vs NbE, and NbE owns its machine. Two layers: internal forms (`NF.Machine.*`, `NF.Quoting.*` — assume the ambient machine; all mid-drive re-entry shares it) and the public surface (`normalization/api.ts` — each entry wraps its internal form in `Eff.with([callstack.handlers()], …)`, so the callstack is subtracted from every consumer row). Fresh-per-public-entry is exact: the old global stack was provably empty between external entries (drives are balanced; only mid-drive re-entry observes a shared non-empty stack, which stays internal). `apply` converted (Continuation replay = `Stack.resume` + the shared `drain` loop; Closure = `reader.local` + evaluate), dragging `reduce`, `Modal.combine` (the boundary-straddler: called from inside the machine, consumes `NF.Machine.*` — a shift inside a liquid-annotation closure no longer reaches the surrounding evaluation's reset, degenerate case, flagged), `unfoldMu`, and `arity` (now reader-based, no ctx param). Barrel re-points `NF.*` at the public surface; smoke test (`machine.test.ts`) proves end-to-end β-reduction with only reader+registry handlers.
- **Milestone 2 (helpers)**: `force`, `view`, `resume`, `project`/`inject`, `matching`, `quote`/`closeVal` are effectful with **no ctx parameters** — they ask the reader. `matching` re-enters evaluation via an ambient `drive` under the binder-extended env. Registry reads at point of use. `apply` and `reduce` remain unconverted (loud frontier): `apply`'s replay loop still references the removed globals, and `reduceAndPushStack`'s App branch → `reduce` → `apply` spine re-reduction stays broken until they convert.

- **Milestone 3 (resolved, 2026-08-11)**: v2 scoped meta-solution visibility through whichever ctx carried the zonker; the registry is global. Ruling: globality is the intended semantics — a stored closure observing a newly recorded solution is correct, not a leak. Consequences (e.g. the machine re-quoting a solution at a shallower env depth than the binder it references) surface as ordinary migration errors, to be judged by the test suites at M4+ rather than guarded against. A tried `lvl >= env.length → stay Symbolic` guard was reverted as an ad-hoc semantics change. Corollary: annotations are consumed raw everywhere — resolution happens lazily at quote/force through the registry (mirrors the registry branch; no re-normalization anywhere).

- **Milestone 1 (superseded 2026-08-12 by the milestone-4 ctl redesign)**: "`Eff.with` never delimits aborts" was downstream of control being fixed at action declaration. With handler-decided control, the installing handler is the delimiter: a with-installed raise clause returning `ctl.abort` delimits at that with; absent a local clause, aborts forward to the run unchanged. The flagged "failure delimiter for speculation" question dissolves — it is just an `Eff.with` raise clause.

- **Snapshot triage (2026-08-12)**: baseline is **`main` (`15ff565`), 214/218 green** — it is the merge-base, so every commit from `561386f` on belongs to this branch and nothing here pre-dates the work. (Two earlier readings anchored on `2cf6b20` and `78f3051`; both are branch commits and both produced a false "pre-existing failure" story. Recorded so it is not repeated.) Four regressions, each with a distinct cause:
  - **Splitting `ctx` turned lazy zonking eager.** The root cause of the let-polymorphism breakage, and the one worth remembering: `ctx` used to carry the zonker, so `quote`'s descent into a closure (`body = quote(closure.ctx, lvl + 1, val)`) swapped the *metacontext* along with the env. With reader + ambient registry, `M.reader.local(_ => closure.ctx, quote(lvl + 1, val))` swaps only the env. Generalization's `?m := Bound(lvl)` therefore became readable while the body was being quoted — and quoting descends into each closure's own spine, where that level denotes a different binder (`?2 -> Bound(1)` resolved to the lambda argument `x` instead of the telescope binder `a`, so `{ let id = \x -> x; return id 42; }` typed as `42`). The algorithm is otherwise identical to main's, line for line. Fixed by recording the substitution *after* the wrap in both `generalize` and `abstract`: the metas stay symbolic in the generalized syntax and resolve at use, once the inserted binders are actually in scope. 15 tests, 0 regressions.
  - **`V2.listen()` became `writer.peek()`, so constraint sets stopped being per-statement.** main's second `solve` in a block sees 3 constraints; `peek` ("everything so far in the innermost scope") handed over 4 — the earlier statement's included. Re-solving those re-resolves metas the earlier statement's generalization has since bound to telescope levels, against the spines those values were built on, so `Bound(2)` was read in the spine `[x, const]` → index `-1` → `Cannot read properties of undefined`. Only blocks are affected; at module level each statement gets its own `Eff.run`. Fixed with `M.writer.listen` around each block statement's infer+letdec and around the return's infer — the effect already had the primitive, and `close` merges back into the parent so the full constraint list still reaches display. Counts now match main's `1, 3, 3`. 10 tests, 0 regressions.
  - **Display expanded solved metas** (`String ~~ ?4` rendered `String ~~ String`). Introduced `a8f493e`: `solve` commits into the shared registry, and display expands any meta it can see a solution for. main chose expansion *per call site* via `ctx.zonker` — `Sub.empty` for constraints, the solver's zonker for term/type. Fixed by keeping expansion in display and making the registry handed to display the caller's choice: `Metas.unsolved` drops solutions, and constraint rendering runs against that.
  - **Meta annotations lost their nesting** (`(?2 :: ?1)` for `(?2 :: (?1 :: Type))`). main got nesting free because annotations were `EB.Term`s, so they went through the term printer, which annotates, while semantic values went through NbE's, which does not. Annotations are `NF.Value` now, so the printers share an `annotated` opt that descends with the annotation being rendered.
  - **Closures captured their own binder** (`Γ: x; x`, plus level shifts misnaming bound variables). Introduced in `955775c…21d450a`: main called `NF.closeVal(ctx, bType)` with the ctx captured *before* `V2.local` extended it; the effectful `closeVal` asks the reader, and `lambda.ts` called it inside the `reader.local` that binds the lambda variable. Fixed by narrowing the local to body inference plus implicit insertion and building the Pi back outside it. `shift.ts:35` and `applications.ts:67` were already outside their locals and needed nothing.
  - Common shape across all four: main's `ctx` bundled scope *and* metacontext, so every `local`-style swap moved both. Splitting them means each site has to say which one it meant.

- **Step 0 (merge b576668)**: `ctx.metas` keeps #17's `ann: EB.Term` for the interim — its consumers (`Icit.instantiate`, `closeOver`, unification Flex-Flex, `NF.abstract`) expect quoted terms, and reverting them blind at merge time was riskier than adapting. `Metas.asContext(ctx, registry)` now quotes each registry entry at its meta's level; the registry itself stays `annotation: NF.Value`. Milestones 3/5 retire the quoting with the view.
- **Step 0**: #17's replay-agreement loop destructured `[, type]` (unifying each candidate's post-solve *Context*), type-masked by v2's `any` yields; resolved to `[type]` — the candidate's instantiated type, matching pre-#17 semantics. Revisit if replay disagreement surfaces at milestone 5.

## Verification (plan-specific)

- Per milestone: converted-subtree `tsc` clean; frontier error count strictly decreasing; `pnpm lint` on touched files.
- Milestone 5 onward: focused suites (`elaboration/inference/__tests__`, unification, normalization, solver, let-polymorphism, typeclasses), then `pnpm test`, `pnpm typecheck`, `pnpm lint`; `pnpm yap <file>.yap` smoke on language-tour snippets.
- Milestone 6: verification suites (`verification/V2`, refinement integration tests).

## Close-out

1. Mechanical checklist per skills (thread.md block per milestone-session, connections, queue, statuses).
2. Zettelkasten reconciliation — explicitly including: [[monad-split]] status + realization notes, [[solver-meta-threading]] RESOLVED, [[evaluation-monad-rework]] RESOLVED, [[elaboration-monad]] rewrite to describe the freer row, `elaboration-meta-state.plan.md` marked superseded, pulse Elaboration V2 paragraph refresh.
3. New-zettel proposals (freer runtime, registry effect, Eff.with semantics, normalize/NbE modes) — **confirm with user before creating** (zettel pass deliberately deferred).

## Design decisions (pre-settled in session, 2026-08-09)

- Registry is its **own effect**, not a MutState field: boundary handlers need no fabricated state, rows document capability, no atomicity argument for bundling.
- `annotation: NF.Value` (registry threading obsoletes #17's `EB.Term` quoting workaround).
- Context loses `zonker`/`metas`; ctx is the **reader env**, not a parameter, for converted subsystems.
- Speculation: `replay` = `Eff.with` + copied registry handler + `Metas.merge` (the merge option); `resolveImplicit` = fresh subst handler + local raise clause, no registry fork (unify writes no solutions — revised 2026-08-12).
- Crash-don't-handle: evaluator invariants and budget exhaustion throw; no finalization semantics anywhere.
- Naming: effectful cores keep plain names (`evaluate`, `quote`, `generalize`); `normalize` wraps evaluate with a fresh callstack; subsystem `run` functions are the only handler-installation sites.
- Step 0 is a real `git merge` of `origin/fix/using-in-block-implicits` (lineage preserved), not file copying; the registry *branch* is not merged — it is re-expressed by this plan.

## Design decisions (settled in session, 2026-08-12)

- **Handler-decided control**: actions declare, handlers control — clauses return `ctl.resume(v)` / `ctl.abort(v)` explicitly (no implicit resume). `Action` drops its `Control` type parameter; `Forwarded` becomes plain tag exclusion. Resumable raise handlers are in-scope capability, not the except default.
- **No `Eff.attempt`**: rejected as an overly specific util; sites compose `Eff.with` with the raise clause they need.
- **Metas are global, not scoped** (reaffirmed from milestone 3): a stored closure observing a newly recorded solution is intended; annotations are consumed raw; resolution is lazy through the registry.
- **Mints immediate, solutions local**: `Registry.register` commits fresh entries at mint time (the #17 leak fix); solutions ride the unification-private subst effect until a boundary commits via `withSolutions`.
- **Per-pass rows name their concerns**: `Generalization`, `Abstraction`, `Zonking`, `Unification` — identical or overlapping contents today, but each documents and type-limits what the pass may touch; `Eff.Only<Effect, Tags>` narrows to specific actions.
- **`solve` answers `{resolutions}` only** — it commits its solutions; downstream zonker consumers break loudly until context surgery.
