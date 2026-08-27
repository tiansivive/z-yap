---
tags:
  - bug
  - elaboration
  - generalization
  - normalization
  - metavariable
  - substitution
  - closure
  - row-types
  - migration
  - resolved
  - bugfix
status: resolved
refs:
  - branch:refactor/v3-free-monad
---
# Generalization's substitution has no correct commit time

**The claim in this title is false, and the analysis below is preserved as the record of a wrong diagnosis — see [[row-solution-dereference]].** Committing after the wrap is correct and stands. The row-annotation failure described under "Commit after the wrap" was not caused by commit timing: row-variable resolution installed a solution that named a binder instead of re-resolving it, so the use site's freshly instantiated meta was discarded. Both symptoms below are real observations; only their attribution to ordering was wrong. The tell that ordering could not be the cause: within one implicit application the Type binder was instantiated correctly and the Row binder was not, which no commit time can distinguish.

`NF.generalize` maps each generalized meta to a de Bruijn **level** — `?m := Var{Bound, lvl}` for the telescope binder it introduces — and records that in the registry. When the registry sees it decides which of two failures happens, and both are observed. The ordering of the commit is therefore not the right control.

## Commit before the wrap (v2's behaviour, `09a6705` and earlier)

`wrap` quotes the body with the mapping visible, so annotation positions become term-level `Var{Bound, index}` at quote time and evaluation resolves them through the environment. Correct for annotations.

The **codomain** is wrong: `quote`'s `Abs` case descends via `closure.ctx`, and on the branch the ambient registry travels with it, so the mapping is readable in a spine that does not contain the telescope. Traced on `{ let id = \x -> x; return id 42; }`: `?2 := Bound(1)` read in spine `[x, id]` resolves to the lambda argument, and the block types as `42` instead of `Num`. v2 escaped this because the zonker rode the ctx that `quote` swapped on descent — splitting ctx into reader plus ambient registry swapped only the env.

## Commit after the wrap (`7766b2f`)

Metas stay symbolic in the generalized syntax, so the codomain is right and `id 42 : Num`. 15 tests fixed, none broken.

The **row annotation** is now wrong. Traced on `{ let fst = \p -> p.x; let val1 = { x: 1, y: 2 }; … let a = fst val1; }` — everything upstream identical between branch and main (same `[GEN OUT]`, same `?4 => Bound(1)`, same first insertion `r := ?12`), diverging in one field during the second implicit insertion:

```
main:    [ROWVAR] syntax={"type":"Bound","index":1}   ->  annRowTail={"Meta", val:12}
branch:  [ROWVAR] syntax={"type":"Meta","val":4}      ->  annRowTail={"Bound", lvl:1}
```

`evaluation.v2.ts` resolves a row variable two ways: the `Bound` branch looks it up in the environment, the `Meta` branch installs the registry solution **verbatim**. A solution that is itself `Var{Bound, lvl}` therefore never meets an environment. Unification then reads that tail under the ambient spine `[val2, val1, fst]`, where level 1 is `val1`, and `rewrite` rejects a non-meta tail. The same asymmetry exists in main's evaluator byte-for-byte; it never fires there because main's generalized syntax has no metas left in that position.

Cost: `let-polymorphism > polymorphic function with projection` and `> polymorphic function with struct values` throw (`Impossible! Expected meta variable`, and the row-unification `Impossible`). Both were failing before `7766b2f` as snapshot diffs; the change turned wrong output into a crash.

## What this says

A level only means something relative to one spine, and yap has one per closure. Substituting at quote time gets annotations right because quote knows its level; it cannot get the codomain right because it changes spine on descent. Leaving the metas symbolic defers the substitution to a point where no spine is recorded at all.

So the substitution wants to happen where depth is unambiguous and uniform across every position — which points at abstraction over the quoted syntax with tracked binder depth, rather than a registry mapping consumed by evaluation. Unverified: proposed and withdrawn twice this session, the second time for a wrong reason ("a bound variable cannot be substituted into a value" — v2 does exactly that, correctly, just later). Wants deciding on evidence, not on the argument that produced it.

## Correction

A registry mapping consumed by evaluation is workable, because a recorded level is a reference and evaluation already knows how to follow one: quote it into the reading scope and evaluate the index. The value path did that; the row path did not, which is the whole of the row-annotation symptom. Recorded here because the reasoning above reads as a proof that the mechanism cannot work, and it is not one — it argues from where a level is *meaningful* to where it must be *substituted*, skipping the possibility that a consumer re-resolves it.

Method note: the diagnosis was written in the declarative voice of settled knowledge, and a later session inherited it as a premise rather than a hypothesis. What falsified it was one measurement nobody had taken — logging what the environment held at the moment resolution decided.

Related: [[meta-collection-zonker]], [[instantiate-any-default]], [[missing-spec-let-polymorphism]].

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[generalization]] — Where the substitution is recorded
- SHARED_WITH → [[row-types.thread]] — Surfaced through a row tail in rewrite

**Incoming**
- [[row-solution-dereference]] ← FIXES — The row symptom was a resolution stopping at a reference, not a commit time

<!-- connections:end -->
