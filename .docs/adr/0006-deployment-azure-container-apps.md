# ADR-0006: Deploy via Azure Container Apps + GitHub Actions

**Status:** Accepted  
**Date:** 2026-06-19

## Context

The app needs to be publicly hosted. An Azure Container App instance was already created manually. All API calls use relative `/api/` paths that are proxied to `https://tennisstats.be` by Vite's dev server; a production host must replicate this proxy.

## Decision

Package the app as an nginx Docker image (multi-stage build) and automate deployment through GitHub Actions on every push to `main`:

1. **nginx** serves the static `dist/` bundle, handles SPA routing via `try_files`, and proxies `/api/` to `https://tennisstats.be`.
2. **GitHub Actions** builds the image, pushes it to Azure Container Registry (ACR), and updates the Container App using `azure/container-apps-deploy-action@v2`.
3. Images are tagged with the full commit SHA for traceability; `latest` is also updated.
4. Azure credentials are stored as GitHub repository secrets (service principal JSON via `az ad sp create-for-rbac --json-auth`).

## Consequences

- Every `main` push triggers a full build and deploy (~2–3 min); no manual steps after secrets are configured.
- The nginx proxy removes the need for any server-side backend — the Container App remains a pure static-file server.
- Rolling back means re-tagging or re-deploying a prior SHA image via `az containerapp update`.
- ACR admin credentials and a service principal are required — both must be rotated if compromised.
