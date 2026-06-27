---
tags:
  - mechanism
  - pattern
  - compiler
  - codegen
  - compilation
  - concept
  - state-machine
  - performance
  - lowering
  - implementation
---
# Tagged dispatch

Assign each symbol a compile-time integer tag. Compile a pattern match — a case distinction
over node identity — to a static array of code-block addresses indexed by tag, with an
indirect branch as the dispatch. The jump table is complete: every possible tag in the
discrimination range has an entry.

The four-class layout used in [[sprite]]:

    0  function  (all function symbols share one tag; step function handles further evaluation)
    1  choice    (execute pull-tab step)
    2  failure   (propagate failure)
    3+ constructors, assigned sequentially within type

The function tag triggers a call to the node's step function (retrieved from the info table
pointer in the heap object) and re-dispatches after evaluation. Constructors within a type
are consecutive integers, so a case with N constructors dispatches over a range of N+3
contiguous tag values. An incomplete function maps missing constructor branches to
rewrite-to-failure.

Tagged dispatch is an efficient alternative to chains of equality comparisons or branching
on type fields. It maps to `switch` on integer in C, indirect branch in LLVM, and jump
tables in native assembly. The technique is strategy-agnostic: the choice node and
pull-tab cases are specific to [[sprite]]'s non-determinism model, but the constructor and
function dispatch shape applies to any graph-reduction or tree-walking backend.

[[gram-pattern-pass]] performs the analogous role at the GRAM level; tagged dispatch is the
concrete machine-code realization relevant to [[c-codegen]] and other native backends.
