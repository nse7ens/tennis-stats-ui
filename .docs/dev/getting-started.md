# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

## Setup

```bash
git clone <repo-url>
cd tennis-stats
pnpm install
```

## Development

```bash
pnpm dev       # Start dev server with HMR → http://localhost:5173
pnpm build     # Type-check (tsc -b) then bundle with Vite
pnpm lint      # Run ESLint across all .ts / .tsx files
pnpm preview   # Serve the production build locally
```

## Project structure

```
src/
  main.tsx       ← app entry point
  App.tsx        ← root component (currently scaffold)
  App.css        ← component styles
  index.css      ← global styles
  assets/        ← static images / icons
public/
  favicon.svg
  icons.svg      ← SVG sprite (Tabler Icons subset)
.docs/           ← project documentation
CLAUDE.md        ← AI-agent context and API schema
```

## TypeScript notes

The config enforces `noUnusedLocals` and `noUnusedParameters` — unused imports and variables are compile errors, not just warnings. `pnpm build` will fail if there are type errors.
