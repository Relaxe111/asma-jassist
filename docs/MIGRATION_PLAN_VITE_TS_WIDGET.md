# JAssist Migration Plan: Pure Vite + TypeScript + Web-Only Widget

Date: 20 Feb 2026

## 1) Objective

Migrate this fork from CRA/CRACO multi-target builds (extension, plugin, Electron, web) to a **pure Vite + TypeScript web app**, then expose JAssist as a **widget/micro-app** inside the ASMA baseline.

Primary business goal:

- Deliver issue-hour-centric calendar and reporting experiences in ASMA.

Technical goals:

- Keep only web runtime.
- Remove extension/plugin/Electron packaging and runtime branches.
- Adopt TypeScript-first implementation for all new/changed code.
- Align with ASMA baseline practices (Vite, modern browser targets, widget integration model).

## 2) In Scope vs Out of Scope

In scope:

- Build tooling migration to Vite.
- TypeScript migration strategy and phased conversion.
- Web-only runtime selection.
- Widget embedding model for ASMA baseline.
- Gap analysis and execution plan.

Out of scope (for this migration phase):

- Feature redesign beyond platform adaptation.
- Full reimplementation of all legacy modules in one shot.
- Public extension store publishing.

## 3) Current State (Observed)

Current stack and architecture:

- React 18 + JSX/JavaScript.
- CRA + CRACO with `REACT_APP_BUILD_MODE` routing for `WEB`, `APP`, `PLUGIN`, extension.
- Post-build packaging logic for browser manifests and Electron artifacts.
- Runtime mode branching in app initialization, services, renderer, and routing.
- Atlassian Forge/plugin entry still present.

Representative files:

- Build scripts/config: `package.json`, `craco.config.js`, `build.config.js`, `post-build.js`.
- Build mode runtime: `src/constants/build-info.js`, `src/index.jsx`, `src/App.jsx`, `src/customize.js`.
- Non-web targets:
  - extension: `src/common/background.js`, `src/common/menu.js`, `src/content-scripts/**`, `public/*/manifest.json`, `public/content.js`, `public/menu.html`
  - plugin/forge: `src/index.plugin.jsx`, `manifest.yml`, `src/jcloud*.js`, `src/services/index.plugin.js`
  - electron: `src/electron/**`

## 4) Target State

Target platform:

- Vite + React + TypeScript.
- Single web build output only.
- BrowserRouter-based runtime (no extension hash/popup routing constraints).
- JAssist delivered as embeddable widget/micro-app in ASMA shell.

Target principles:

- No multi-target build modes.
- No extension manifests/content scripts/electron preload/background.
- No plugin-specific entrypoint in primary build.
- Strong typing at module boundaries first (services, models, API clients).

## 5) Gap Analysis (Current -> Target)

### 5.1 Build System Gaps

Gap A: CRA/CRACO to Vite

- Current: CRACO modifies webpack entries and mode-specific output.
- Target: Vite config with one app entry and optional library/widget entry.
- Required work:
  - replace `react-scripts`/CRACO scripts with Vite scripts,
  - migrate aliases from `jsconfig.json` to `vite.config.ts` + `tsconfig.json`,
  - map environment variables to Vite `import.meta.env`.

Gap B: post-build packaging scripts

- Current: `post-build.js` mutates output for extension/plugin/Electron.
- Target: no post-build repackaging for non-web targets.
- Required work:
  - remove branch logic and packaging-only scripts,
  - keep only minimal web asset post-processing if required.

### 5.2 Runtime Gaps

Gap C: build-mode branches in runtime

- Current: many checks for `isWebBuild`, `isPluginBuild`, `isAppBuild`, `isExtnBuild`.
- Target: single web runtime mode.
- Required work:
  - collapse `src/constants/build-info.js` to web-only flags/utilities,
  - simplify router initialization in `src/index.jsx`,
  - remove plugin/extn conditions in `src/App.jsx`, `src/customize.js`, service registries.

Gap D: target-specific renderer/initialization files

- Current: mode-specific renderer and initialization variants (`*.web.jsx`, `*.extn.jsx`, `*.plugin.jsx`, `*.app.jsx`).
- Target: one web renderer/initialization flow.
- Required work:
  - consolidate to one implementation path,
  - delete dead variants and imports.

### 5.3 Artifact Gaps

Gap E: non-web assets in source tree

- Current: extension manifests, content bridge scripts, Electron runtime, Forge plugin entry.
- Target: web-only source tree and artifacts.
- Required work:
  - remove extension and Electron folders/files,
  - remove or isolate Forge/plugin app path from primary runtime,
  - keep only required web assets in `public/`.

### 5.4 Language/Typing Gaps

Gap F: JavaScript-first codebase to TypeScript-first

- Current: `.js/.jsx` dominant code.
- Target: `.ts/.tsx` for all touched code, progressive migration for remainder.
- Required work:
  - introduce `tsconfig.json` and strict-ish baseline,
  - convert core entry + shared types first,
  - migrate services and models next,
  - then route modules and feature pages.

### 5.5 ASMA Widget Integration Gaps

Gap G: standalone app assumptions

- Current: app assumes full-screen standalone shell and own navigation/session behaviors.
- Target: embeddable widget/micro-app loaded inside ASMA container.
- Required work:
  - define widget contract (init props, auth context, timezone/project context, callbacks),
  - add micro-app lifecycle hooks (`mount`, `unmount`, optional `update`),
  - isolate global styles and side effects,
  - implement data bridge (host -> JAssist input, JAssist -> host events).

