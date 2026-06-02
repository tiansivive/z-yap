# MIR to JS Code Generator

## Approach

Two-phase pipeline: **emit** (MIR -> JS AST) then **print** (JS AST -> string). The JS AST is a small set of types representing JS constructs — no string building in the emitter. Each MIR function becomes a JS function. Block-graph control flow (Jump/Branch) compiles to a **loop + switch** pattern.

## JS AST (`js.ts`)

A minimal set of types covering only what MIR needs:

```ts
type Expr =
  | { type: "Literal"; value: number | boolean | string | null }
  | { type: "Identifier"; name: string }
  | { type: "Binary"; op: string; left: Expr; right: Expr }
  | { type: "Unary"; op: string; arg: Expr }
  | { type: "Call"; callee: Expr; args: Expr[] }
  | { type: "Member"; object: Expr; property: string }
  | { type: "Object"; fields: Array<{ key: string; value: Expr }> }
  | { type: "Spread"; arg: Expr }             // { ...x, k: v }
  | { type: "Assign"; target: string; value: Expr }

type Stmt =
  | { type: "Const"; name: string; value: Expr }
  | { type: "Let"; name: string; value?: Expr }
  | { type: "ExprStmt"; expr: Expr }          // for mutation: into["label"] = value
  | { type: "Return"; value: Expr }
  | { type: "If"; condition: Expr; body: Stmt[] }
  | { type: "Switch"; discriminant: Expr; cases: Array<{ value: Expr; body: Stmt[] }> }
  | { type: "While"; condition: Expr; body: Stmt[] }
  | { type: "Break" }

type Decl =
  | { type: "Function"; name: string; params: string[]; body: Stmt[] }

type Program = { declarations: Decl[]; body: Stmt[] }
```

Plus constructors: `JS.Const(name, expr)`, `JS.Id(name)`, `JS.Lit(42)`, `JS.Call(callee, args)`, etc.

## Emitter (`emit.ts`)

`emit(mod: MIR.Module): JS.Program`

Walks MIR and produces JS AST nodes:

### MIR-to-JS-AST Mappings

- **Expr.Lit** -> `JS.Literal(42)`, `JS.Literal("hello")`, etc.
- **Expr.Var** -> `JS.Identifier(name)`
- **Expr.FuncRef** -> `JS.Identifier(name)` (functions are top-level JS names)
- **Expr.PrimOp** -> `JS.Binary(op, left, right)` or `JS.Unary(op, arg)`
- **Let(name, expr)** -> `JS.Const(name, emitExpr(expr))`
- **Read(label, target, result)** -> `JS.Const(result, JS.Member(JS.Id(target), label))`
- **Alloc({ fields }, result)** -> `JS.Const(result, JS.Object(fields))`
- **Update(immutable)** -> `JS.Const(result, JS.Object([JS.Spread(into), ...newFields]))`
- **Update(fbip)** -> `JS.ExprStmt(JS.Assign(into.label, value))` (mutation)
- **Call(direct)** -> `JS.Const(result, JS.Call(JS.Id(func), args))`
- **Call(indirect)** -> `JS.Const(result, JS.Call(JS.Id(callee), args))`
- **Return(value)** -> `JS.Return(JS.Id(value))`
- **Jump(target, args)** -> assign block params + `JS.Assign("__block", target)` + `JS.Break`
- **Branch(scrutinee, cases)** -> chain of `JS.If(condition, jumpStmts)`

### Single-block Optimization

When a function has exactly one block, emit body statements + return directly (no loop/switch overhead).

### Multi-block: Loop + Switch

For functions with multiple blocks, collect all SSA vars used across blocks, emit `let` declarations at the top, then a `while(true) { switch(__block) { ... } }` with one case per block.

## Printer (`print.ts`)

`print(program: JS.Program): string`

Simple recursive serializer: walks JS AST nodes and produces a raw JS string (no manual indentation needed). The output is then formatted via `js-beautify` (already in deps, used by the old codegen in `src/compile.ts`) for readable output.

## Tests

Tests use `eval()` on the printed output:

```ts
const run = (term: EB.Term) => {
  const mod = lowerToMir(term);
  const program = emit(mod);
  const js = print(program);
  return eval(js);
};
```

## File Structure

```
src/Codegen/v2/
  js.ts           -- JS AST types + constructors
  emit.ts         -- MIR Module -> JS.Program
  print.ts        -- JS.Program -> string
  index.ts        -- barrel
  __tests__/
    emit.test.ts  -- end-to-end tests via eval
```
