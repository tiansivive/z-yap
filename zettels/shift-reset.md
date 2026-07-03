---
tags:
  [
    continuation,
    elaboration,
    lowering,
    inference,
    mir,
    compiler,
    type-system,
    effect,
    mechanism,
    implemented,
    monad,
    codegen,
    normalization,
    reference,
    ast,
  ]
---
# Shift/Reset

> Lowering site: per D-006 ([[gram-canonical-ir.adr]]), the canonical lowering for `shift`/`reset` lives in `src/GRAM/bridge/continuations.ts` ([[shift-reset-bridge-lowering]]). The "MIR lowering" framing below refers to the shape (`Alloc`/`Read`/`Jump`/`Branch`), which is unchanged; the site moved from `src/lowering/continuations/`.

Delimited control in Yap spans **core typing** (`reset` introduces answer metas; `shift`/`resume` refine them and record multishot evidence) and **MIR lowering** (explicit blocks, `Alloc`/`Read`/`Jump`, multishot via `Branch`).

**Surface → core:** Parser yields `reset`, `shift`, `resume` terms; inference lives in `src/elaboration/inference/reset.ts` and `src/elaboration/inference/shift.ts` (V2 `Do` in `src/elaboration/shared/monad.v2.ts`). `reset` pushes a `Delimitation` (`answer.initial`, `answer.final`, `shifted`). `shift` binds `$k` with `EB.bind(..., { type: "Continuation", resumption: { meta: skolem } }, kTy)` and builds `EB.Constructors.Shift(...)`. `resume` elaborates to `App(k, arg)` and appends the resumed argument value to `MutState.nondeterminism.solution[meta.val]` (`shift.ts`).

**Multishot typing vs lowering:** Multishot is **not** implemented inside the unifier as alternate worlds. Elaboration **accumulates** `NF.Value[]` per resumption meta; `src/elaboration/inference/statements.ts` `letdec` calls `replay` (`src/elaboration/solver/nondeterminism.ts`), which `Record.sequence`s those arrays into a Cartesian product of zonker fragments and runs `EB.solve` / `NF.generalize` once per combination, then unifies instantiated types across the rest. Lowering multishot is separate: `src/lowering/continuations/shift.ts` ends the shared resume block with `Terminator.Branch` on the resume index when `nextKCallIdx > 0`; `src/lowering/continuations/kcall.ts` emits each `k(arg)` as `Jump` into that block with a distinct index.

**Runtime / NbE:** `src/elaboration/normalization/evaluation.v2.ts` evaluates `Shift`/`Reset` with an explicit work stack (tests in `src/elaboration/normalization/__tests__/evaluation.v2.test.ts`). Reset/Shift are EB.Term constructs only — they do not exist as NF.Value constructors. NbE reduces them during evaluation; the result is always a standard NF.Value.

**Tests:** lowering in `src/lowering/__tests__/lower.test.ts`; GRAM pass in `src/GRAM/__tests__/shift-reset.test.ts` (single/multishot/discarded/embedded/nested resumptions, provenance preservation); elaboration inference in `src/elaboration/inference/__tests__/shift-reset.test.ts`.

Detail zettels: `answer-type-polymorphism.md`, `continuation-binders.md`, `nondeterminism-multishot.md`, `shift-reset-mir-lowering.md`.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[answer-type-polymorphism]] — k has polymorphic answer type
- USES → [[continuation-binders]] — Resume encoded via metas
- INTRODUCES → [[continuation-binders]] — Shift captures k
- COMPOSES_WITH → [[pi-types]] — k has Pi type
- INSTANTIATES → [[continuation-binders]] — Via skolem-like metas
- DELEGATES_TO → [[nondeterminism]] — Multishot replay
- NORMALIZES_TO → [[closures]] — Continuation closure (captured frames)
- TRANSLATES_TO → [[mir-lowering]] — State machines (planned)
- ELIMINATES → [[continuation-binders]] — Resume applies k
- CONSTRAINS → [[evaluation-monad-rework]] — Capture slices the work stack; the monad must expose it as state

**Incoming**
- [[shift-reset-mir-lowering]] ← IMPLEMENTS — Runtime story
- [[koka-influence]] ← CONTRASTS_WITH — Evidence passing vs direct capture
- [[effects-as-modality]] ← EXTENDS — Effect system over continuations
- [[danvy-filinski]] ← INFORMS — Foundational theory
- [[nondeterminism]] ← ENABLES — Multishot continuations
- [[missing-spec-shift-reset]] ← IMPLEMENTS — Impl ahead of spec
- [[nondeterminism-multishot]] ← ENABLES — Multishot continuations
- [[elaboration-monad]] ← ENABLES — Via MutState.skolems
- [[nondeterminism]] ← IMPLEMENTS — Multishot continuation semantics
- [[effects-as-modality]] ← COMPOSES_WITH — Effect system over continuations
- [[gram-shift-reset-pass]] ← IMPLEMENTS — In GRAM context
- [[gram-shift-reset-pass]] ← PRESERVES — reset/shift nodes unchanged
- [[delimited-continuations.thread]] ← INCLUDES
- [[bubble-semantics]] ← APPLIES_TO — New EB.Term constructor at shift use sites
- [[shift-reset-verification-stub]] ← IMPLEMENTS — Dummy verification pass-through
- [[implicits-as-coeffects-exploration]] ← COMPOSES_WITH — Coeffects meet delimited continuations
- [[test-coverage-gaps]] ← DEFERS — Elaboration-level tests skipped; GRAM tests pass
- [[continuation-closure]] ← IMPLEMENTS — Captured delimited continuation
- [[cbv-evaluation]] ← RELIES_ON — Continuations require strict order
- [[trampoline-evaluator]] ← ENABLES — Delimiter frames on work stack
- [[filinski-representation-theorem]] ← GROUNDED_IN — multi-shot shift/reset is the substrate
- [[choose-fail-effect]] ← USES — continuation substrate for the effect

<!-- connections:end -->
