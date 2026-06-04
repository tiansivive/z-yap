---
tags:
  [
    paper,
    reference,
    research,
    verification,
    type-system,
    dependent,
    sat,
    quantifiers,
    normalization,
  ]
---
# Vazou et al. — Refinement Reflection (2018)

**Citation:** Niki Vazou, Anish Tondwalkar, Vikraman Choudhury, Ryan G. Scott, Ryan R. Newton, Philip Wadler, Ranjit Jhala. *Refinement Reflection: Complete Verification with SMT.* Proc. ACM Program. Lang. 2(POPL), 2018.
**DOI:** [10.1145/3158141](https://doi.org/10.1145/3158141)

Reflects user-defined function definitions into output refinement types, enabling equational proofs about recursive functions while keeping VCs SMT-decidable. Key ideas:

- **Uninterpreted function symbols**: reflected functions are declared as uninterpreted in the logic; only congruence holds by default.
- **Guard normal form + PLE (Proof by Logical Evaluation)**: automated equational reasoning by iteratively unfolding enabled guards.
- **`Fun` sort**: lambda values get an uninterpreted `Fun s1 s2` sort in the logic — distinct from the arrow sort `s1 → s2` used for reflected function signatures. This is _not_ [[selfification]] — it handles reflected definitions, not variable strengthening.
- **T-Exact rule**: generalizes [[selfification]] from Knowles & Flanagan to reflected functions, strengthening output types with `v = f x ∧ def(f, x)`.

Yap does not currently implement refinement reflection, but the sort distinction (`Type` vs `Fn` in IVL) and the [[first-order-restriction.adr]] on selfification follow the same design.

<!-- connections:start -->

## Connections

**Outgoing**
- GENERALIZES → [[selfification]] — T-Exact generalizes T-Var to reflected definitions
- INFORMS → [[liquid-haskell-influence]] — Core LH paper

<!-- connections:end -->
