# Phase 1 Backfill Report (Vite + TypeScript Foundation)

Date: 20 Feb 2026

## Is it a Problem that Phase 2 Was Done First?

Not a blocker. The sequence is unusual, but valid.

- Phase 2 (web-only consolidation) reduced migration complexity.
- Phase 1 was backfilled on top of a cleaner web-only baseline.
- This order is acceptable as long as Phase 1 outcomes are now verified.

## Phase 1 Objectives (Backfilled)

- Introduce Vite as primary build/dev platform.
- Add TypeScript project foundation.
- Keep runtime behavior compatible with current web-only app.

## Changes Implemented

### Tooling and scripts

- Updated `package.json`:
  - `start` -> `vite`
  - `build` -> `vite build`
  - added `preview`, `typecheck`
  - retained `start:legacy` and `build:legacy` for fallback
- Added dev dependencies:
  - `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`

### Vite and TypeScript setup

- Added `vite.config.ts`
  - React plugin
  - web-compatible env defines for existing `process.env.*` usage
  - alias support for `src` and `react-controls`
  - output directory set to `build` (compatible with existing deploy/postbuild flow)

- Added `tsconfig.json`
  - compatibility mode (`allowJs: true`) to support incremental TypeScript migration
  - path aliases and `vite`/`vitest` types

- Added Vite HTML/entrypoint:
  - `index.html` (Vite root HTML)
  - `src/main.tsx` (TypeScript app entry)

### Post-build compatibility

- Updated `post-build.js` to remove dependency on `react-scripts/config/paths` and use direct `build` path resolution.
- Updated `public/index.html` to remove obsolete plugin-only templating branch.

## Validation Results

- `npm run test` -> passed
- `npm run typecheck` -> passed
- `npm run build` -> passed (Vite build + postbuild)

## Notes

- Build shows Sass deprecation warnings from legacy SCSS usage (non-blocking for this phase).
- Build shows large chunk warnings (non-blocking; optimization can be planned later).

## Phase 1 Exit Status

Phase 1 is now complete and validated on top of Phase 2 web-only baseline.
