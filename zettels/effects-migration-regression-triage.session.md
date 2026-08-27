---
tags:
  - ai-session
  - elaboration
  - effect
  - migration
  - generalization
  - normalization
  - constraint
  - display
  - error-handling
  - testing
  - regression
  - bugfix
  - implementation
  - in-progress
refs:
  - session:b278d664-f950-420d-a9ef-0c8aa0608667
  - branch:refactor/v3-free-monad
  - plan:z-yap/resources/plans/effectful-subsystems.plan.md
---
# Session: Effects-migration regression triage

Took the v3 freer migration's test suites from 61 failures to 16 by tracing each class of failure against `main` rather than reading the new code for plausible causes. Five distinct regressions, each a place where splitting `EB.Context` into a reader plus ambient effects separated two things v2 kept together.

## Method, and where it went wrong first

`main` (`15ff565`) is the merge-base and is fully green — 214 passed. Two earlier readings anchored on `2cf6b20` and `78f3051` instead, concluded that several failures pre-dated the work, and were wrong: both are branch commits. Every failure belongs to this branch. Recorded because the mistake cost a full round of analysis and produced a "pre-existing failures" story that had to be retracted.

What worked was mechanical: instrument the same function in a `main` worktree and on the branch, run the same test, diff the traces. Every regression below was located that way, and in each case the algorithm turned out to be identical to v2's — the divergence was always in what a value could *see*, never in what the code computed.

## The common shape

v2's `ctx` carried the scope **and** the metacontext, so every `local`-style swap moved both. `quote`'s `Abs` case is the clearest instance: `quote(closure.ctx, lvl + 1, val)` swapped the zonker along with the environment, whereas `M.reader.local(_ => closure.ctx, quote(lvl + 1, val))` swaps only the environment and leaves an ambient registry visible. Once scope and metacontext are separate effects, each site has to say which one it meant, and five sites did not.

## Fixed

**Lazy zonking became eager** (`7766b2f`). Generalization's `?m := Bound(lvl)` was readable while `wrap` quoted the body, and quoting descends into each closure's own spine where that level denotes a different binder. Recording the substitution after the wrap fixed 15 tests; it also broke row annotations, which is why this stays open — see [[generalization-substitution-timing.bug]].

**Constraint sets stopped being per-statement** (`2da6753`). `V2.listen()` answered with the current `Do` block's accumulator, which reset to `empty` per statement; `writer.peek()` answers with everything told in the innermost scope, and a block's statements share one. A declaration was therefore re-visiting an earlier statement's constraints — whose values still hold pre-generalization closures — and zonking a telescope level against a spine that never had it. `M.writer.listen` per statement restored v2's counts exactly (`1, 3, 3`). Only blocks were affected; module statements each get their own `Eff.run`.

**A Pi closure captured its own binder** (`f33f986`). v2 passed `closeVal` the ctx captured before `V2.local` extended it; the effectful `closeVal` asks the reader, and the call sat inside the local that binds the lambda variable. Narrowing the local to body inference plus implicit insertion — which mints at the extended level and must stay inside — puts the Pi back where v2 built it.

**Display expanded every solved meta** (`f3ed02f`). v2 chose expansion per call site through `ctx.zonker`: empty for constraints, the solver's zonker for terms and types. A shared registry collapsed that into always-expanded. `Metas.unsolved` names the annotations-only view so a caller says which it meant. Verbose annotation nesting came free in v2 because annotations were `EB.Term`s and went through the term printer; they are semantic now, so both printers share one flag that descends with the annotation.

**Errors lost their trace** (`ff09945`). `M.fail` dropped the tracer's stack, so no raised error carried provenance and there was nothing for a `Trace:` section to print — the absent renderer was the symptom. `Errors.report` joins cause and provenance for a raised `Err`, stays effectful so it runs at the caller's boundary, and `monad.v2`'s copy now delegates to it.

## Also done

The writer effect was rewritten over `Eff.with` (`04d1115`): `listen`/`censor` install a fresh handler over the same actions and tell the result outward, retiring the `Open`/`Close` actions, the `scopes` array, and an `innermost()` that meant two different indices either side of a pop. Nine tests written against the old implementation first, so they characterise the semantics rather than the rewrite. One case changed and is skipped against the open question — see [[scope-output-on-abort]].

Test harnesses moved onto boundary runs (`997cb4f`): `shown(ctx, registry)` wraps one `Eff.run` for read-only programs, constraints render against the unsolved view, and the integration pipeline uses `EB.Mod`'s boundary API. No snapshot was updated.

## Left open

16 failures: eight generalization snapshots awaiting judgement, five snapshot diffs including `return p.snd` rendering as `return "hello"` (a semantics change from `78f3051`'s block-return abstraction that nobody has ruled on), two throws from [[generalization-substitution-timing.bug]], and one from `verification/modalities/liquids.ts` calling the pre-migration `closeVal(ctx, value)` — which tsc already flags and M6 will retire.

Also queued: folding `letdec` into `Stmt.infer`'s `let` case ([[letdec-boundary-split]]), and whether an aborted scope has an output ([[scope-output-on-abort]]).

<!-- connections:start -->

## Connections

**Incoming**
- [[default-context-substitution-aliasing.bug]] ← DISCOVERED_BY — Surfaced while judging the branch's generalization snapshots

<!-- connections:end -->
