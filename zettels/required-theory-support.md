---
tags:
  [verification, concept, incomplete, backend, sat, arithmetic, strings, row-types, quantifiers, reference, milestone, inference, ffi, project, unification, migration, principle, deprecated]
---
# Required theory support

**Superseded by the IVL/CDCL(T) solver stack — see [[z3-replacement-decision]].** Original Z3-era content preserved below for reference.

**Target (design):** `docs/SMT-SOLVER.md` “Required theory support” lists EUF, mixed linear integer/real arithmetic with explicit non-linear operators in IR, guarded quantifiers with instantiation, string primitives (`=`, concat, length, prefix/suffix/contains), and a dedicated row theory aligned with `subtype.contains()`.

**Current Z3-backed implementation:** Arithmetic and equality go to Z3 real/bool APIs (`translate.ts`). Strings and most row/schema shapes are uninterpreted sorts, not dedicated theory solvers in Yap. Row *reasoning* in the verifier is structural (`Row.rewrite`, `contains`); full row literals do not translate. Milestones M2–M4 in the same doc map features to phased delivery; none of the `src/verification/solver/*` modules exist yet.
