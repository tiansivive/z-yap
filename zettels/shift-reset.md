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
