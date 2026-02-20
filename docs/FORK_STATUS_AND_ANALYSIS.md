# ASMA Fork Status and Analysis

Date: 20 Feb 2026

## Current Status (Fork Baseline)

- This fork is based on the Jira Assistant extension codebase with multi-target builds (browser extension, web, plugin, and Electron app) driven by build modes.
- Source is predominantly JavaScript and JSX with React 18, using CRA via CRACO.
- Calendar capability is present in dependencies and documentation, but feature focus is on general worklog and reports rather than issue-registered-hour driven calendar views.
- Release artifacts for Chrome/Firefox are stored in the repo under release/.
- The root README describes the project as a browser extension and includes non-code distribution terms that conflict with the MIT license in package.json.

## Technology Stack (Observed)

- Framework: React 18 with React Router (hash or browser router based on build mode).
- Build system: Create React App with CRACO customization; multiple entry points for extension content scripts, background, menu, and Electron.
- Language: JavaScript and JSX (no TypeScript in core app sources).
- UI: PrimeReact, PrimeFlex, Bootstrap, FontAwesome.
- Calendar: FullCalendar (core, daygrid, timegrid, list, interaction) and moment.
- State/data: Zustand, Dexie (IndexedDB), Firebase.
- Utilities: jQuery, PapaParse, exceljs, jsPDF, Chart.js.
- Packaging targets: Chrome/Firefox/Edge/Opera extensions, Electron app, plugin build, web build.

## Repo Structure and Conventions (Observed)

- Multi-entry builds via CRACO and custom webpack entry configuration.
- Extension-specific scripts in src/common and src/content-scripts.
- Mix of class components and function components with hooks.
- Service injection pattern used in core components (for example, services injected into App).
- ESLint rules are defined in package.json; no Prettier configuration detected in repo root.
- Aliasing is configured via jsconfig.json and a custom alias loader in CRACO.

## Coding Practices (Observed)

- React component structure is mixed (class components for core App and hooks for smaller components).
- Custom dependency injection is used for services rather than React context for some core modules.
- Explicit build flags (REACT_APP_BUILD_MODE) drive behavior and router choice.
- Complexity limits are enforced via ESLint, but line length is generous.
- Some legacy dependencies remain in use (jQuery, moment) alongside modern React.

## Differences vs ASMA Practices

### What this repo uses

- CRA + CRACO.
- JavaScript/JSX (no TypeScript-first default).
- npm scripts (package.json) and npm-based workflow.
- Polyfills present (api-pollyfill.js) and legacy support.
- Extension + Electron multi-target output within a single codebase.
- Large dependency surface including jQuery and moment.

### What ASMA practices expect

- Vite + React with TypeScript as the default.
- pnpm as the package manager.
- ES2020+ only, no polyfills, no UMD/CommonJS outputs.
- Widget-based architecture with import maps and HMR; shared modules loaded once.
- Smaller, more composable modules and explicit typing conventions.

## Gaps and Alignment Notes

- Build tooling is CRA-based here vs Vite in ASMA.
- JavaScript-only source conflicts with ASMA TypeScript-first standards.
- Repo targets extension + Electron in one build, while ASMA favors widget-level deployments.
- Polyfills and some legacy dependencies contradict ASMA modern-only policy.
- ESLint rules exist but do not enforce TypeScript or ASMA file size limits.

## Migration Considerations (High-Level)

- Decide whether to keep CRA/CRACO for stability or migrate to Vite for alignment.
- Identify a phased TypeScript adoption plan (new features first).
- Re-scope calendar feature to be issue-hour centric in the domain model and UI.
- Evaluate dependency cleanup (moment, jQuery) in favor of modern alternatives if aligned with ASMA goals.

## Sources Referenced

- package.json, craco.config.js, build.config.js, jsconfig.json
- README.md, docs/DEVELOPMENT.md, docs/FEATURES.md
