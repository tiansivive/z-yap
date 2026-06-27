---
tags:
  - reference
  - paper
  - compiler
  - codegen
  - pattern
  - continuation
  - language
  - gram
  - mechanism
  - ir
---
# Sprite: A New Functional-Logic Compiler for Curry

Antoy & Jost (2016). arXiv:1608.04016. A native-code compiler for Curry via LLVM, based on
the Fair Scheme compilation strategy. Described as the first operationally complete Curry
compiler: every result a program can produce is eventually produced given sufficient
resources.

Key contributions documented in atomic zettels:

- **[[icurry]]** — two-IR split from declarative case-expression form to imperative
  statement-based IR; all non-determinism expressed as explicit choices.
- **[[tagged-dispatch]]** — compile-time integer tags per symbol, static jump table,
  indirect branch for pattern matching.
- **[[pull-tab]]** — lift a choice node out of a needed argument position, sharing the
  unevaluated remainder without committing to either branch.
- **[[fair-nondet-scheduling]]** — work queue of suspended computations with periodic
  rotation for operational completeness.
- **[[choice-fingerprints]]** — cloned choice-node consistency via identifier annotation.

Additional codegen techniques: fixed-size heap objects (info-pointer + inline payload,
single pool), per-symbol step functions stored in info tables, eval/apply PAP style. These
connect to [[gram-type-uniformity]] and existing closure/dispatch machinery.

Curry extends Haskell with a single construct (free variables) but the semantic differences
are profound: functional-logic programs require non-determinism and narrowing that purely
functional graph machines do not encounter. Most of Sprite's machinery addresses lazy graph
rewriting and non-determinism in that setting. Techniques relating to [[call-time-choice]],
clone consistency, and [[pull-tab]] propagation interact differently in a strict language.
