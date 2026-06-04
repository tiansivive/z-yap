---
tags:
  - verification
  - deprecated
  - ir
  - ivl
  - migration
  - backend
---
# VerificationArtefacts (revised shape)

**Superseded by [[ivl-boundary]]** — the artefact type migration and its design rationale are now captured there.

This zettel originally recorded the type change from Z3-native `Expr` to `IVL.Formula` in `VerificationArtefacts` and `Obligation`. That migration was the first milestone deliverable ([[m1-implementation]]) and the artefact shape is documented in [[ivl-boundary]].

<!-- connections:start -->

## Connections

**Incoming**
- [[verification-backend.thread]] ← INCLUDES
- [[z3-replacement.adr]] ← SUPERSEDES
- [[vc-ir]] ← SUPERSEDES — IVL replaces Z3 Expr-based artefacts
- [[ivl-boundary]] ← SUPERSEDES — Replaces the artefact shape record

<!-- connections:end -->
