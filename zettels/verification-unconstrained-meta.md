---
tags:
  - open
  - verification
  - elaboration
  - inference
  - compiler
  - explorer
---

# Verification unconstrained meta

The variant match explorer snippet produces "Unconstrained meta variable in verification" during VC translation or solver validation.

**Suspected cause:** A meta created during elaboration (possibly from variant type inference) survives zonking and reaches the IVL translation. The module zonker fix ([[module-zonker-fix]]) may resolve this if the meta was in the told-but-dropped zonker.

**Status:** Open — needs verification after the zonker fix is exercised by the specific snippet.
