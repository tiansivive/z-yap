---
tags:
- concept
- type-system
- speculative
- exploration
- modality
- effect
- inference
- elaboration
- continuation
- solver
- compiler
- principle
- language
- mechanism
- dependent
refs:
- title: "Coeffects: A Calculus of Context-Dependent Computation"
  authors: Petricek, Orchard, Mycroft
  year: 2014
  url: https://doi.org/10.1145/2628136.2628160
- title: "Coeffects: Unified Static Analysis of Context-Dependence"
  authors: Petricek, Orchard, Mycroft
  year: 2013
  url: https://doi.org/10.1007/978-3-642-40447-4_26
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Implicits as coeffects (exploration)

Speculative exploration: modeling implicit arguments as coeffects — context requirements tracked in the type system alongside effects. This would connect Yap's [[implicit-resolution]] to the modality/effect system being explored for [[shift-reset]] and delimited continuations.

If the type system were grounded in a coeffect calculus, [[implicits]] would be a coeffect ("the context must provide an `Eq a`") rather than the current ad-hoc implicit Pi mechanism. This could give a unified framework for capabilities, configurations, and typeclass dictionaries.

The exploration has two distinct facets: (1) **compiler internals** — could a coeffect model improve how the elaborator and type checker represent implicit requirements, making the compiler architecture cleaner? and (2) **surface language** — should users see coeffect annotations, or should this remain an internal structuring principle?

The guiding instinct is to avoid adding complexity to the user-facing type system. A coeffect foundation could simplify the compiler without surfacing in the language. This connects to the broader question of whether Yap will have an effect system at all, and if so, how it relates to [[shift-reset]] and [[modality-polymorphism]].

See [[petricek-orchard]] for the foundational paper. See [[implicits-as-coeffects]] for the existing design sketch.

Related: [[implicits-as-coeffects]], [[petricek-orchard]], [[implicit-resolution]], [[shift-reset]], [[modality-polymorphism]], [[typeclass-emulation]].
