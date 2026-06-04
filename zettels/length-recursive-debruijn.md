---
tags:
  - bugfix
  - implemented
  - elaboration
  - recursion
  - lowering
  - graph
  - compiler
  - codegen
---

# length recursive de Bruijn index bug

Recursive self-references inside match alternatives produced `var:bound` GRAM nodes with no `:refers_to` edge, cascading to `unknown` in MIR and codegen. Two independent causes:

**1. Missing variant pattern rest row binder.** GRAM's `walkPattern` for variant patterns walked the matched tag's payload but ignored `ext.row` (the rest row variable, e.g. `$row_21`). Elaboration binds rest row variables, so the GRAM binder stack was short by one per variant pattern. Fixed by calling `walkPatternRow` on the variant's rest row after walking the payload.

**2. Module-level let-dec not in GRAM binder stack.** Each module-level let-dec is compiled independently by `GRAM.Pipeline.compile`. The term's binder stack starts empty, so recursive self-references (de Bruijn indices that escape the term's own binders) had no resolution target. Fixed by accepting `parentBinders` in `translate`, which creates `stmt:let` nodes and pushes them onto the binder stack at init — same mechanism `abs` and `mu` use for their own binders.

Both causes compound: the missing rest row binder shifts index arithmetic, and the missing parent binder removes the resolution target. Together, index 6 for `length` fell outside the 5-element GRAM binder stack (should have been 7: 2 lambdas + 4 pattern binders + 1 parent).

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[knot-tying]] — Recursive binder pattern
- RELIES_ON → [[elaboration-context]] — De Bruijn depth management
- APPLIES_TO → [[blocks]] — Block-level recursive bindings
- FIXES → [[gram]] — Variant pattern rest row binder + parent binder stack
- APPLIES_TO → [[gram-to-mir-bridge]] — Unresolved var:bound cascaded to unknown in MIR
- DISCOVERED_BY → [[pipeline-stabilization.thread]]

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES — Recursive call resolves as wrong de Bruijn index

<!-- connections:end -->
