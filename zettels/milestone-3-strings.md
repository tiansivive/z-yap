---
tags:
  [
    verification,
    milestone,
    planned,
    strings,
    reference,
    sat,
    arithmetic,
    backend,
    compiler,
    mechanism,
    normalization,
    testing,
    project,
    drift,
    modality,
    tooling,
  ]
---
# Milestone 3: String theory

**Goal:** dedicated string theory plugin (concat, length, prefix, suffix, contains).

**Deliverables:** concat normal forms, length coupling to arithmetic, prefix/suffix/contains reductions, witness generation for containment-like constraints; IVL `StrConcat` / `StrLen` wired through translation and a `theories/strings/` (or equivalent) solver module.

**Current state:** strings use an uninterpreted Z3 sort in `translate.ts` on main; in-house string reasoning and full primitive lowering remain open.

Depends on Milestone 2 arithmetic/EUF interplay for length bridges.
