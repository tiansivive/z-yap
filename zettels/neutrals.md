---
tags: [mechanism, concept, normalization, type-system]
---
# Neutral Terms

Neutral terms in NbE represent computations stuck on an unknown head:

- **Free variable** — no value available in the environment
- **Unsolved [[meta-variables|meta]]** — meta-variable not yet resolved by [[unification]]
- **Blocked elimination** — projection, application, or match applied to a neutral head

Stuckness propagates upward: if the head of a spine is neutral, the entire application spine is neutral. A match on a neutral scrutinee is neutral. A projection from a neutral record is neutral.

Neutrals preserve open-term structure during normalization without losing information. They are essential for comparing types that contain free variables — without neutrals, normalization would get stuck or discard information.

In Yap: `NF.Value` has a `Neutral` variant carrying a `Head` (variable or meta) and a `Spine` (list of eliminations).
