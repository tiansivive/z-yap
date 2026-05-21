---
tags:
  - paper
  - reference
  - research
  - verification
  - continuation
  - effect
  - type-system
---
# Temporal Verification with Answer-Effect Modification

Sekiyama & Unno. "Temporal Verification with Answer-Effect Modification: Dependent Temporal Effects and Its Logical Foundation via Categorical Semantics." Proc. ACM Program. Lang. 7(POPL), 2023.

Extends a temporal effect system for shift0/reset0 with **answer-effect modification** — tracking how delimited control operators modify not just answer types but the temporal effects of continuations. Proves soundness for both finite and infinite event sequences.

Prior work to the ARM paper by the same first author. The temporal dimension (event sequences, liveness properties) is not directly needed for Yap's current verification goals, but the answer-effect modification framework influenced the refinement-level generalization in ARM.

DOI: [10.1145/3571257](https://doi.org/10.1145/3571257)
