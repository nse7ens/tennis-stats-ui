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

## Deployment

The app is hosted on Azure Container Apps. Every push to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which:

1. Builds a Docker image (multi-stage: Node/pnpm build → nginx)
2. Pushes it to Azure Container Registry tagged with the commit SHA
3. Updates the Container App to the new image

### One-time secrets setup

Add these to **GitHub → Settings → Secrets → Actions**:

| Secret | Value |
|---|---|
| `REGISTRY_LOGIN_SERVER` | ACR login server (e.g. `myregistry.azurecr.io`) |
| `REGISTRY_USERNAME` | ACR admin username |
| `REGISTRY_PASSWORD` | ACR admin password |
| `AZURE_CREDENTIALS` | Output of `az ad sp create-for-rbac --name tennis-stats-deploy --role contributor --scopes /subscriptions/{sub}/resourceGroups/{rg} --json-auth` |
| `AZURE_RESOURCE_GROUP` | Resource group containing the Container App |
| `AZURE_CONTAINER_APP_NAME` | Container App name |

### Rollback

Re-deploy a prior image by running:
```bash
az containerapp update \
  --name <app-name> --resource-group <rg> \
  --image <registry>.azurecr.io/tennis-stats:<sha>
```

### Local Docker build

```bash
docker build -t tennis-stats .
docker run -p 8080:80 tennis-stats
# Open http://localhost:8080
```

## TypeScript notes

The config enforces `noUnusedLocals` and `noUnusedParameters` — unused imports and variables are compile errors, not just warnings. `pnpm build` will fail if there are type errors.
