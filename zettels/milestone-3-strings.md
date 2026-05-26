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

**Current state:** Milestone 3 **not** landed — no dedicated string **theory plugin** in **`src/verification/solver/`**. String-like values still go through **`translate.ts`** as coarse / uninterpreted-style IVL atoms (the **Z3-direct** era used `Z3.Sort.declare("String")` for the same idea; see [[smt-translation]]). Full primitive lowering and **`theories/strings`** remain open.

Depends on Milestone 2 arithmetic/EUF interplay for length bridges.
