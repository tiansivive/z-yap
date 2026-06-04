---
tags:
  - concern
  - graph
  - lowering
  - ir
  - elaboration
  - normalization
  - ast
  - compiler
  - needs-design
---

# GRAM type representation uniformity

GRAM nodes that carry type information currently mix `EB.Term` and `NF.Value` representations. Some nodes receive elaborated terms directly; others receive normalized values from the semantic domain. For type-driven lowering (dispatching on type shape during MIR generation), the bridge needs a uniform type representation across all nodes.

The choice between `EB.Term` and `NF.Value` has trade-offs. `EB.Term` is context-independent (de Bruijn indices), compositional, and quotable — but requires evaluation to inspect structure. `NF.Value` is already reduced and structurally inspectable — but carries closures tied to a specific evaluation context, which can become stale when the surrounding term structure changes (as seen with `Ann` node annotations).

The `Ann` fix (switching from `NF.Value` to `EB.Term`) demonstrates one resolution: store quoted terms and let consumers evaluate in their own context. Whether this pattern generalizes to all of GRAM's type-carrying nodes is an open question.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[gram]] — Uniform type representation across GRAM nodes
- APPLIES_TO → [[gram-to-mir-bridge]] — Bridge needs consistent type format for type-driven lowering
- MOTIVATES → [[eb-term]] — EB.Term as candidate uniform representation
- MOTIVATES → [[nf-value]] — NF.Value as candidate uniform representation

**Incoming**
- [[fst-closure-annotation]] ← MOTIVATES — Fix demonstrated stale-closure risk of NF.Value in type slots

<!-- connections:end -->
