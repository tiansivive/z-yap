---
tags:
- normalization
- ir
- ast
- implemented
- elaboration
- inference
- verification
- ffi
- modality
- dependent
- row-types
- syntax
- reference
- code
---
# `NF.Value` (Normal Form AST)

Defined in `src/elaboration/normalization/syntax/term.ts` as **`Types.Brand<…> & { id: number }`**; `mk` assigns monotonic `id` via module `currentId`.

**`Constructor` discriminated sum (semantic / normal-form layer):**

- `Var`, `Lit`, `App`, `Row`, `Abs` (carries `binder: NF.Binder` + `closure: NF.Closure`)
- `Neutral` (wraps another `Value`)
- `Modal` (`Modal.Annotations<Value>`)
- `External` (`name`, `arity`, `compute`, partial `args`)
- `Existential` — comment: **verification only**

**`NF.Closure`:** `Closure` | `PrimOp` | `Continuation` (fields per type).

**Helpers / views in same file:** `Constructors.Rigid`, `Flex`, `StuckMatch`, neutral `Struct`/`Schema`/`Variant`/`Array` as `Neutral(App(Lit Atom, Row))`, `Type` / `Any` sentinels, `Patterns.*` for `ts-pattern`.

`closeVal` is `quoting.ts` (`type: "Closure"` + quoted body).

See also: [[neutrals.md]], [[closures.md]], [[application-evaluation.md]], [[nbe.md]], [[de-bruijn-levels.md]].
