---
tags:
  - verification
  - decision
  - mechanism
  - solver
  - sat
  - ivl
  - backend
  - testing
  - deprecated
  - infrastructure
  - migration
---
# Z3 adapter strategy

**Superseded by full Z3 removal — see [[z3-replacement.adr]] and [[solver-v2-monadic-port.implementation]].** Original transition strategy preserved below for reference.

The Z3 adapter (`z3.adapter.ts`) translated IVL formulas to Z3 expressions and invoked Z3's solver. It existed as an **oracle** and **regression safety net**, not as the primary solving path.

## Purpose

**Differential testing:** Running the same formula through both CDCL(T) and Z3 caught bugs where the in-house solver disagreed with an established reference. This was especially valuable during theory development (EUF edge cases, arithmetic rounding, quantifier instantiation coverage).

**Transition continuity:** During M1, before the CDCL engine existed, the adapter kept the verification pipeline functional by routing IVL formulas to Z3. The IVL boundary ([[ivl-boundary]]) was designed to support exactly this: multiple consumers of the same IR.

**Fallback:** For formulas that exercise theories the in-house solver did not yet support (strings, non-linear arithmetic), Z3 could serve as a temporary backend until the corresponding theory plugin was built.

## Limitations

Z3 has no native row theory, which is a key driver for the owned-solver direction ([[z3-replacement.adr]], [[required-theory-support]]). Row-typed formulas either degrade to uninterpreted sorts in Z3 or are unsupported entirely. The adapter also introduces an FFI boundary (native Z3 binaries) that complicates CI, WASM targets, and distribution.

## Long-term role

The adapter narrowed from fallback to temporary test oracle, then was removed once source-level integration parity tests captured the known replacement blockers. The former oracle disagreements are tracked as [[solver-v2-universal-refinement-false-sat]] and [[block-scoped-let-vc-parity-bug]].

<!-- connections:start -->

## Connections

**Outgoing**
- CONSUMES → [[ivl-boundary]] — Translates IVL to Z3
- IMPLEMENTS → [[verification-backend]] — One backend consumer
- ENABLES → [[solver-testing]] — Differential testing

**Incoming**
- [[z3-replacement.adr]] ← SUPERSEDES — Adapter removed after v2 parity tests replaced the temporary oracle harness
- [[verification-backend.thread]] ← INCLUDES — Deprecated transition strategy
- [[m1-implementation]] ← PRODUCES — Adapter built in M1

<!-- connections:end -->
