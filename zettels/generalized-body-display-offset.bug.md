---
tags:
  - bug
  - display
  - elaboration
  - generalization
  - normalization
  - polymorphism
  - metavariable
  - nbe
  - representation
  - incomplete
status: open
---
# Generalized body display names are off-by-N

When generalization wraps a let-binding's body in N implicit lambda binders, the pretty-printer resolves de Bruijn indices to incorrect variable names — shifted by exactly N positions in the captured environment. Displayed terms are type-incorrect as written, though the underlying de Bruijn representation is correct.

## Example

Source:
```
let compose = \f -> \g -> \x -> f (g x);
let id = \n -> n;
let result = compose id id;
```

After generalization introduces `Π(a b c: Type) =>` on `result`, its body should display as:
```
compose @a @a @a (id @a) (id @a)
```

Actual display:
```
id @a @a @a (result @a) (result @a)
```

Each outer let reference renders as the binding N positions closer to the innermost binder. The offset equals the count of introduced implicit lambdas.

## Affected tests

Let-polymorphism: B combinator, recursive bindings, closure capturing, polymorphic let returning polymorphic function. Also manifests in shift/reset closure display (same mechanism — generalization shifts the de Bruijn depth within the displayed closure body).

## Root cause (hypothesis)

The level-to-name resolution in `EB.Display.Term` (or `NF.display`) uses the closure's stored `ctx.env` to map indices to names. The implicit binders introduced by generalization extend the env at the front, but the display doesn't adjust for the offset when resolving references to bindings that predate the generalization.

## Provenance

Pre-existing on `main`. Snapshots on main already record the incorrect names. Tests pass because the assertions are snapshot-only.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[generalization]] — Generalization-introduced binders shift the display name mapping
- APPLIES_TO → [[pretty-printing]] — Display renders type-incorrect names for outer let references
- MOTIVATES → [[semantic-assertions-with-regression-snapshots]] — Snapshot-only tests hide display bugs as "passing"

**Incoming**
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->
