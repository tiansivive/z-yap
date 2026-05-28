---
tags:
- concept
- elaboration
- metavariable
- inference
- unification
- implemented
- normalization
- type-system
- ast
- compiler
- substitution
- dependent
---
# Meta-variables

The internal unknowns of Yap's elaboration. A meta-variable represents a value or type that is not yet determined — it will be solved by unification, constraint solving, or left unsolved (producing an error or a polymorphic binding).

Representation: each meta carries a numeric ID (monotonically allocated via a supply) and a de Bruijn level recording the scope in which it was created. The level is critical for generalization — only metas created at or above the current scope boundary are eligible for generalization into implicit Pis.

Meta-variables appear in both EB.Term (as `Var` with `Meta` kind) and NF.Value (as `Var` with `Meta` kind, often wrapped in `Neutral`). In normal form, an unsolved meta is a neutral term — computation is stuck waiting for a solution.

Solutions live in the zonker (`ctx.zonker`), a substitution map from meta IDs to NF.Values. When a meta is solved (via unification's `bind`), the solution is recorded in the zonker. Subsequent evaluation and quoting chase the zonker to resolve metas, and traversals like `collectMetasNF` skip already-zonked metas.

Metas arise from multiple sources: hole elaboration (user-written `_`), implicit argument insertion (implicit Pi parameters), type inference (unknown function domains), and constraint generation. The elaboration monad threads the meta store and supply through the computation.
