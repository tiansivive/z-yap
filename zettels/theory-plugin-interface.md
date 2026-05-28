---
tags:
  - verification
  - mechanism
  - pattern
  - backend
  - sat
  - compiler
  - reference
  - normalization
  - infrastructure
  - principle
  - implemented
---
# Theory plugin interface

The CDCL(T) solver dispatches domain-specific reasoning to theory plugins via a shared interface. Each theory registers with the SAT core and receives literals as they are assigned; it propagates derived facts and reports conflicts back.

## Interface shape

```ts
Theory = { name; assertLit; check; explain; backtrack }
```

`assertLit` is called inline during BCP for each assigned literal relevant to the theory. `check` runs before every SAT decision to detect theory conflicts that pure boolean propagation cannot see. `explain` produces a justification (a set of literals) for a theory-derived propagation or conflict. `backtrack` reverts internal state when the SAT solver backtracks.

The solver maintains a shared term arena (hash-consed e-nodes) that theories read from and write to. EUF's congruence closure operates on this arena; arithmetic normalizes atoms against it; the quantifier engine matches triggers against it.

## Current implementations

EUF (congruence closure), linear arithmetic (simplex + branch-and-bound), and quantifier instantiation (E-matching) implement this interface. String and row theory plugins are planned for milestones 3 and 4 respectively.

## Design rationale

Modular theories following the Nelson-Oppen / DPLL(T) tradition allow each decision procedure to be developed, tested, and traced independently. The shared arena avoids redundant term representations across theories. Generator-based `assertTrace`/`checkTrace` variants yield per-step events for the pipeline explorer without changing the solving logic.
