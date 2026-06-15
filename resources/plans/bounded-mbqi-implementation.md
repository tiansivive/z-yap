<!-- 01abe7be-90c4-4630-b2fd-0bb60de2a409 -->
---
todos:
  - id: "mbqi-module"
    content: "Create quantifiers/mbqi.ts with MBQI.round, collectGroundTermsBySort, generateSubstitutions"
    status: completed
  - id: "trace-step"
    content: "Add mbqi-round step to trace.ts Step type and render functions"
    status: completed
  - id: "wire-solver"
    content: "Update solver.ts quantifierLoopTrace to call MBQI when E-match returns empty"
    status: completed
  - id: "unit-tests"
    content: "Add MBQI unit tests in quantifier.test.ts - verify snapshots for semantic correctness"
    status: completed
  - id: "integration-tests"
    content: "Check/update integration tests in src/__tests__/integration/refinement-types.test.ts"
    status: completed
  - id: "audit"
    content: "Run yap-reviewer skill to audit implementation against coding guidelines"
    status: completed
  - id: "audit-remediation"
    content: "Fix remaining audit violations: ivl/build.ts (6: mutable simplify export, loops/else, tag if-chains, parseFloat precision question), solver.ts incremental-API push/pop + createBase placement. Done: MBQI-introduced subset; trace.ts fully clean (structure, casts, mutations, magic numbers, header)"
    status: in_progress
isProject: false
---
# Bounded MBQI Implementation

## Background

The IVL solver currently only supports E-matching for quantifier instantiation, which requires function application triggers. Pure arithmetic quantifiers like `forall v. (v = 1 => v > 10)` have no triggers, so E-matching finds nothing and the solver incorrectly returns SAT.

Per [docs/SMT-SOLVER.md](docs/SMT-SOLVER.md) (lines 456-471), the design calls for:

```
quantifierRound():
  ...
  if no instances added:
    run bounded MBQI over ground terms by sort
```

## Algorithm Verification (Standard SMT Techniques)

The proposed implementation follows the standard MBQI approach documented in:

**Primary reference:** Ge and de Moura, *Complete Instantiation for Quantified Formulas in Satisfiability Modulo Theories* (CAV 2009)

**Key principles from the literature:**

1. **Counter-example guided refinement loop** - MBQI iteratively refines a candidate model. When model checking fails, it generates new instantiations from the violating assignment (witness terms).

2. **Ground term enumeration by sort** - Standard technique: collect ground terms from the current problem state, grouped by sort. For arithmetic quantifiers, this includes numeric constants appearing in atoms.

3. **Bounded instantiation** - Z3 and cvc5 both bound instantiation to avoid infinite loops. Our `MAX_MBQI_TERMS` per sort and `MAX_GENERATION` limits follow this pattern.

4. **Fallback hierarchy** - Standard SMT solvers use: E-matching first (syntactic, fast), then MBQI (semantic, more complete). Our design matches: `QuantifierEngine.round` tries E-matching, then `MBQI.round` as fallback.

**Differences from full MBQI:**

- We use bounded enumeration over existing ground terms rather than constructing new witness terms from the arithmetic model
- This is acceptable per the design doc: "VCs are generated from local program structure, not arbitrary user-written SMT formulas"
- For Yap's refinement VCs, the relevant constants (like `1` in `v = 1`) are always present in the formula

## Integration Point

In [src/verification/solver/solver.ts](src/verification/solver/solver.ts), lines 161-162:

```typescript
if (lemmas.length === 0) {
    return { tag: "sat", model: createModel(assignments, cnfResult, setup.arena) };
}
```

This is where MBQI should kick in instead of returning SAT.

## Implementation

### 1. Create `src/verification/solver/quantifiers/mbqi.ts`

New module following the namespace-based API pattern:

```typescript
export const MBQI = {
    round: (
        quantifiers: readonly QuantifierInfo[],
        arena: ArenaState,
        instantiated: ReadonlySet<string>,
        nextClauseId: () => number,
        encodeLemma: (formula: IVL.Formula) => readonly Literal[],
    ): MBQIResult => { ... }
};
```

**Core algorithm (matches standard MBQI):**

1. **Collect ground terms by sort** from the arena - filter nodes that are constants or fully ground, grouped by their `sort` field. This is the standard "domain enumeration" step.

2. **For each quantifier** (all quantifiers, not just those without triggers - E-matching already ran):
   - Extract the binder sorts
   - Get candidate ground terms matching each binder's sort from the arena
   - Generate substitutions as cartesian product (bounded by generation limit)
   - Skip already-instantiated substitutions (deduplication via `instantiated` set)
   - Instantiate the body with each new substitution
   - Encode as lemmas

3. **Return lemmas** to be added to CDCL clause database for the next round

**Key functions:**

- `collectGroundTermsBySort(arena: ArenaState): ReadonlyMap<string, readonly EnodeId[]>` - groups arena nodes by sort (standard domain extraction)
- `generateSubstitutions(binders: readonly IVL.Binder[], termsBySort: ReadonlyMap<...>, limit: number): readonly Substitution[]` - bounded cartesian product over domains
- `instantiateBody` - reuse from existing `quantifiers/solver.ts`

### 2. Update `QuantifierEngine` in `quantifiers/solver.ts`

