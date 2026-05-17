---
tags:
- research
- reference
- dependent
- elaboration
- unification
- inference
- solver
- metavariable
- language
- implemented
---
# Idris 2 (Influence)

[Idris 2](https://www.idris-lang.org/) · [idris-lang/Idris2](https://github.com/idris-lang/Idris2). Dependent core (**TT**), metavariable-heavy elaboration, QTT quantities.

**Verified in-repo:** `src/elaboration/solver/solver.ts` (implicit lookup) states that rejecting an implicit candidate when unification returns a **non-empty substitution** “aligns with how Idris2 and Lean handle implicit resolution”—concrete attribution for one resolution policy.

Broader overlap (bidirectional checking, postponed metavariables) matches **common** Idris-style practice but is not labeled “Idris” file-by-file outside that comment.
