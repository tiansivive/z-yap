---
tags:
  - bug
  - bugfix
  - resolved
  - implemented
  - verification
  - ivl
  - refinement
  - liquid
  - label
  - dependent
  - row-types
  - normalization
  - closure
  - pipeline
---
# Nested refinements freeze outer field references as stuck projections

A refinement in a nested record may depend on a field of its enclosing record, as in a derived field constrained by `:point.x / 2`. Its verification obligation must evaluate that dependency against the concrete enclosing record value.

Sigma formation evaluates field dependencies with symbolic row bindings so that a record type remains parametric. A projection from such a binding is therefore a blocked computation: its base is known symbolically, while the field value becomes available only when the enclosing row is instantiated. Encoding that computation as a synthetic lambda application is unsound for this purpose. The lambda captures the symbolic context, so a later verifier context that contains the concrete sibling values cannot resume the projection.

The resolution is an explicit `Blocked(Proj(base, label))` semantic value. The base is the blocker, not an argument hidden in an artificial closure. When a consumer forces the residual under the concrete Sigma scope, projection consults that scope and either yields the field value or remains blocked. The nested liquid predicate consequently evaluates to its arithmetic expression before IVL translation.

Blocked match and injection use the same residual-elimination representation. A blocked match still retains its genuine lexical closure for motive and branches; the change removes only the synthetic closure that had represented the elimination itself. Thus lexical scope remains stable while row-dependent computation resumes in the context that supplies its concrete row values.

This is a termination boundary as well as a scope boundary. Generic forcing does not unwrap a blocked residual into a new application, so it cannot re-enter the same projection or match indefinitely. The residual remains distinct from both a symbolic unknown and a sealed canonical row encoding, preserving guarded Mu-unfolding policy.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[ivl-label-translation]] — Direct labels translate after PR #14; a nested closure can retain an earlier blocked projection
- REVEALS → [[verification-label-scope]] — Boundary scope must reach dependencies captured before the boundary opens
- CONCERNS → [[label-context-trichotomy]] — Ambient sigma scope and captured closure environments diverge
- RELIES_ON → [[sigma-architecture]] — Nested Sigma dependencies are represented by closure capture
- APPLIES_TO → [[refinement-types]] — Liquid predicates over nested record fields
- MOTIVATES → [[neutrals]] — Explicit blocked eliminations distinguish resumable dependencies from symbolic unknowns and sealed row encodings

**Incoming**
- [[verification-backend.thread]] ← INCLUDES — Nested record refinement cannot produce a VC
- [[pipeline-stabilization.thread]] ← INCLUDES — Explorer-visible verification failure with a healthy compiler path
- [[global-pending-queue]] ← INCLUDES — Deferred verification follow-up

<!-- connections:end -->
