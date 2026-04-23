# Writan

Writan is a desktop novel-writing workspace scaffold built with Electron + React + TypeScript.

[![Unit & Integration Tests](https://github.com/mjmarks84/Writan/actions/workflows/test.yml/badge.svg)](https://github.com/mjmarks84/Writan/actions/workflows/test.yml)
[![E2E Tests](https://github.com/mjmarks84/Writan/actions/workflows/e2e.yml/badge.svg)](https://github.com/mjmarks84/Writan/actions/workflows/e2e.yml)
[![codecov](https://codecov.io/gh/mjmarks84/Writan/branch/main/graph/badge.svg)](https://codecov.io/gh/mjmarks84/Writan)

## Tech stack

- Electron
- React + TypeScript
- Tailwind CSS (dark mode via class strategy)
- SQLite (local project metadata bootstrap)
- Zustand state stores

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build all targets:
   ```bash
   npm run build
   ```
3. Launch app:
   ```bash
   npm run dev
   ```

## Testing

- Unit/integration: `npm test`
- Coverage: `npm run test:coverage`
- E2E: `npm run test:e2e`

## Project layout

The scaffold includes:

- Electron main process + preload IPC bridge (`src/electron`)
- Renderer app with three-panel writing layout (`src/renderer`)
- Shared constants/types (`src/shared`)
- Packaging config (`electron-builder.yml`)
