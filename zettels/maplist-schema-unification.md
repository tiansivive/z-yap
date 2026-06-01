---
tags:
  - bug
  - bugfix
  - implemented
  - elaboration
  - checking
  - normalization
  - quoting
  - de-bruijn
  - pattern
  - row-types
  - recursion
---

# mapList Schema unification failure

Recursive `mapList` over `List a` fails to elaborate with "Cannot unify L2 with L6" when the match is checked against a polymorphic return type containing a type variable.

Root cause: `check.ts` quotes the expected return type to `EB.Term` at the pre-pattern-binder de Bruijn level, then re-evaluates it inside each match branch after pattern binders have extended the context. De Bruijn indices in the quoted term are relative to the shorter env, so they resolve to wrong entries in the extended env. Concretely, if `b` is at index 2 before pattern binders and the variant pattern introduces 4 binders (two struct fields + two row variables), `b` shifts to index 6 but the quoted term still reads index 2 — resolving to `xs` (Rigid level 6) instead of `b` (Rigid level 2).

The quote-evaluate round-trip exists to support dependent match return types (scrutinee narrowing), where the return type references the scrutinee and must be re-evaluated in a context where the scrutinee's type has been refined per branch. The fix moves the quoting inside the branch body, after pattern binders have been added, so the de Bruijn indices align with the extended context. Dependent matching (e.g. `match x | 0 -> Num | _ -> String`) continues to work because the round-trip itself is preserved — only its position in the pipeline changes.

The bug triggers when a match is checked (not inferred) against a type containing a type variable, and the pattern introduces binders. Inferred matches and matches against constant return types (e.g. `Num`) are unaffected.

Introduced in commit `5aa4638` (Dec 2025) when the general match-check-with-narrowing path was added. No pre-existing test covered the specific combination of checked match + polymorphic return type + destructuring pattern.
