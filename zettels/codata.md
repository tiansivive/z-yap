---
tags:
- concept
- type-system
- recursion
- speculative
- exploration
- row-types
- pattern
- normalization
- principle
- language
- elaboration
- syntax
- dependent
- evaluation
refs:
- title: "Copatterns: Programming Infinite Structures by Observations"
  authors: Abel, Pientka, Thibodeau, Setzer
  year: 2013
  url: https://doi.org/10.1145/2480359.2462233
- title: "Unnesting of Copatterns"
  authors: Setzer, Abel, Pientka, Thibodeau
  year: 2014
  url: https://doi.org/10.1007/978-3-319-08918-8_3
---
# Codata

Data defined by its eliminators (observations/destructors) rather than its constructors. A stream is codata: observed via head and tail, not built from base cases. Contrast with algebraic data types defined by constructors.

Copatterns are the natural elimination form for codata: defining functions on codata by specifying what each observation returns, rather than pattern matching on constructors. This inverts the usual pattern-matching paradigm — where patterns deconstruct data, copatterns construct observations.

For Yap, codata connects to the structural record story — [[structural-records]] are already defined by their projections (observations). A coinductive record whose fields can reference `self` is codata. The question is whether [[nu-types]] plus structural records already capture codata semantics, or whether copatterns add something that records-as-observations miss.

The interaction with [[row-polymorphism]] is worth exploring: if codata is defined by a row of observations, then extending a codata type with new observations is row extension. This could unify codata extensibility with Yap's existing row machinery.

Related: [[coinductivity]], [[nu-types]], [[structural-records]], [[projection]].
