---
tags:
- concept
- type-system
- dependent
- recursion
- row-types
- syntax
- language
- exploration
- needs-design
- elaboration
- normalization
- evaluation
---
# Two mechanisms behind field references

The `:label` syntax in Yap records currently serves two roles distinguished by elaboration context:

**Dependent field reference (sigma):** In a type definition `{ fst: Type, snd: :fst }`, `:fst` is a parametric reference to the value `fst` will hold when a concrete struct is checked against this type. The reference is bound in a sigma closure and resolved at application time. Each instantiation may produce a different type for the dependent field. This is the dependent record typing mechanism.

**Self-reference (codata):** In a value `{ width: 10, area: :width * 2 }`, `:width` accesses a concrete value in the same record being constructed. Resolution is immediate — field values are available during elaboration via `ctx.sigma` with fresh metas. The degenerate case is a computed field; the productive case `{ ones: { head: 1, tail: :ones } }` is a coinductive record (a stream).

The sigma mechanism elaborates to a `Σ` binder. The self-reference mechanism has no distinct core representation — it resolves during inference through `inSigmaContext` and produces a plain `Struct`. These are different computational phenomena sharing a surface syntax.

The connection to mutual recursion is significant: flat-row sigma with unordered fields is structurally similar to a block of mutually recursive let-bindings where each binding can refer to any other. Sigma resolves this by deferring (the closure captures the dependency; resolution happens when concrete values are provided). Self-reference resolves it eagerly (all field values are simultaneously in scope). The deferred case is dependent typing; the eager case is a fixed point.

If Yap adopts codata records (via a nu binder or equivalent), the self-reference mechanism gains a principled core representation: `ν self. { width: 10, area: self.width * 2 }`. The `:width` syntax would desugar to `self.width`. This separates the two mechanisms at the core level — sigma for type-level dependency, nu for value-level self-reference — while potentially sharing a surface syntax or using distinct sigils.

The key design tension: a single `:label` syntax is simpler for users but conflates two different computational behaviors. Two distinct sigils make the semantics explicit but add surface complexity. The pragmatic middle ground — `:label` means different things at type level vs value level, which is consistent with how types and values generally behave differently — works but is less principled than distinct core representations.