## 6) What to Remove, Keep, Refactor

Remove (web-only cut):

- `src/electron/**`
- `src/common/background.js`
- `src/common/menu.js`
- `src/content-scripts/**`
- `public/chrome/**`, `public/edge/**`, `public/firefox/**`, `public/firefox_selfhost/**`, `public/opera/**`
- `public/content.js`, `public/menu.html`, `public/api-pollyfill.js`
- build scripts/branches for `APP`, `PLUGIN`, extension in `package.json`, `craco.config.js`, `build.config.js`, `post-build.js`

Keep:

- Core React views/routes/modules needed for web and widget use cases.
- Worklog/report/calendar domain logic that is not tied to extension/plugin/Electron APIs.

Refactor:

- `src/constants/build-info.js` -> web-only environment helper.
- `src/index.jsx` -> `src/main.tsx` with Vite and widget bootstrapping.
- `src/customize.js` feature flags to non-build-mode flags.
- service registration to remove mode-specific branches.

## 7) Migration Phases

### Phase 0: Freeze and Baseline (1-2 days)

- Freeze scope (web-only + widget baseline).
- Record current feature parity checklist.
- Capture baseline smoke tests for critical flows:
  - auth/login,
  - dashboard,
  - issue-hour relevant report/calendar flows,
  - worklog create/edit.

Exit criteria:

- Agreed parity list and acceptance checks.

### Phase 1: Build Platform Switch to Vite (2-4 days)

- Add Vite + React plugin.
- Create `vite.config.ts` (aliases, env handling, output config).
- Create `index.html`/entry migration to Vite conventions.
- Replace scripts in `package.json` with Vite-based scripts.
- Keep runtime behavior unchanged initially (compatibility mode).

Exit criteria:

- App runs with `vite dev` and builds with `vite build`.

### Phase 2: Web-Only Runtime Consolidation (3-6 days)

- Remove multi-mode runtime branches.
- Consolidate renderer/initialization to web-only implementations.
- Remove extension/Electron/plugin assets and packaging logic.
- Remove dead dependencies introduced only for removed targets.

Exit criteria:

- No references to `isPluginBuild`/`isAppBuild`/`isExtnBuild` remain in active runtime.
- Web app still passes parity smoke checks.

### Phase 3: TypeScript Migration (incremental, 1-3 weeks)

Order of conversion:

1. Entry and app shell (`main.tsx`, `App.tsx`, route typing).
2. Shared domain types (worklog, issue, project, report params, calendar entries).
3. Services and API clients.
4. Feature modules prioritized by business value (calendar, worklog report, dashboard gadgets).

Approach:

- Convert file-by-file (`allowJs` initially true, then tighten).
- Add strict checks progressively (`noImplicitAny`, `strictNullChecks` as milestone gates).

Exit criteria:

- Critical paths fully typed.
- New code in TypeScript only.

### Phase 4: Widget/Micro-App Productization for ASMA (3-7 days)

- Define widget public API:
  - `mount(container, props)`
  - `unmount(container)`
  - optional `update(props)`
- Add host-event bridge:
  - input: user context, project/filter context, date range, locale/timezone
  - output: issue click, time-range change, report drilldown events
- Make styling host-safe (scoped root class, limited global resets).
- Support micro-app lifecycle events for ASMA embedding.

Exit criteria:

- Widget can be mounted/unmounted by ASMA shell with deterministic behavior.

## 8) Dependency and Tooling Changes

Add:

- `vite`
- `@vitejs/plugin-react`
- `typescript`
- `@types/react`, `@types/react-dom`
- optional: `vite-tsconfig-paths`

Remove after consolidation (candidate list):

- `react-scripts`
- `@craco/craco`
- extension/Electron-only tooling dependencies

Review for modernization later (optional, not blocking migration):

- moment -> dayjs/luxon (if feasible)
- jQuery removal where practical

## 9) Risks and Mitigations

Risk 1: Hidden coupling to extension/plugin APIs.

- Mitigation: add adapter layer and fail-fast diagnostics where APIs are unavailable.

Risk 2: Route/state regressions during mode-branch removal.

- Mitigation: preserve route contracts first, then simplify in controlled steps.

Risk 3: CSS/style bleed when embedded as widget.

- Mitigation: root-scoped styles and host integration test pages.

Risk 4: TypeScript migration slowdown.

- Mitigation: prioritize typed boundaries and high-change modules first.

## 10) Definition of Done

Migration is complete when all are true:

- Build system is Vite-only.
- Runtime is web-only (no extension/plugin/Electron branches in shipped app).
- Core workflows pass parity checks.
- Widget contract is implemented and consumed by ASMA shell.
- TypeScript is default for all new code; core business modules are typed.

## 11) Suggested Execution Order (Practical)

1. Create Vite scaffold and run app in compatibility mode.
2. Remove non-web scripts and artifacts.
3. Consolidate runtime branches.
4. Establish widget mount/unmount API.
5. Convert calendar + worklog/report pipeline to TypeScript first.

## 12) Immediate Next Sprint Backlog

- Task 1: Vite bootstrap PR (no behavior changes).
- Task 2: web-only cleanup PR (remove extension/Electron/plugin files and scripts).
- Task 3: typed domain models PR (`Issue`, `WorklogEntry`, `CalendarHourBucket`, `ReportFilter`).
- Task 4: widget host adapter PR for ASMA baseline.
- Task 5: issue-hour calendar refinement PR on top of typed models.
