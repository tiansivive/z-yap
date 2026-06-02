# MIR Interpreter

## Approach

A single file `src/lowering/interpret.ts` that walks the block graph. The interpreter is a simple loop: execute instructions in the current block, then follow the terminator to the next block (or return).

## Runtime Values

MIR values map to JS values:

- `Lit(Num n)` -> `number`
- `Lit(Bool b)` -> `boolean`
- `Lit(String s)` -> `string`
- `Lit(unit)` -> `"unit"`
- `Lit(Atom s)` -> `string` (the atom name)
- `Alloc { fields }` -> `Record<string, Value>` (plain JS object)
- `FuncRef(name)` -> a tagged object `{ __funcref: name }` so we can distinguish it from a string

## Core State

```ts
type Value = number | boolean | string | Record<string, Value> | { __funcref: string };

type State = {
  env: Map<string, Value>;        // SSA bindings for current function
  functions: Map<string, Function>; // all functions by name
  ffi: Map<string, Function>;      // foreign function implementations
};
```

## Expression Evaluation

A single `evalExpr(env, expr)` function handles all four `Expr` variants:

- `Var(x)` -> `env.get(x)`
- `Lit(v)` -> unwrap the literal (`Num(42)` -> `42`, `Bool(true)` -> `true`, `String(s)` -> `s`, `unit` -> `"unit"`, `Atom(s)` -> `s`)
- `FuncRef(f)` -> `{ __funcref: f }`
- `PrimOp(op, args)` -> look up arg values from env, apply the primop

## Instruction Execution

Each instruction uses `evalExpr` or reads/writes the env:

- **Let(name, expr)** -> `env.set(name, evalExpr(env, expr))`
- **Read(label, target, result)** -> `env.set(result, env.get(target)[label])`
- **Alloc({ fields }, result)** -> build a JS object from field values in env, bind to result
- **Update(immutable, into, result, alloc)** -> spread `env.get(into)` + new fields into a new object
- **Update(fbip, into, updates)** -> mutate `env.get(into)` in place
- **Call(direct, func, args, result)** -> look up in FFI table, call it, bind result
- **Call(indirect, callee, args, result)** -> callee is a `{ __funcref }`, look up function, execute it, bind result

## Block Execution Loop

A function's blocks are indexed by label into a `Map<Label, Block>`. The core loop:

```ts
function execFunction(fn: Function, args: Value[], ctx: InterpreterCtx): Value {
  const blocks = new Map(fn.blocks.map(b => [b.label, b]));
  const env = new Map<string, Value>();

  // bind function params to args
  fn.params.forEach((p, i) => env.set(p, args[i]));

  // start at the entry block
  let current = blocks.get(fn.entry)!;

  while (true) {
    // 1. execute all instructions sequentially
    for (const instr of current.instrs) execInstr(env, instr, ctx);

    // 2. execute terminator
    const term = current.terminator;
    match(term)
      .with({ type: "Return" }, ...) // return env.get(value) out of the loop
      .with({ type: "Jump" }, ...)   // resolve next block, bind params, continue
      .with({ type: "Branch" }, ...) // resolve matching case, bind params, continue
  }
}
```

Key detail: `Jump` and `Branch` both resolve to "go to block X with args Y". The mechanic is the same — look up the block by label, bind block params to arg values, set `current = thatBlock`, and continue the while loop. No recursion, no call stack — it's a flat loop that walks the CFG.

### Jump

```
Jump(target, args)
```

1. Look up `target` in the blocks map
2. Resolve each arg: `args.map(a => env.get(a))`
3. Bind the target block's `params` to those values: `block.params.forEach((p, i) => env.set(p, resolvedArgs[i]))`
4. Set `current = block`, continue the loop

### Branch

```
Branch(scrutinee, cases, default?)
```

1. Get scrutinee value: `env.get(scrutinee)`
2. Find matching case: `cases.find(c => c.value === String(scrutineeValue))`
   - Case values in MIR are strings (tag names like `"Some"`, or stringified literals like `"42"`)
   - The scrutinee is a runtime value (number, string, boolean) — coerce to string for comparison
