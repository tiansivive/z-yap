---
tags:
  - continuation
  - lowering
  - mir
  - bridge
  - compiler
  - codegen
  - mechanism
  - reference
  - legacy
  - state-machine
  - runtime
  - memory
  - allocation
  - documentation
---

# Multishot MIR state-machine example

This is the old instructive pseudo-MIR sketch for multishot continuation lowering. It is not the canonical implementation site anymore; [[multishot-bridge-serialization]] and [[shift-reset-bridge-lowering]] describe the current GRAM bridge lowering. The example is preserved because it shows the runtime shape more clearly than the abstract mechanism notes.

The important shape is:

- `b1(v, env, idx)` is the shared captured-continuation block.
- `idx` selects which resume site receives the result of the continuation.
- Each resume block stores its returned value in the immutable environment (`r0`, `r1`, ...).
- A later resume block reads the stored results back out before finishing the shift body.
- The reset exit block receives the final shift-body result.

```mir
module
  fn main entry=b4
    b4:
      let env_0 = alloc {  }
      let x0 = 1
      let i0 = 0
      jump b1(x0, env_0, i0)

    // The reset exit block. This is the block of code that is executed after the shift body.
    b0(x8):
      return x8

    // The captured continuation block: the rest of the code after the shift, up to the enclosing reset.
    b1(x1, env_1, i1):

      /********* CONTINUATION BLOCK BODY *********
       * Here we would lower the continuation body.
       * This example has no continuation body, so it just returns the resumption value (x1).
       * This is also the value the shift expression evaluates to.
       ******************************************/

      /********* CONTINUATION BLOCK END *********
       * The end of the continuation block is always a jump back to the shift body.
       * Because we support multishot semantics, we branch on the resume index,
       * which is provided by the jump instruction out of the shift body.
       ******************************************/

      branch i1 { 0 -> b2(x1, env_1) | 1 -> b3(x1, env_1) }

    // The first resume block. This is the block within the shift body that is executed
    // after the first call to the continuation returns.
    b2(x2, env_1):
      // Store the result of the first continuation call so later resume blocks can use it.
      let env_2 = update-immutable env_1 { r0: x2 }

      let x3 = 2
      let i2 = 1

      // Jump to the continuation block again. This is the second resumption.
      jump b1(x3, env_2, i2)

    // The second resume block. In this example, it is also the end of the shift body.
    b3(x4, env_3):
      // Store the result of the second continuation call.
      let env_4 = update-immutable env_3 { r1: x4 }

      // The parameters to (+) are the results of the continuation calls.
      let x5 = read env_4.r0
      let x6 = read env_4.r1

      let x7 = +(x5, x6)

      // End of the shift body. Jump to the reset exit block.
      jump b0(x7)
```

The bridge implementation now builds this shape from GRAM `Reset`/`Resume` topology. The legacy sketch still explains the same invariant: resumption is not a primitive MIR operation. It is a jump into the shared continuation block with an argument, an environment, and a resume-site index.

<!-- connections:start -->

## Connections

**Outgoing**
- CLARIFIES → [[multishot-bridge-serialization]] — Worked pseudo-MIR for the bridge-resident serialization shape
- CLARIFIES → [[shift-reset-bridge-lowering]] — Concrete block-and-jump state-machine example
- MIRRORS → [[multishot-serialization]] — Same legacy state-machine shape, preserved as explanatory reference

**Incoming**
- [[delimited-continuations.thread]] ← INCLUDES — Pedagogical pseudo-MIR walkthrough of multishot lowering

<!-- connections:end -->
