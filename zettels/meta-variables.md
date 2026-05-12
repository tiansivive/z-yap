---
tags: [mechanism, concept, type-system, elaboration]
---
# Meta-variables

Placeholders for unknown types or terms during bidirectional elaboration. Lifecycle:

1. **Create** — fresh meta with a scope level; represents an unknown to be determined
2. **Constrain** — [[unification]] generates equations involving the meta
3. **Solve** — Robinson [[unification]] resolves the meta to a concrete type/term
4. **Zonk** — substitute all solved metas through the final term, collapsing indirections

Unsolved metas after elaborating a let-binding become implicit Pi binders during [[generalization]]. Metas are scoped by level — only metas created above the current scope can generalize.

In Yap: the `zonker` accumulates substitutions from solved metas. The supply generates fresh meta IDs monotonically.
