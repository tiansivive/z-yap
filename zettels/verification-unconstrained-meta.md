---
tags:
  - open
  - bug
  - verification
  - elaboration
  - inference
  - compiler
  - explorer
---

# Verification unconstrained meta

The variant match explorer snippet (`\x -> match x | #nil a -> 0 | #cons {el, rest} -> 1`) crashes at `NF.generalize` — `ctx.metas[?15]` is undefined. Even bypassing generalize, multiple unsolved metas (`?3`, `?6`, `?8`, `?9`) remain outside the zonker and trigger "Unconstrained meta variable in verification" in `translate.ts`.

**Not resolved by** [[module-zonker-fix]] — `toldZonker` is empty for this snippet (no let-generalization path). The issue is deeper: metas created during variant row constraint solving don't propagate back into `ctx.metas` or the final zonker.

**Status:** Open — requires investigation into meta propagation during variant/row elaboration and unification.
