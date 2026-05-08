# Ously Validation: The Enforcer

## Scope

Zod schemas for request/response validation.

## Rules

- Every schema MUST conform to a Domain interface using the `match<T>()` helper.
- Do not define "Business Logic" here; only validation logic.
