---
tags:
  - ai-session
  - pattern
  - lowering
  - mir
  - gram
  - bridge
  - elaboration
  - generalization
  - bugfix
  - debugging
  - testing
refs:
  - session:3c204de9-19e6-4c74-b77d-29fa2465f1f5
  - branch:pipeline-bug-squashing
---
# Session: Pipeline bug-squashing

Re-swept the explorer's 19 built-in snippets for correctness — not just liveness — across elaboration → NF → GRAM → MIR, and fixed two defects it surfaced. The GRAM→MIR bridge lowered match merges through a shared case-block-local result variable and parameterless jumps into a paramless join, leaving the join's read out of scope; corrected to thread each arm result through a join block parameter ([[match-merge-block-params]]), which also resolved the codegen "match join-block scoping" symptom previously filed under [[codegen-correctness-gaps]]. Separately, `collectMetasEB` ignored the zonker for row-tail metas, so an already-generalized row meta from an unused inner `let` was re-quantified onto an enclosing unit block; corrected to resolve row-tail metas through the zonker ([[meta-collection-zonker]]), closing a residual of [[letpoly-implicit-escape]]. Also produced the [[redundant-match-arms]] design note (product-match redundancy is a diagnostic, not a merge or semantics bug), and handled the PR #12 review: the generalization transitive-annotation pass became `Annotations.closeOver` and narration comments were removed.
