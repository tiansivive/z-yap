---
tags:
  [
    paper,
    reference,
    research,
    verification,
    type-system,
    dependent,
    inference,
  ]
---
# Ou et al. — Dynamic Typing with Dependent Types (2004)

**Citation:** Xinming Ou, Gang Tan, Yitzhak Mandelbaum, David Walker. *Dynamic Typing with Dependent Types.* IFIP TCS, 2004.

Introduces the term "[[selfification]]" for refinement types: strengthening a variable's type with a singleton refinement equating the value to itself (`x : { v : T | v = x }`). This enables path-sensitive occurrence typing — control-flow guards refine variable types through self-equality rather than substitution.

The concept was subsequently formalized as T-Var in [[knowles-flanagan-2010]] and mechanized in [[vazou-mechanizing-refinement-types-2024]], both of which restrict selfification to first-order types.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[selfification]] — Coined the term
- INFORMS → [[knowles-flanagan-2010]] — Original selfification idea

<!-- connections:end -->
