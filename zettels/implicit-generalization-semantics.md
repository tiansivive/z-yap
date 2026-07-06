---
tags:
  - decision
  - type-system
  - inference
  - generalization
  - elaboration
  - polymorphism
  - language
  - compiler
---

# Implicit generalization semantics

When an implicit binder is unconstrained (e.g. `\x =>` where `x` is unused in the body), inference creates a meta for `x`'s type that nothing unifies against. Generalization abstracts over it, producing `Π(a: Type) => Π(x: a) => ...` rather than the simpler `Π(x: Type) => ...`.

**Decision:** Keep current behavior. Yap implicits are not restricted to type parameters — `using` supports numeric, record, and other value-level implicits. Defaulting unconstrained implicits to `Type` would be a heuristic inconsistent with the language design.

**Consequence:** Unconstrained implicits produce dependent annotation chains (one implicit's annotation references a prior implicit binder). This is what exposed the `wrapLambda` bug — the combination of `Rigid(0)` and unextended context was invisible when annotations were constants but crashed with variable annotations.

**Trade-offs:**

- *Current (generalize)*: Principled, consistent with let-polymorphism, maximally polymorphic. Produces verbose types for trivial unused implicits.
- *Default to Type*: Practical for the common case, simpler inferred types. Breaks when implicits are not types (numeric precision, config records).

Common cases like `\x -> \y -> x` still work — both implicits get annotation `Type` (a constant), so `wrapLambda` never exercises the dependent path.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[implicits]] — Unconstrained implicits generalize
- INFORMS → [[let-polymorphism]] — Consistent with let-generalization

**Incoming**
- [[explorer-audit.thread]] ← DOCUMENTS — Decision from audit
- [[wraplambda-fix]] ← REVEALS — Bug only triggers with dependent annotations
- [[letpoly-implicit-escape]] ← RELIES_ON — Implicit wrapping decision
- [[fst-closure-annotation]] ← RELIES_ON — Implicit parameter ordering
- [[instantiate-any-default]] ← EXTENDS — Same generalize-not-default principle, now at the kind level

<!-- connections:end -->
