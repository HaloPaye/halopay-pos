# ADR 136: feat(multicurrency): implement sub-second fiat currency conversion with cached rate fallbacks

## Context
This ADR addresses issue #136: feat(multicurrency): implement sub-second fiat currency conversion with cached rate fallbacks.
We needed to define a clear architectural strategy to resolve the requirements outlined in the issue.

## Decision
We have decided to formally adopt the strategy proposed in the issue description. The implementation will follow our standard enterprise patterns (e.g., proper state management, strict typing, telemetry, and error handling).

## Status
Accepted and resolved.
