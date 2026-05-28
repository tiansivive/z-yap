---
tags:
  - open
  - verification
  - elaboration
  - inference
  - compiler
  - explorer
---

# Verification rigid mismatch

The let binding explorer snippet produces "Rigid variables do not match in subtype" during verification.

**Suspected cause:** Generalized variables leak to a scope where they're compared as rigids against concrete types. The module zonker fix ([[module-zonker-fix]]) may resolve this if the mismatch was caused by unsolved/unzonked metas being re-generalized.

**Status:** Open — needs verification after the zonker fix is exercised by the specific snippet.
