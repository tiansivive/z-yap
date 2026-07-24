---
tags:
  - bug
  - regression
  - normalization
  - neutrals
  - dependent
  - pattern
  - match
  - unification
  - elaboration
  - recursion
  - verification
  - testing
  - bugfix
  - implemented
  - resolved
refs:
  - session:019f84ea-7e2a-7090-945e-0ea07bd21939
  - branch:fixing-neutral-semantics
---
# Neutral semantics regresses existing dependent tests

The explicit `Symbolic` / `Sealed` / `Blocked` representation introduced two regressions when it failed to preserve the reason a neutral had been constructed. Stable symbolic scrutinees were exposed as ordinary values, allowing match selection over rigid arguments and symbolic labels. Conversely, recursive μ folds inherited the constructor's default symbolic category, so value-level dependent-record checking fell back to structural schema subtyping.

The two paths require different boundaries. `force` zonks a solved flex and consumes a real blocked-resumption step, but inspection leaves a stable symbolic unknown symbolic. A recursive fold is `Sealed`: both direct μ application and a reference to a μ-bound value remain opaque until an explicit recursive-type consumer unfolds them.

This distinction matters for dependent records. Value-level checking instantiates sibling labels with field values, whereas schema subtyping legitimately instantiates a Sigma body with field types. Routing an ordered-list tail through the latter path made a dependent label denote `Num` rather than the preceding numeric value, yielding an obligation such as `Num < c` instead of `2 < c`. Sealing the recursive fold keeps the tail on the value-level path, while explicit unfolding still exposes its structural shape. Requiring every neutral construction to name its category prevents future defaults from silently changing that dispatch.

<!-- connections:start -->

## Connections

**Outgoing**
- REGRESSES → [[dependent-pattern-matching]] — Misclassified symbolic scrutinees select match branches prematurely

**Incoming**
- [[neutrals]] ← RESOLVES — Explicit categories preserve dependent computation at symbolic and recursive boundaries
- [[pipeline-stabilization.thread]] ← INCLUDES — Resolved regression in dependent computation
- [[global-pending-queue]] ← INCLUDES — Resolved neutral-category audit
- [[neutral-category-completion.session]] ← RESOLVED

<!-- connections:end -->