Export `instantiateBody`, `instantiationKey`, and `nodeToTerm` for reuse by MBQI. No interface changes needed - the caller checks `lemmas.length === 0`.

### 3. Update `quantifierLoopTrace` in `solver.ts`

Replace the early SAT return with MBQI fallback:

```typescript
// Current (line 161-162):
if (lemmas.length === 0) {
    return { tag: "sat", model: createModel(...) };
}

// New:
if (lemmas.length === 0) {
    const mbqiResult = MBQI.round(
        engine.quantifiers,
        setup.arena,
        engine.instantiated,
        () => nextId++,
        encodeLemma(cnfResult)
    );
    
    if (mbqiResult.lemmas.length === 0) {
        return { tag: "sat", model: createModel(...) };
    }
    
    yield { tag: "mbqi-round", round, lemmas: mbqiResult.lemmas.length };
    const updatedInstantiated = new Set([...engine.instantiated, ...mbqiResult.newKeys]);
    const updatedEngine = { ...engine, instantiated: updatedInstantiated };
    return yield* quantifierLoopTrace([...clauses, ...mbqiResult.lemmas.map(l => l.clause)], theories, O.some(updatedEngine), setup, cnfResult, round + 1);
}
```

### 4. Add trace step for MBQI

Extend the `Step` type in [src/verification/solver/trace.ts](src/verification/solver/trace.ts):

```typescript
| { readonly tag: "mbqi-round"; readonly round: number; readonly lemmas: number }
```

Add rendering in `stepDoc` and `stepSummary`.

## Testing

### Unit Tests (`src/verification/solver/__tests__/quantifier.test.ts`)

Add tests in a new `describe("MBQI")` block:

```typescript
describe("MBQI", () => {
    it("detects arithmetic quantifier contradiction via MBQI", () => {
        const solver = Solver.create();
        // forall v. (v = 1 => v > 10) should be UNSAT
        // The constant 1 is in the arena; MBQI instantiates with v=1
        // yielding (1 = 1 => 1 > 10) = (true => false) = false
        solver.assert(DSL.forall(
            [{ name: "v", sort: Build.Real }],
            DSL.implies(DSL.eq(DSL.var_("v", Build.Real), DSL.int(1)), 
                        DSL.gt(DSL.var_("v", Build.Real), DSL.int(10)))
        ));
        expect(solver.check().tag).toBe("unsat");
    });

    it("MBQI trace shows mbqi-round event", () => {
        const solver = Solver.createTraced();
        solver.assert(DSL.forall(...));
        const { trace } = solver.check();
        const { steps } = Trace.collect(trace);
        expect(steps.some(s => s.tag === "mbqi-round")).toBe(true);
    });
});
```

**Snapshot verification:** All snapshot tests must be manually reviewed for semantic correctness. Even if tests pass, verify:
- UNSAT results have correct unsat cores
- The instantiation key shows the expected ground term substitution
- Trace shows MBQI round triggered (not just E-matching)

### Integration Tests (`src/__tests__/integration/`)

The existing [refinement-types.test.ts](src/__tests__/integration/refinement-types.test.ts) tests refinement checking but the snapshots don't include solver traces. After implementation:

1. **Verify existing tests still pass** - run `pnpm test src/__tests__/integration/refinement-types.test.ts`

2. **Add MBQI-specific integration test** - a refinement that requires MBQI to verify:

```typescript
test("arithmetic refinement requiring MBQI", () => {
    // This VC has no EUF triggers - pure arithmetic
    const result = runScript(`
let badOne: Num [| \\v -> v > 10 |] = 1;
    `);
    // Should fail verification (1 is not > 10)
    expect(snap(result)).toMatchSnapshot();
});
```

3. **Consider adding solver trace to snapshots** - currently `snap()` in [helpers/pipeline.ts](src/__tests__/integration/helpers/pipeline.ts) excludes `ivl` and `solverTrace`. For debugging, could optionally include them.

## Bounding Strategy

Per the design doc: "Bounded MBQI is acceptable here because Yap's VCs are generated from local program structure."

- `MAX_MBQI_TERMS = 10` per sort initially
- Use existing `MAX_GENERATION = 5` for round limits
- Prioritize numeric constants appearing in the formula (like `1` from `v = 1`)

## Audit Pass

After implementation, run the **yap-reviewer** skill to audit against coding guidelines:

- No `let`, loops, `else`, `null`, type assertions
- ts-pattern for dispatch (no if-chains)
- Namespace-based API (`MBQI.round` not `mbqiRound`)
- No narration comments
- Immutable data structures throughout

## File Summary

| File | Change |
|------|--------|
| `src/verification/solver/quantifiers/mbqi.ts` | New file - MBQI.round, collectGroundTermsBySort |
| `src/verification/solver/quantifiers/solver.ts` | Export instantiateBody, instantiationKey, nodeToTerm |
| `src/verification/solver/solver.ts` | Wire MBQI fallback in quantifierLoopTrace |
| `src/verification/solver/trace.ts` | Add mbqi-round step type and rendering |
| `src/verification/solver/__tests__/quantifier.test.ts` | Add MBQI unit tests |
| `src/__tests__/integration/refinement-types.test.ts` | Add MBQI integration test |
