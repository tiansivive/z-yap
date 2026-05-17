---
tags:
  [
    normalization,
    elaboration,
    performance,
    mechanism,
    error-handling,
    implemented,
    recursion,
    runtime,
    inference,
    tracing,
    testing,
    ir,
  ]
---
# Evaluation step limit

`NF.evaluate` (`src/elaboration/normalization/evaluation.v2.ts`) takes optional `maxSteps` (default `10_000_000`). Each iteration of the driver loop that drains `globalWorkStack` increments a counter; beyond the limit it throws ``Evaluation exceeded maximum steps (${maxSteps}). Possible infinite loop in: ${EB.Display.Term(term, ctx)}``.

Continuation replay inside `apply` when forcing a captured continuation (`closure.type === "Continuation"`) uses a separate inner loop with its own counter and fixed `maxSteps = 10_000_000`; overrun throws `Continuation replay exceeded maximum steps` (no term embedded).