3. If found: jump to `case.target` with `case.args` (same mechanic as Jump)
4. If not found and `default` exists: jump to `default.target` with `default.args`
5. If not found and no default: runtime error (non-exhaustive match — should not happen if lowering is correct)

### Why this works for shift/reset

Shift/reset is already compiled into this block graph by the lowering pass. The `entry` block jumps to `s0`, `s0` jumps to `r0` with args, `r0` branches on the index to `s1`/`s2`/etc. The interpreter doesn't know about continuations at all — it just follows jumps and branches. The env records (`Alloc`, `Read`, `Update`) carry the captured state through block params.

## Function Calls

When a `Call` instruction executes:

**Direct call** (`Call(direct, name, args, result)`):
1. Look up `name` in the FFI table
2. Resolve args: `args.map(a => env.get(a))`
3. Call the JS function: `ffi.get(name)(...resolvedArgs)`
4. Bind: `env.set(result, returnValue)`

**Indirect call** (`Call(indirect, callee, args, result)`):
1. `env.get(callee)` is a `{ __funcref: name }` (the `__fn` field already Read from the closure)
2. Look up the function by name in `ctx.functions`
3. Resolve args (the caller already Read `__env` and passes `[envValue, ...actualArgs]`)
4. Recursively call `execFunction(fn, resolvedArgs, ctx)` — this creates a fresh env for the callee
5. Bind: `env.set(result, returnValue)`

The JS call stack mirrors the MIR call stack. Within a single function, control flow is a flat loop (no recursion). Cross-function calls are recursive.

## PrimOp Table

A simple switch on the op name, using the existing `ARITIES` table from `src/lowering/shared/primops.ts` as reference:

- `$add` -> `a + b`, `$sub` -> `a - b`, `$mul` -> `a * b`, `$div` -> `a / b`
- `$and` -> `a && b`, `$or` -> `a || b`, `$not` -> `!a`
- `$eq` -> `a === b`, `$neq` -> `a !== b`
- `$lt` -> `a < b`, `$gt` -> `a > b`, `$lte` -> `a <= b`, `$gte` -> `a >= b`
- `$mod` -> `a % b`, `$concat` -> `a + b` (string)

## FFI

The `interpret` function accepts an optional `ffi: Record<string, (...args: any[]) => any>` parameter. Direct calls check the FFI table first. This lets tests (and eventually the runtime) plug in `print`, `write`, etc.

## API

```ts
export function interpret(
  mod: Module,
  ffi?: Record<string, (...args: any[]) => any>
): Value
```

Finds the `main` function in `mod.functions`, runs it with no arguments, returns the result.

## Test File

A new file `src/lowering/__tests__/interpret.test.ts` that mirrors the structure of `lower.test.ts` but asserts on **values** instead of snapshots:

- `Lit(42)` -> `expect(run(term)).toBe(42)`
- `add(1, 2)` -> `expect(run(term)).toBe(3)`
- `(λx.x) 42` -> `expect(run(term)).toBe(42)`
- `struct({ x: 1, y: 2 })` -> `expect(run(term)).toEqual({ x: 1, y: 2 })`
- `proj("x", struct)` -> `expect(run(term)).toBe(42)`
- Match cases -> assert correct branch taken
- `reset(shift k -> k 42)` -> `expect(run(term)).toBe(42)`
- `reset(shift k -> (k 1) + (k 2))` -> multishot result
- FFI: `print("hello")` with a mock -> assert mock was called

The helper `run(term)` = `interpret(lowerToMir(term))`.

## File Changes

- **New**: `src/lowering/interpret.ts` — the interpreter (~150-200 lines)
- **New**: `src/lowering/__tests__/interpret.test.ts` — end-to-end tests
- **Edit**: `src/lowering/index.ts` — re-export `interpret`
