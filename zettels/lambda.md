---
tags:
- concept
- syntax
- elaboration
- dependent
- inference
- implemented
- parser
- ast
- normalization
- lowering
- closure
---
# Lambda

The introduction form for functions — `\x -> body` (explicit) and `\x => body` (implicit). Multi-parameter lambdas desugar to nested single-binder lambdas during parsing. Parameters may carry optional type annotations; unannotated parameters get a fresh type meta during inference.

Lambda shares the `Abs` node with Pi, Sigma, Mu, and Let, discriminated by `binding.type === "Lambda"`. It is the runtime-surviving counterpart of Pi — Pi is the formation rule (the type), Lambda is the introduction (the value). Application is the elimination form.

Inference of a lambda produces both the core term (`EB.Constructors.Lambda`) and a Pi type: the domain comes from the annotation (or a fresh meta), the codomain is closed over with `NF.closeVal`. Implicit insertion (`EB.Icit.insert.gen`) runs on the body result so that implicitly-typed return values get their implicit Pis.

Explicit vs implicit icitness matters at the checking boundary: a surface lambda only checks against a Pi type when their icit markers agree. Mismatched icitness falls through to the general infer-then-assign path.

At lowering, lambda is the only binder that produces runtime code — closure conversion lifts lambda bodies to MIR functions with captured environments.
