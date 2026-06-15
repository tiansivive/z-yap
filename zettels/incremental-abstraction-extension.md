---
tags:
  - verification
  - solver
  - quantifiers
  - instantiation
  - cnf
  - ivl
  - limitation
  - deferred
  - planned
  - design
  - sat
---
# Incremental abstraction extension

Quantifier instantiation in the v2 solver projects generated ground formulas into the existing Boolean abstraction. If an instantiated formula contains a fresh atom that was not present in the original CNF atom table, lookup cannot produce a Boolean literal for it.

Full SMT quantifier instantiation can extend the ground problem: a new instance may introduce atoms that must be encoded, registered with theories, and added to the CDCL clause database. The current v2 path instead treats lookup as a projection into the initial abstraction, so those fresh atoms are ignored by the generated lemma.

This is a real completeness improvement for general quantified SMT solving. It is non-urgent for Yap's liquid-style verification path because common refinement VCs are generated around local program structure and aim at quantifier-free EUF + linear arithmetic fragments, where relevant ground atoms are usually present in the original problem.

## Work shape

The solver needs an operation that incrementally CNF-encodes fresh ground atoms, extends the encoding registry, registers new atoms with concrete theories, and adds the generated clauses to the CDCL database without restarting the entire solver run.

<!-- connections:start -->

## Connections

**Incoming**
- [[solver-v2-monadic-port.session]] ← PRODUCED — Deferred quantifier abstraction work discovered during v2 closeout
- [[solver-v2-monadic-port.implementation]] ← DEFERRED_TO — Quantifier fresh-atom abstraction extension remains future work
- [[verification-backend.thread]] ← INCLUDES — Thread item 27

<!-- connections:end -->
