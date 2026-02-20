# Phase 2 Execution Report (Web-Only Consolidation)

Date: 20 Feb 2026

## Scope Executed

This phase focused on consolidating runtime and build behavior to web-only, and pruning extension/app/plugin artifacts from the repository.

## Changes Implemented

### 1) Runtime Consolidation

- `src/constants/build-info.js`
  - Forced web-only flags (`isWebBuild=true`, other targets false).
  - Simplified route URL generation for web-only behavior.

- `src/index.jsx`
  - Uses `BrowserRouter` only.

- `src/App.jsx`
  - Uses explicit web initialization and renderer imports.
  - Removed plugin-specific `UrlWatcher` condition.

- `src/services/index.js`
  - Removed app-mode branching from dependency service registration.
  - Simplified proxy/dev browser service selection for web auth modes.

- `src/common/proxy.js`
  - Removed app/plugin branch logic.
  - Standardized service call and validation behavior for web runtime.

- `src/customize.js`
  - Removed plugin-based feature gating; web features now consistently enabled.

- `src/_nav.js`
  - Simplified poker navigation URL generation for web-only mode.

### 2) Build and Script Consolidation

- `package.json`
  - Build scripts now web-only.
  - Removed extension/app/plugin script commands.
  - `postbuild` runs single web cleanup flow.
  - `main` changed to `./src/index.jsx`.

- `craco.config.js`
  - Removed app/plugin/extn branching and extra target entry points.
  - Entry now builds only `index`.

- `post-build.js`
  - Simplified to web-only cleanup.
  - Removed extension packaging, plugin cleanup branch, and app package generation logic.

### 3) Non-Web File Pruning

Removed target-specific files and folders:

- `src/electron/**`
- `src/content-scripts/**`
- `src/common/background.js`
- `src/common/menu.js`
- `src/layouts/renderer/Renderer.app.jsx`
- `src/layouts/renderer/Renderer.extn.jsx`
- `src/layouts/renderer/Renderer.plugin.jsx`
- `src/layouts/initialization/index.jsx`
- `src/layouts/initialization/index.plugin.jsx`
- `src/index.plugin.jsx`
- `manifest.yml`
- `public/chrome/**`
- `public/edge/**`
- `public/firefox/**`
- `public/firefox_selfhost/**`
- `public/opera/**`
- `public/content.js`
- `public/menu.html`
- `public/api-pollyfill.js`

### 4) Documentation Updates

- Updated `docs/ROUTES.md` to web-only routing model.

## Validation

- Tests: `npm run test` -> passed.
- Build: `npm run build` -> passed.
- `postbuild` web cleanup executed successfully.

## Known Follow-up Items

- Build output still logs `react-controls` alias fallback warning for missing `externals/react-controls/src/` path; fallback to `node_modules/react-controls/src/` is still functioning.
- TypeScript language-service warning may appear for `routes.smoke.vitest.ts` import in some editor contexts until broader TS project config is introduced in Phase 3.

## Phase 2 Exit Status

- Runtime: web-only path active.
- Build scripts: web-only.
- Non-web target files: removed.
- Baseline smoke test: green.

Phase 2 is complete for the planned consolidation scope.
