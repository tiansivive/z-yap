---
tags:
- concept
- mechanism
- representation
- semantics
- nbe
- normalization
- elaboration
- unification
- dependent
- implemented
- inference
- type-system
- ir
- ast
- metavariable
- modality
- ffi
- recursion
refs:
  - session:019f84ea-7e2a-7090-945e-0ea07bd21939
---
# Neutral terms

`Neutral` is a wrapper whose kind says why its payload must not be treated as an ordinary reducible application. Yap distinguishes three such roles.

- **Symbolic** carries an unknown-headed value: an unsolved meta, rigid binder, symbolic label placeholder, or a spine rooted at one. Zonking can replace a symbolic flex, while a rigid remains symbolic.
- **Sealed** keeps a canonical semantic encoding intact. Structural row constructors such as `Struct(row)`, `Schema(row)`, `Variant(row)`, and `Array(row)`, opaque foreign spines, and folded μ values are semantic units; sealing prevents them from being executed as ordinary applications.
- **Blocked** carries a residual elimination — projection, injection, or match — whose blocker is explicit in its payload. Its meaning belongs to the elimination that created it, rather than to generic application reduction.

`resume` is the one-step operation for a blocked elimination. Its `Option` result distinguishes no applicable step from a next value without making any claim about the next value's category: a resumed match may legitimately yield another blocked elimination. `force` resolves symbolic metas and recursively consumes each available resume step; it leaves a sealed value intact. `view` is the structural consumption boundary: it reports a payload with its `Symbolic`, `Sealed`, or `Blocked` status, treating an unwrapped semantic value as sealed. Consumers that need a row constructor therefore require a sealed view; consumers that need a residual computation preserve its blocked status. `unwrapNeutral` remains a legacy structural inspection tool, not a reduction operation.

This separation preserves two distinct termination boundaries. A symbolic head cannot be decomposed until information arrives. A sealed row application is a semantic unit rather than a pending computation. A blocked elimination may resume when its explicit base becomes known, but generic forcing never turns it back into an application that re-enters the same residual computation.

The flex/rigid distinction remains inside `Symbolic`: a flex neutral is solvable through the zonker, while a rigid is a structural unknown. Direct μ applications and references to a μ-bound value are `Sealed`, so only an explicit recursive-type consumer unfolds them. This preserves guarded normalisation while allowing structural checking to unfold recursive types at the value-record boundary.

<!-- connections:start -->

## Connections

**Outgoing**
- CONTRASTS_WITH → [[closures]] — Closures reduce; neutrals are stuck — dual roles in NbE
- WRAPS → [[nf-value]] — Unsolved computations wrapped
- ENABLES → [[nbe]] — Stuck terms represent unknowns
- RESOLVES → [[neutral-semantics-dependent-regression.bug]] — Explicit categories preserve dependent computation at symbolic and recursive boundaries

**Incoming**
- [[meta-variables]] ← PRODUCES — Unsolved metas produce neutral terms
- [[nbe]] ← USES — Stuck computations
- [[primop-closure]] ← PRODUCES — Neutral when arg is stuck
- [[application-evaluation]] ← DISPATCHES_ON — Grow spine when head is stuck
- [[nbe]] ← INCLUDES — Stuck computation
- [[whnf-vs-full-normalization]] ← RELIES_ON — WHNF is emergent from neutral blocking
- [[variable-evaluation-dispatch]] ← RELIES_ON — Unsolved metas → neutral
- [[nested-refinement-outer-label-capture.bug]] ← MOTIVATES — Explicit blocked eliminations distinguish resumable dependencies from symbolic unknowns and sealed row encodings
- [[mu-types]] ← USES — Folded recursive values stay sealed until an explicit unfolding consumer inspects them
- [[neutral-category-completion.session]] ← CLARIFIES — Constructor categories are semantic obligations, not a defaulting convenience

<!-- connections:end -->
