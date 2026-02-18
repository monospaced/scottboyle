# Jest/Enzyme to Modern Jest + Testing Library Migration Plan

## Goals
- Migrate from `jest@23` + Enzyme to a modern, maintainable test stack.
- Preserve delivery velocity by using incremental, reversible steps.
- Keep CI green during migration.

## Current Constraints
- React codebase uses class components and older idioms.
- Test suite currently depends on Enzyme (`shallow`, `mount`, `render`) and Enzyme snapshots.
- A `pnpm` override pins `cheerio` to avoid incompatibility between Enzyme + legacy Jest and newer transitive deps.
- "Current" `@testing-library/react` requires React 18+, so React upgrade must be planned.

## Recommended Strategy (Phased)

### Phase 0: Baseline and Safety Rails
- Keep current migration checkpoint commit as rollback point.
- Ensure CI runs `pnpm run lint`, `pnpm run build`, and `pnpm run test`.
- Track migration progress by suite count (20 total suites currently).

### Phase 1: Jest Upgrade While Keeping Enzyme
- Upgrade Jest in controlled steps: `23 -> 27 -> 29 -> 30`.
- At Jest 28+, explicitly add `jest-environment-jsdom`.
- Fix config and snapshot deltas step-by-step.
- Keep Enzyme temporarily (and keep cheerio override) to avoid broad test rewrites early.

### Phase 2: Introduce Testing Library (Bridge on React 16)
- Add:
  - `@testing-library/react@12` (bridge version for React 16)
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
- Add shared test setup for `jest-dom`.
- Policy for new/edited tests: use Testing Library, not Enzyme.

### Phase 3: Incremental Test Rewrites
- Rewrite tests from Enzyme APIs to behavior-first assertions:
  - Prefer `getByRole`, `getByText`, `findBy*`, `waitFor`.
  - Avoid component instance/state poking.
- Migrate simpler leaf component tests first, complex suites last (e.g. `Linklog`).
- Reduce snapshot-only tests in favor of focused behavior assertions.

### Phase 4: React Upgrade Gate (Needed for Current RTL)
- Upgrade React/ReactDOM to 18+.
- Resolve lifecycle warnings and Strict Mode behavior issues that appear in legacy class code and dependencies.
- Upgrade Testing Library to current major after React 18 is in place.
- Remove Enzyme stack:
  - `enzyme`
  - `enzyme-adapter-react-16`
  - `enzyme-to-json`
  - Jest serializer reference

### Phase 5: Cleanup and Enforcement
- Remove temporary `pnpm` cheerio override if no longer needed.
- Final pass on flaky async tests and snapshot hygiene.

## Class Component Impact (What Changes)
- Class components are not a blocker.
- Biggest effect is test rewrite style:
  - Enzyme internals-driven tests become user-visible behavior tests.
  - Some tests will require redesign, not mechanical translation.
- React 18 may surface legacy lifecycle warnings; schedule cleanup work explicitly.

## Alternatives Considered (Non-RTL)
- `react-test-renderer` + Jest: workable, but implementation-centric and lower long-term payoff.
- `react-dom/test-utils`: low-level and verbose; high maintenance for custom helpers.
- Component/E2E testing (Playwright/Cypress): strong confidence, but slower and not a 1:1 unit test replacement.
- Decision: Testing Library remains the preferred long-term direction.

## Suggested Milestones
- Milestone A:
  - Jest 29+ in place
  - Testing Library bridge introduced
  - 25-40% suites migrated off Enzyme
- Milestone B:
  - React 18+
  - Current Testing Library
  - 100% Enzyme removed

## Definition of Done
- All test suites pass on modern Jest with no Enzyme dependency.
- CI and local workflows are stable on pnpm.
- Temporary cheerio override removed (or intentionally documented if retained).
