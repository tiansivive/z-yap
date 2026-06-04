---
tags:
  [
    elaboration,
    normalization,
    ffi,
    primitive,
    arithmetic,
    strings,
    runtime,
    lowering,
    mir,
    type-system,
    unification,
    project,
    implemented,
  ]
---
# Primitive Signature

**Runtime δ / host bridge:** `PrimOps` in `src/shared/lib/primitives.ts` maps kernel names (`$add` … `$concat`, `$not`) to `{ arity, compute }` operating on `NF.Value`. Default `EB.Context.ffi` points at this map (`src/shared/lib/constants.ts` imports `Lib.PrimOps`).

**Surface bindings:** `Terms()` exposes the same symbols as `EB.Var` `Foreign` for operators (`+` → `$add`, string `++` / `<>` → `$concat`, etc.). `Elaborated()` extends `imports` with typed schemes and optional liquid reflections for numeric/bool ops (same file).

**Lowering:** `src/lowering/leaf.ts` aliases free names (e.g. `+`) to primop foreigns; `ARITIES` in `src/shared/lib/primops.ts` must stay aligned with `PrimOps`. `src/Codegen/v2/js/emit.ts` `PRIMOP_JS` lists the MIR op strings backends know.

Extensions require touching `PrimOps`, `ARITIES`, often `Terms`/`Elaborated`, codegen `PRIMOP_JS`, and tests/snapshots across lowering and emitters.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[cbv-evaluation]] — δ-rules on literals
- USES → [[ffi]] — Foreign δ-rules
- ENCODES → [[cbv-evaluation]] — Arithmetic/boolean/comparison as built-in δ-rules

**Incoming**
- [[arithmetic-theory]] ← VALIDATES — Arithmetic operations
- [[string-theory]] ← VALIDATES — String primitives
- [[eq-normalization-bug]] ← APPLIES_TO — $eq is a registered primop

<!-- connections:end -->
