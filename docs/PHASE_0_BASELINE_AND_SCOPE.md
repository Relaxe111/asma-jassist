# Phase 0 Execution: Baseline and Scope Freeze

Date: 20 Feb 2026

Related plan:

- `docs/MIGRATION_PLAN_VITE_TS_WIDGET.md`

## 1. Scope Freeze (Approved Working Scope)

Phase 0 scope is frozen to the following migration objective:

- Move JAssist to pure Vite + TypeScript.
- Keep only web app runtime.
- Remove extension, plugin (Forge runtime path), and Electron support from active target architecture.
- Prepare JAssist to run as widget/micro-app in ASMA baseline.

Out of scope for Phase 0:

- No large feature redesign.
- No mass TypeScript conversion yet.
- No dependency modernization beyond migration-enabling changes.

## 2. Baseline Feature Parity Checklist (Web Target)

The following capabilities are baseline parity targets that must remain valid through migration:

### Core

- Dashboard routes load and render:
  - `/dashboard`
  - `/dashboard/:index`
- Calendar route loads:
  - `/calendar`

### Reports

- Worklog report:
  - `/reports/worklog`
- Pivot report:
  - `/reports/pivot`
  - `/reports/pivot/:reportId`
- Say/Do ratio:
  - `/reports/say-do-ratio`
- Estimate vs Actual:
  - `/reports/estimateactual`
- Sprint report:
  - `/reports/sprint`
- Custom report:
  - `/reports/custom`
  - `/reports/custom/:reportId`

### Bulk Import

- Worklog import:
  - `/import/worklog`
- Issue import:
  - `/import/issue`

### Settings and Other

- General settings:
  - `/settings/general`
- User groups:
  - `/settings/usergroups`
- Global settings:
  - `/settings/global`
- Contribute page:
  - `/contribute`
- Contact page:
  - `/contact-us`

## 3. Baseline Non-Goals (To Be Removed in Migration)

The following are explicitly non-goals for target architecture and should be removed in later phases:

- Extension runtime paths:
  - background/menu/content-script runtime and browser manifest packaging.
- Electron app runtime and preload process.
- Plugin-specific standalone entry path in primary web build.
- Build-mode branching (`WEB`/`APP`/`PLUGIN`/extension) in shipped runtime.

## 4. Validation Strategy for Migration Phases

Validation gates starting from Phase 1 onward:

- Gate A: Build gate
  - Dev startup works.
  - Production build succeeds.
- Gate B: Route parity gate
  - All baseline routes from section 2 can be opened without runtime crash.
- Gate C: Critical workflow gate
  - Login/session flow works.
  - Calendar and worklog report paths render expected main UI.
- Gate D: Widget readiness gate
  - App can be mounted/unmounted by host shell without leaking global listeners/state.

## 5. Current Baseline Test Status

Current repository has a minimal automated test footprint.

Known test file:

- `src/App.test.js`

Phase 0 action:

- Run existing tests once and record result as baseline.

## 6. Deliverables Completed in Phase 0

- Scope freeze documented.
- Feature parity checklist documented.
- Validation gate criteria documented.
- Existing test baseline execution recorded in `docs/PHASE_0_TEST_BASELINE.md`.
