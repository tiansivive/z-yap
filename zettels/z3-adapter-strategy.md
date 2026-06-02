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
  - implemented
  - infrastructure
  - migration
---
# Z3 adapter strategy

The Z3 adapter (`z3.adapter.ts`) translates IVL formulas to Z3 expressions and invokes Z3's solver. It exists as an **oracle** and **regression safety net**, not as the primary solving path.

## Purpose

**Differential testing:** Running the same formula through both CDCL(T) and Z3 catches bugs where the in-house solver disagrees with an established reference. This is especially valuable during theory development (EUF edge cases, arithmetic rounding, quantifier instantiation coverage).

**Transition continuity:** During M1, before the CDCL engine existed, the adapter kept the verification pipeline functional by routing IVL formulas to Z3. The IVL boundary ([[ivl-boundary]]) was designed to support exactly this: multiple consumers of the same IR.

**Fallback:** For formulas that exercise theories the in-house solver doesn't yet support (strings, non-linear arithmetic), Z3 can serve as a temporary backend until the corresponding theory plugin is built.

## Limitations

Z3 has no native row theory, which is a key driver for the owned-solver direction ([[z3-replacement.adr]], [[required-theory-support]]). Row-typed formulas either degrade to uninterpreted sorts in Z3 or are unsupported entirely. The adapter also introduces an FFI boundary (native Z3 binaries) that complicates CI, WASM targets, and distribution.

## Long-term role

As the CDCL(T) engine matures, the adapter narrows from "fallback" to "test oracle only." The Z3 npm dependency can eventually move behind an optional flag rather than being required at install time.
