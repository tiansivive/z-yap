---
tags:
  - pattern
  - lowering
  - mir
  - gram
  - bridge
  - compiler
  - codegen
  - dispatch
  - state-machine
  - bugfix
  - implemented
refs:
  - thread:pipeline-stabilization
  - thread:pattern-matching
  - branch:pipeline-bug-squashing
  - session:3c204de9-19e6-4c74-b77d-29fa2465f1f5
---
# Match merge threading via block parameters

A `match` lowers to a switch on the discriminant, one case block per arm computing that arm's result, and a shared join block that yields the match's value. The arm result reaches the join as a **block parameter**: each case ends with `jump join(result)`, and the join binds the incoming value as its parameter. MIR blocks carry parameters and jumps carry arguments for exactly this.

A value bound inside a case block is not in scope at the join. The join has one predecessor per arm and none of them dominates it, so a name defined in a branch has no reaching definition at the merge. Block parameters are the only channel by which a branch-local value becomes visible at a merge point; binding a shared result variable inside each case and jumping to a parameterless join leaves the join's read dangling.

The parameter also carries the value correctly into codegen. A block parameter lowers to a function-scoped mutable that each predecessor assigns before jumping, so the emitted merge reads an in-scope binding. A merge built from per-branch block-local bindings instead emits them block-scoped in the target — out of scope at the join, the runtime face of the same defect.

<!-- connections:start -->

## Connections

**Outgoing**
- FIXES → [[codegen-correctness-gaps]] — Match join-block scoping was a MIR merge-threading defect, not a codegen gap
- RELIES_ON → [[pattern-matching-compilation]] — Switch/case/join decision-tree lowering
- APPLIES_TO → [[gram-to-mir-bridge]] — Emitted by the bridge switch lowering

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES — Match merge threaded via block parameters
- [[pipeline-bug-squashing.session]] ← PRODUCED — Bridge merge-params fix

<!-- connections:end -->
