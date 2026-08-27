---
tags:
  - question
  - concern
  - effect
  - semantics
  - mechanism
  - freer
  - handler
  - needs-design
status: open
---
# Does an aborted scope have an output?

`Eff.run` and `Eff.with` both answer with each handler's `output()` alongside the program's value. When a clause aborts, the run still reads its handlers' outputs, so a failed elaboration reports the constraints it had told before failing. An `Eff.with` whose program is aborted **from outside** reports nothing: the raise is a forwarded action, the enclosing handler aborts, `run` calls `computation.return(...)`, and the unwinding passes through the delimiter without its outputs ever being read.

So the same effect answers two ways depending only on whether a scope boundary happened to sit between the `tell` and the abort. That inconsistency — not either answer on its own — is the open question.

## Where it surfaced

`writer.ts` used to carry a `scopes: W[]` array with `Writer.open`/`Writer.close` actions, and folded every scope in `output()` so that "an abort inside a listen still yields what it had written". That array was a local reimplementation of a capability freer does not offer; rewriting `listen`/`censor` over `Eff.with` (2026-08-13) removed it and with it the behaviour. `src/utils/effects/__tests__/writer.test.ts` keeps the case, skipped, pointing here.

## The two coherent answers

**No output.** A scope that did not complete contributes nothing. `Eff.with`'s contract stays simple, and today's implementation is already correct. The cost: the *run-level* accumulator then wants the same treatment, since it currently does report partial writes on abort — so this answer argues for losing those too.

**Output regardless.** A scope's output is whatever it accumulated, finished or not. This belongs in freer as an unwind-flush over live scopes, not per effect — writer, tracer and state would all get it, instead of each hand-rolling a scopes array. It reintroduces a stack of live delimiters, which is what `Eff.with` deliberately does not keep.

## Precedent

Monad transformers settle this by stacking order rather than by fiat: `WriterT w (Either e)` discards the log on failure, `ExceptT e (Writer w)` keeps it. Both are standard. An effect system with a single writer effect and a single except effect has no stacking order to appeal to, so the answer has to be chosen explicitly — which is exactly what the current hybrid fails to do.

## Evidence available

The elaboration suite is indifferent: flipping the behaviour moved nothing (24 failures before and after). No consumer reads a listened scope's writes on the failing path — errors render from the cause and its provenance, and the test harnesses throw before touching constraints. So this is a free choice today, and cheaper to settle now than after something starts depending on it.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[elaboration-monad]] — Writer semantics in the elaboration row
- CONSTRAINS → [[solver-effect-system]] — What a failed scope reports

**Incoming**
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->
