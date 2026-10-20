# ADR 0006: State ownership instead of atomic hook limits

- Date: 2026-10-20
- Status: Accepted
- Implementation: Isolated/inheritable UI context and consumer-owned interaction state demonstrated and tested; no global store dependency.

## Context

The proposed hook ceiling was atoms up to `useState`, molecules up to `useReducer`, and organisms up to `useContext`. These APIs solve different problems rather than represent increasing architectural levels. Context reads a provider value; reducers organize transitions; state stores values. An atom may need locale context, while an organism may need only one state variable.

## Decision

Classify by UI responsibility and select hooks by behavior. Standardize state ownership rather than hook permissions.

| Level | Responsibility | Default approach |
| --- | --- | --- |
| Atoms | Focused interaction | Props first; minimal local UI state when needed |
| Molecules | Coordinate a small control group | Controlled props; local state or reducer when justified |
| Organisms | Coordinate a reusable UI section | Controlled API; reducer and scoped context when useful |
| Templates | Layout and composition | Slots and props; delegate interactive state |
| Consuming MFE | Business workflows, server data, persistence | Application-owned hooks, stores, services, and server code |

Keep state at the closest common owner that needs it. Expose controlled contracts such as `value/onValueChange` and `open/onOpenChange` for consumer-owned values. Offer `defaultValue` or `defaultOpen` where uncontrolled usage is useful; document precedence and do not silently switch modes during an instance's lifetime.

Use reducers for related complex transitions. Use context for justified shared dependencies or compound-component coordination. Atoms may consume library context but must not import an MFE's application context. MFE Server Components can supply resolved presentation values through props to library Client Components; theme styling can use CSS tokens.

Providers and component instances must be isolated. Avoid module-level mutable application state and mandatory external global stores. Do not duplicate derived state or mirror controlled props into local state unnecessarily.

When a Server Component supplies initial data, an MFE client wrapper owns subsequent interactive state and callbacks. UI state updates do not rerun the server parent. Persistence and server-data refresh remain consumer responsibilities.

## Alternatives considered

- Hook ceilings by atomic level: forbids legitimate uses and encourages misleading reclassification or hiding hooks in helpers.
- Global store for all component state: couples independent instances and imposes application infrastructure.
- Local state for every value: prevents reliable consumer coordination and can create multiple sources of truth.

## Consequences

Reviewers evaluate ownership, complexity, and isolation rather than count hook names. Context must have a clear scope and should not become an implicit application dependency.

## Required implementation evidence

Test controlled updates, relevant uncontrolled defaults, callback behavior, and independent instances. For context-based components, test nested/scoped providers and absence of cross-instance state leakage. Pure reducers need transition tests, including invalid or conflicting states where applicable.

## References

- [React state ownership](https://react.dev/learn/sharing-state-between-components)
- [React reducers and context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [React state structure](https://react.dev/learn/choosing-the-state-structure)
