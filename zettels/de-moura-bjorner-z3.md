---
tags:
  [
    verification,
    sat,
    backend,
    arithmetic,
    tooling,
    infrastructure,
    research,
    paper,
    reference,
    implemented,
    compiler,
    ffi,
  ]
---
# de Moura & Bjørner — Z3 overview

[Z3: An Efficient SMT Solver](https://doi.org/10.1007/978-3-540-78800-3_24). Leonardo de Moura, Nikolaj Bjørner. TACAS 2008 (LNCS 4963).

Short systems paper introducing Z3’s architecture for combined theories (equality with uninterpreted functions, arithmetic, bit-vectors, arrays, quantifiers, etc.) aimed at software verification workloads—SAT core plus theory plugins and pragmatic integration concerns.

Industrial SMT tools (including Z3) instantiate this template. Yap's in-tree architectural analogue is [[cdcl-t-solver]] consuming **IVL** VCs ([[vc-ir]]). Z3 remains useful prior art and a possible external oracle, not an active repository dependency.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[cdcl-t-solver]] — Industrial reference
- INFORMS → [[vc-ir]] — Z3 architectural template parallels IR + theory stack

<!-- connections:end -->
