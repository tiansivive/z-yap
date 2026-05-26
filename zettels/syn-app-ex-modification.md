---
tags:
  [
    verification,
    type-system,
    mechanism,
    decision,
    dependent,
    inference,
    checking,
    implemented,
    modality,
    concept,
    sat,
    ivl,
  ]
refs:
  - "[[knowles-flanagan-2010]]"
---
# Syn-App-Ex modification

The standard Syn-App-Ex rule ([[knowles-flanagan-2010]], Jhala & Vazou) prescribes synthesizing both function and argument independently, then using subtyping to verify compatibility. This works when all terms are intrinsic (self-typing).

Yap's verification operates post-elaboration, where some terms are extrinsic — they require [[bidirectional-checking]] context to type. A `match` expression like `match b | true -> Num | false -> String` cannot be synthesized without surrounding context: is the codomain `Num | String`, `Type`, or something else? During elaboration, unification constraints resolve this ambiguity. But the elaborated term itself may lack the information needed for standalone synthesis.

The `incorporate` function in `src/verification/V2/synth.ts` modifies Syn-App-Ex by using `check` instead of `synth` for arguments. Checking leverages the Pi binder's annotation as the expected type, properly handling extrinsic terms. When `check` synthesizes a more precise type (e.g., with [[selfification]] refinements), it returns it via the optional `nf` field. `incorporate` uses `nf` when available, falling back to the Pi binder's annotation otherwise. This propagates subtype precision through application chains.

The `incorporate` function also handles existential unpacking: when the function type is `Existential`, it recurses through the existential binder before reaching the underlying Pi. The result is re-wrapped in `Exists` to preserve the quantified variable for downstream VC generation.
