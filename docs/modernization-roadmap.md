# Repository Modernization Roadmap

Sandbox issues prevent pnpm install, so when you need to do that, ask me and I will run it.

## Current Baseline

- Package management is on `pnpm` via Corepack.
- Test stack is modernized to Jest 30 + Testing Library.
- React is on 18.
- Babel tooling is migrated to Babel 7.

## Goals

- Reduce legacy framework/tooling risk.
- Remove React 18 compatibility warnings.
- Keep local dev fast and predictable.
- Maintain incremental, reversible upgrades.

## Phase 1: Head Management Modernization

### Status

- Completed on February 18, 2026.

### Why first

- `react-document-meta` triggers legacy lifecycle warnings under React 18.
- It is a focused migration with lower blast radius than router/build upgrades.

### Work

- Replace `react-document-meta` with `react-helmet-async` (or equivalent head strategy).
- Update all components/pages currently setting document metadata.
- Ensure SSR output still includes correct title/meta tags.
- Pin `react-helmet-async` to a webpack 4 compatible version (`1.3.0`) until Phase 3 upgrades the build stack.

### Exit criteria

- `react-document-meta` removed from dependencies.
- Existing tests pass.
- React lifecycle warnings from `react-document-meta` are gone.
- `build` passes with SSR head output preserved.

## Phase 2: Router Modernization

### Status

- Completed on February 18, 2026.

### Why second

- `react-router@3` is a major legacy boundary and affects app structure.
- Doing this after head migration isolates risk.

### Work

- Migrate route definitions from v3 patterns to modern React Router APIs.
- Update `Link`/`IndexLink` usage and route rendering in app entry/SSR flow.
- Revalidate redirects/trailing-slash behavior currently handled in routes.
- Replace `react-router-to-array` usage with explicit static `routePaths` exports.
- Keep webpack 4 compatibility by transpiling modern router package syntax via `babel-loader` include exceptions.

### Exit criteria

- Router dependency upgraded from v3 to a current supported version.
- Route behavior parity validated (including trailing slash behavior).
- Test suite green with updated route tests.
- `build` passes with modern router + SSR output.

## Phase 3: Build Pipeline Modernization

### Why third

- Build tooling is still webpack 4 era and includes deprecated plugins/loaders.
- This is high-impact; better after app/runtime-level legacy issues are reduced.

### Work

- Upgrade webpack stack (`webpack`, `webpack-cli`, `webpack-dev-server`) to current supported majors.
- Replace deprecated plugins/loaders:
  - `uglifyjs-webpack-plugin` -> modern minimizer strategy
  - `optimize-css-assets-webpack-plugin` -> modern css minimizer
  - `file-loader`/`url-loader` -> webpack 5 asset modules
- Preserve current `dev:fast`, `build`, and Netlify workflows.

### Exit criteria

- `build`, `dev`, and `dev:fast` all work with modern webpack stack.
- No deprecated webpack-era plugin/loaders remain.
- Netlify deploy path remains stable.

## Phase 4: Lint/Format Stack Refresh

### Why fourth

- Current lint stack (`eslint@4`, `babel-eslint`) is obsolete and noisy.
- Easier to upgrade after major runtime/build migration.

### Work

- Upgrade `eslint` to current major.
- Replace `babel-eslint` with supported parser/config.
- Upgrade `prettier` and reconcile formatting differences.

### Exit criteria

- Lint and format scripts run cleanly on modern tooling.
- Config is simplified and actively maintained.

## Phase 5: Polyfill and CSS/PostCSS Cleanup

### Why fifth

- Final cleanup phase once core runtime/tooling migrations are complete.

### Work

- Remove `core-js@2` legacy usage and migrate to modern polyfill strategy.
- Replace `postcss-cssnext` with modern `postcss-preset-env`.
- Update CSS loader/postcss chain as needed.

### Exit criteria

- No deprecated core-js v2 usage.
- No deprecated PostCSS plugin usage.
- CSS build behavior unchanged from user perspective.

## Execution Strategy

- Use one milestone per phase with small sub-commits.
- Validate each sub-step:
  - `pnpm run lint`
  - `CI=true pnpm exec jest --runInBand`
  - `pnpm run build`
  - `pnpm dev:fast` smoke check
- Commit after each significant step; squash later if desired.

## Immediate Next Action

- Start Phase 3 by upgrading webpack and removing compatibility exceptions added for modern router syntax.
