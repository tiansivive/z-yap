---
tags:
  - bugfix
  - elaboration
  - normalization
  - nbe
  - evaluation
  - row-types
  - unification
  - metavariable
  - substitution
  - generalization
  - polymorphism
  - implemented
refs:
  - branch:refactor/v3-free-monad
---
# A solution naming a variable is a reference, not an answer

When a metavariable's solution is itself a variable, the solution does not say what the meta *is* — it says which slot to look in. What that slot holds depends on the scope doing the reading, so resolution has to re-resolve it there. Installing the solution as-is reinstates a reference that has since been filled with something else.

Let-generalization makes this routine rather than exotic. Generalizing a declaration records each quantified meta as the telescope binder it introduces, and every use site instantiates that telescope by installing a fresh meta in the binder's slot. A consumer that installs the recorded solution verbatim therefore hands back the binder itself, and the use site silently loses the fresh meta minted for it — the function stops being polymorphic per use while still looking generalized.

The canonical resolution is quote-then-re-evaluate: quoting rewrites a level into an index relative to the reading scope, and evaluating an index consults that scope's environment. Any resolution path that answers from the solution alone is skipping the step that makes the reference meaningful.

Row positions are where this is easiest to get wrong. Rows carry their own variable form, so row-variable resolution is written separately from value resolution and can silently drift from it. The consequence is also displaced: row unification is defined over a *flexible* tail, and a rigid tail has no case at all, so the mistake surfaces as an impossible-state error inside unification rather than as a type error at the position that produced it. A rigid row tail reaching unification is thus a reliable signal that some earlier resolution stopped at a reference.

<!-- connections:start -->

## Connections

**Outgoing**
- FIXES → [[generalization-substitution-timing.bug]] — The row symptom was a resolution stopping at a reference, not a commit time
- APPLIES_TO → [[generalization]] — Per-use instantiation of a telescope binder depends on the reference being followed
- CLARIFIES → [[row-unification]] — Row unification is defined over a flexible tail; a rigid tail signals an unresolved reference upstream
- APPLIES_TO → [[nbe]] — Quote-then-re-evaluate is the resolution step that makes a recorded level meaningful
- SHARED_WITH → [[row-types.thread]] — Row variables resolve separately from values and drifted from them

**Incoming**
- [[elaboration-v2.thread]] ← INCLUDES

<!-- connections:end -->
