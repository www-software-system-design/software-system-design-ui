# Hooks

Place reusable UI behavior here when real reuse or complexity justifies extraction. Hooks cannot import component layers or depend on MFE state. Colocate behavior tests and expose reviewed hooks through deliberate package entry points.

`use-controllable-state/` is the reference example, exported through `@software-system.design/ui/hooks`. SearchField uses it for controlled or isolated uncontrolled ownership. Its setter accepts concrete values, not functional updaters. Undefined means uncontrolled; defaultValue is initialization only. Do not switch modes during an instance's lifetime. Tests cover StrictMode notifications, owner updates, callback replacement, defaults, and instance isolation. A Storybook example demonstrates it under Foundations/Hooks.
