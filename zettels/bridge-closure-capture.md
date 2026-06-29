---
tags:
  - implemented
  - bugfix
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - closure
  - ir
  - bridge
  - pattern
refs:
  - thread:pipeline-stabilization
  - code:tiansivive/yap#8
---

# Bridge closure capture

When a curried function returns an inner lambda that references a parameter from an outer scope, the returned value is a **closure** — not a bare function pointer. The GRAM closure pass records each lambda's free-variable set as `:ENV` / `:CAPTURE` metadata on `:CLOSURE` nodes; the bridge translates that metadata into the runtime bundle convention shared with legacy lowering.

**Bundle ABI:** lifted functions take `[env, formal]` parameters; first-class function **values** are records `{ __fn, __env }`. Application reads `__fn` and `__env` off the callee bundle, then performs an indirect call with `[env, arg]`. Curried returns bundle the inner lifted function together with the captured environment at the return site.

**Distinction from PAP:** [[gram-pap-pass]] handles unsaturated **externals** (FFI partial application), a separate track from lexical closure capture on user `:CLOSURE` nodes.

**Relation to closure conversion:** [[closure-conversion]] documents the same bundle ABI on the legacy `lowerToMir` path. The bridge emits captures via the shared bundle primitive rather than extra formals plus a bare `FuncRef`. Lambda lifting ([[lambda-lifting]]) is an orthogonal enrichment and not required for bundle correctness.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[gram-to-mir-bridge]] — Curried return calling convention
- ADDRESSES → [[closures]] — Capture threading for nested closures
- RELIES_ON → [[closure-conversion]] — Shared bundle ABI convention

**Incoming**
- [[explorer-audit.thread]] ← INCLUDES — Thread member
- [[bridge-unsaturated-external]] ← MIRRORS — Sibling bridge closure gap
- [[pipeline-stabilization.thread]] ← INCLUDES — Curried closure capture
- [[gram-to-mir-bridge]] ← RESOLVES — Bridge emits bundle ABI for curried returns

<!-- connections:end -->
