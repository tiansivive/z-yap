---
tags:
  - verification
  - decision
  - mechanism
  - sat
  - quantifiers
  - solver
  - implemented
  - backend
---
# Complementary atom encoding in quantifier lemmas

**Decision:** When the quantifier engine instantiates a lemma requiring a literal whose atom isn't directly in the atom table, `encodeLemma` looks up the complementary atom and negates its literal rather than failing.

## Context

Quantifier instantiation via E-matching produces ground lemmas. For example, `∀x. f(x) ≠ 1` instantiated with `a` yields the clause `f(a) ≠ 1`. The SAT core works with literals, which are signed references to atoms. If only `f(a) = 1` is in the atom table (but not `f(a) ≠ 1`), the engine must find the complementary atom `f(a) = 1` and use its negated literal.

## Rationale

The atom table is populated from the original formula's CNF encoding, which may not contain every atom form that quantifier instantiation can produce. Rather than eagerly registering all possible atom variants (infeasible for arbitrary instantiations), the lemma encoder resolves complements lazily.

This is a robustness measure: without it, quantifier instantiation silently fails to encode valid lemmas whenever the exact atom form is absent, leading to incompleteness — the solver reports SAT for formulas that are actually unsatisfiable under the quantified constraints.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[theory-plugin-interface]] — Lemma encoding rule
- DETAILS → [[m2-implementation]] — Extracted from M2 record
- APPLIES_TO → [[quantifier-engine]] — Specific to quantifiers

**Incoming**
- [[verification-backend.thread]] ← INCLUDES

<!-- connections:end -->
