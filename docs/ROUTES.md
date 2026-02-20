# JAssist Route Documentation

Date: 20 Feb 2026

## Overview

Routing is now web-only and uses `BrowserRouter` in `src/index.jsx`.

Routes are resolved in two levels:

- Top-level routes in `src/layouts/renderer/Renderer.web.jsx`
- Authenticated feature routes in `src/routes.jsx`, rendered inside `DefaultLayout`

## Top-Level Routes

Source: `src/layouts/renderer/Renderer.web.jsx`

- `/integrate`
- `/integrate/extn`
- `/integrate/basic`
- `/integrate/basic/:store`
- `/options`
- `/poker/*`
- `/:userId/*` (active when auth type and user id are present)

## Authenticated Feature Routes

Source: `src/routes.jsx`

Core:

- `/dashboard/:index`
- `/dashboard`
- `/calendar`

Reports:

- `/reports/worklog`
- `/reports/pivot`
- `/reports/pivot/:reportId`
- `/reports/say-do-ratio`
- `/reports/estimateactual`
- `/reports/sprint`
- `/reports/custom`
- `/reports/custom/:reportId`

Bulk import:

- `/import/worklog`
- `/import/issue`

Settings:

- `/settings/general`
- `/settings/usergroups`
- `/settings/global`

Other:

- `/contribute`
- `/contact-us`

## Effective URL Model

Feature routes are mounted under `/:userId/*`, so effective URLs are like:

- `/alice/dashboard`
- `/alice/reports/worklog`
- `/alice/settings/general`

Non-user-scoped entry routes:

- `/integrate`
- `/integrate/basic`
- `/options`
- `/poker/*`

## Navigation Mapping

Source: `src/_nav.js`

Sidebar links are generated from the same route set and prefixed with the current `userId` in `DefaultLayout`.

## Verification

Baseline route parity is validated by `src/routes.smoke.vitest.ts`.
