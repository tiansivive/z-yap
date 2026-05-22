---
tags:
- type-system
- dependent
- concept
- syntax
- implemented
- elaboration
- inference
- parser
- modality
- ast
- quantifiers
- checking
- normalization
- sugar
- display
- testing
---
# Pi types

**AST:** Dependent Π is a single elaboration node: `Abs` with `binding.type === "Pi"` (`src/elaboration/syntax/term.ts`). Builder `EB.Constructors.Pi(variable, icit, annotation, body)`. NF counterpart `NF.Patterns.Pi` / `NF.Constructors.Pi` (`src/elaboration/normalization/syntax/term.ts`).

**Surface syntax:** Nearley builds `Src.Term` nodes `{ type: "pi", variable, annotation, body, icit }` or `{ type: "arrow", lhs, rhs, icit }` from `Pi` / `PiTail` (`src/parser/processors.ts`, `src/parser/grammar.ne`). The domain side is a `ModalType`, so modalities/quantities attach to the domain **type** via the modal grammar, not as a separate Pi-only token.

**Inference:** `src/elaboration/inference/pi.ts` checks `annotation` against `NF.Type`, evaluates it, extends context with `{ type: "Pi", variable }`, checks `body` at `NF.Type`, returns type `NF.Type`.

**Checking:** `src/elaboration/check.ts` pairs surface `lambda` with `NF.Patterns.Pi` (matching `icit`), checks the body under `NF.apply` of the Pi closure to a fresh rigid.

**Unification:** Pi–Pi case in `src/elaboration/unification/unification.ts` unifies annotations, then bodies under extended level (same pattern as Lambda–Lambda).

**NbE:** quote applies Pi to a fresh rigid (`src/elaboration/normalization/`); evaluation builds closures for `Abs` (`src/elaboration/normalization/evaluation.v2.ts`).

**Lowering:** `src/lowering/lower.ts` dispatches runtime `Lambda`, not Pi; type-level `Abs` is not in the lowering match (non-lambda `Abs` would fall through to `notImplemented` if reached—erased programs should not ship raw Π to MIR).

Related: [[sigma-types.md]] (existential packaging of rows), [[type-type.md]], [[modalities.md]].
