---
tags:
- concept
- type-system
- recursion
- dependent
- exploration
- speculative
- reference
- paper
- normalization
- elaboration
- verification
- mechanism
- needs-design
- inference
- language
- evaluation
refs:
- title: "MiniAgda: Integrating Sized and Dependent Types"
  authors: Abel
  year: 2010
  url: https://doi.org/10.4204/EPTCS.43.2
- title: "Proving the Correctness of Reactive Systems Using Sized Types"
  authors: Hughes, Pareto, Sabry
  year: 1996
  url: https://doi.org/10.1145/237721.240882
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Sized types

Type-level natural number annotations tracking the "size" of recursive data, enabling [[termination-checking]] and [[productivity-checking]] without [[syntactic-guardedness]]. `List {i} a` means a list of depth at most `i`; recursive calls must decrease the size index.

Connects naturally to Yap's [[dependent-types]] — size indices are just dependent type parameters. The infrastructure for dependent functions and [[nbe]]-based evaluation already exists. The addition would be a checker that verifies size decrease across recursive calls.

Alternative to [[syntactic-guardedness]]. Sized types are more expressive (can express mutual recursion, nested recursion, higher-order recursion) but more complex (size inference, size polymorphism, interaction with other type features).

The interaction with [[equirecursive-types]] is worth noting: sized types give a way to bound the unfolding depth of recursive types, which connects to the step-budget approach already in place. A sized type system would replace the engineering guard (`maxSteps`) with a type-level guarantee.

Related: [[termination-checking]], [[productivity-checking]], [[syntactic-guardedness]], [[dependent-types]], [[equirecursive-types]], [[nu-types]], [[inductive-types]].
