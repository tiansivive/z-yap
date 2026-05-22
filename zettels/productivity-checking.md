---
tags:
- concept
- type-system
- recursion
- exploration
- speculative
- reference
- paper
- normalization
- elaboration
- verification
- mechanism
- needs-design
- language
- evaluation
- dependent
refs:
- title: "MiniAgda: Integrating Sized and Dependent Types"
  authors: Abel
  year: 2010
  url: https://doi.org/10.4204/EPTCS.43.2
- title: "Beating the Productivity Checker Using Embedded Languages"
  authors: Danielsson
  year: 2010
  url: https://doi.org/10.1145/1863543.1863547
- title: "Productive Coprogramming with Guarded Recursion"
  authors: Atkey, McBride
  year: 2013
  url: https://doi.org/10.1145/2544174.2500597
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Productivity checking

Dual of [[termination-checking]] for coinductive definitions: a corecursive definition is productive if it always produces the next observation in finite time. Where termination says "this function always returns," productivity says "this stream always has a next element."

Relevant if [[nu-types]] are added — without productivity checking, coinductive definitions can silently diverge (produce a value that never yields its next observation). Yap's current step-budget guard in `NF.evaluate` catches non-termination at runtime but provides no static guarantee.

Two main approaches: [[syntactic-guardedness]] (Coq-style — corecursive calls must appear under a constructor) and [[sized-types]] (type-level size annotations that decrease). Each has trade-offs in expressiveness and usability. A third option is guarded recursion with modalities (Atkey & McBride 2013), which uses a type-level "later" modality to enforce productivity.

Related: [[termination-checking]], [[nu-types]], [[coinductivity]], [[sized-types]], [[syntactic-guardedness]], [[equirecursive-types]].
