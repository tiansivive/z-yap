---
tags: [mechanism, concept, normalization, type-system]
---
# Closures (NbE)

In Yap's Normalization by Evaluation, a closure captures:
- An **environment** (list of NF.Values bound so far)
- An **unevaluated term body** (EB.Term)

To apply a closure: extend the environment with the argument value, then evaluate the body in the extended environment. This avoids substitution — the environment acts as a delayed substitution.

Variants:
- **Lambda closure** — standard function body + env
- **PrimOp closure** — partially applied primitive operator awaiting remaining arguments
- **Continuation closure** — captured delimited continuation (shift/reset)

Closures are the mechanism by which NbE achieves sharing: the same closure applied to different arguments reuses the captured environment.
