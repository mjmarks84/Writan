# Writan

Writan is a desktop novel-writing workspace scaffold built with Electron + React + TypeScript.

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

## Project layout
The scaffold includes:
- Electron main process + preload IPC bridge (`src/electron`)
- Renderer app with three-panel writing layout (`src/renderer`)
- Shared constants/types (`src/shared`)
- Packaging config (`electron-builder.yml`)
