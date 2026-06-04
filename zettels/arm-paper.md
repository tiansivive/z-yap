---
tags:
  - paper
  - reference
  - research
  - verification
  - continuation
  - effect
  - type-system
  - quantifiers
  - dependent
  - language
---
# ARM: Answer Refinement Modification

Sekiyama, Tsukada, Igarashi. "Answer Refinement Modification: Refinement Type System for Algebraic Effects and Handlers." Proc. ACM Program. Lang. 8(POPL), 2024.

Introduces ARM: a refinement type system that tracks how effect handlers modify the **refinement predicates** on answer types through delimited continuations — extending classical Answer Type Modification (ATM) from the type level to the refinement level.

Key contributions:
- Bidirectional refinement type system for algebraic effects and handlers (OCaml 5 subset)
- Type-preserving CPS transformation as an alternative verification path
- Reduction to Constrained Horn Clauses (CHC) solving for automated verification
- Soundness proof for the refinement-level answer modification

Relevance to Yap: Yap already implements ATM via `answer.initial` / `answer.final` in the elaboration delimitation stack. ARM extends this to the verification dimension — a natural reference for [[shift-reset-verification]] when symbolic/open shifts need refinement-level answer tracking. The `∀bubble. P(bubble) → φ(bubble)` formula shape in Yap's proposed verification is the local analog of ARM's answer refinement tracking.

DOI: [10.1145/3632855](https://doi.org/10.1145/3632855)

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[shift-reset-verification]] — ARM = symbolic answer refinement tracking
- EXTENDS → [[danvy-filinski]] — Refinement dimension of ATM
- INFORMS → [[open-shift-verification]] — Theoretical foundation for symbolic mode
- INFORMS → [[answer-type-polymorphism]] — Extends ATM to refinement level

**Incoming**
- [[sekiyama-unno-temporal]] ← INFORMS — Prior work by same first author
- [[session-bubble-verification-design]] ← PRODUCES

<!-- connections:end -->
