---
tags:
  - verification
  - decision
  - principle
  - ir
  - ivl
  - backend
  - compiler
  - sat
  - infrastructure
  - implemented
---
# IVL boundary

IVL (Intermediate Verification Language) is the stable IR boundary between VC generation and satisfiability solving. Obligations emitted by `check`, `synth`, and `subtype` are expressed as `IVL.Formula` — a solver-neutral representation that Yap owns, independent of any backend.

## Role in the architecture

IVL is the contract that makes the verification backend pluggable. VC generation targets IVL; solving consumes IVL. Changing the solver (CDCL(T), Z3, future backends) requires only a new consumer, not changes to how VCs are produced. This is the core architectural invariant of the [[z3-replacement.adr]].

## Artefact shape

```
VerificationArtefacts = { vc: IVL.Formula; nf?: NF.Value }
Obligation = { label: string; expr: IVL.Formula; context?: { term?; type?; description? } }
```

Previously, `vc` and `expr` held Z3-native `Expr` values, coupling generation to a single backend. The migration to `IVL.Formula` was the first milestone deliverable ([[m1-implementation]]).

## Design properties

**Mirrors elaboration structure:** IVL sorts and terms reflect elaboration types and normal forms — `Bool`, `Int`, `Real`, `Array`, `Row`, `String`, uninterpreted sorts. This shared shape makes translation from elaboration lightweight and makes counterexample display straightforward.

**Admits lowering passes:** Normalization, Skolemization, and Tseitin CNF all operate on `IVL.Formula` before clauses reach the SAT core. These passes are backend-agnostic.

**Extensible for new theories:** Adding a row sort, string sort, or custom comparison requires extending IVL's sort/term vocabulary, not changing the solver interface. Theory plugins pattern-match on IVL atoms.
