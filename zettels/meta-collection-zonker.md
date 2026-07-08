---
tags:
  - elaboration
  - generalization
  - metavariable
  - unification
  - normalization
  - substitution
  - row-types
  - inference
  - bugfix
  - implemented
refs:
  - thread:pipeline-stabilization
  - thread:elaboration-v2
  - branch:pipeline-bug-squashing
  - session:3c204de9-19e6-4c74-b77d-29fa2465f1f5
---
# Meta collection resolves through the zonker

Generalization collects the free metavariables of a type and term in order to quantify them. A meta the zonker has already solved — including one solved to a bound variable by a nested generalization — is not free and must not be collected. The collector resolves every meta through the zonker before keeping it, in each position a meta can appear: value, term, and row tail alike.

A collector that follows the zonker in some positions but not others re-surfaces an already-solved meta. When an inner `let` generalizes a row-polymorphic binding, its row meta is solved to a bound variable in the shared zonker; if the enclosing generalization reads that meta from a row tail without consulting the zonker, it treats it as free and quantifies it a second time. The symptom is a spurious binder in the outer scope — a unit-returning block whose only binding is an unused row-polymorphic `let` acquiring a `Π(r: Row) =>` over its type.

Zonker-consistency across positions is the invariant: the NF and EB collectors, and every variable case within them, must resolve solved metas identically. Divergence anywhere leaks a generalized meta back into a later generalization.
