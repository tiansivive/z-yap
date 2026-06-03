---
tags:
  - bug
  - backlog
  - gram
  - codegen
  - lowering
  - graph
  - compiler
  - ir
  - implementation
refs:
  - thread:gram-evolution
---
# GRAM string escaping bug

String literals containing double-quote characters are double-escaped when serialised through the GRAM pipeline, producing malformed codegen output.

## Symptom

A Yap string `{"marked": true}` (containing literal double-quotes) appears in generated JS as `{\\\\"marked\\\\": true}` instead of `{\"marked\": true}`. The internal `NF.Value` is correct; the bug manifests in GRAM payload serialisation and JS codegen.

## Trace

The GRAM graph's debug output shows the lit node payload already over-escaped:
```
[39] lit {"value":{"type":"String","value":"{\\\\\\"marked\\\\\\": true}"}}
```

MIR display shows the correct value, suggesting a divergence between GRAM JSON serialisation and MIR's display path.

## Impact

User-defined rules with JSON string payloads produce syntactically invalid JS output. The workaround is avoiding double-quote characters in payloads.
