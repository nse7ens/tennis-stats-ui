# Deployment secrets setup (GitHub Actions → Azure Container Apps)

The CI/CD pipeline in `.github/workflows/deploy.yml` requires **6 repository secrets** to be set in GitHub before it will succeed. This guide walks through creating each one.

## Prerequisites

- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) installed and logged in (`az login`)
- Your Azure Container Registry (ACR) and Container App already exist (created manually per ADR-0006)
- Push access to the GitHub repository

---

## Secrets overview

| Secret | What it is |
|---|---|
| `REGISTRY_LOGIN_SERVER` | ACR hostname, e.g. `myregistry.azurecr.io` |
| `REGISTRY_USERNAME` | ACR admin username |
| `REGISTRY_PASSWORD` | ACR admin password |
| `AZURE_CREDENTIALS` | Service principal JSON for `azure/login` |
| `AZURE_CONTAINER_APP_NAME` | Name of the Container App resource |
| `AZURE_RESOURCE_GROUP` | Resource group that contains the Container App |

---

## Step-by-step

### 1 — ACR credentials (`REGISTRY_LOGIN_SERVER`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD`)

Enable admin access on the registry and retrieve the credentials:

```bash
# Replace <registry-name> with your ACR name (without .azurecr.io)
ACR=<registry-name>

az acr update --name $ACR --admin-enabled true

az acr show   --name $ACR --query loginServer --output tsv
# → use this value as REGISTRY_LOGIN_SERVER

az acr credential show --name $ACR --query "username" --output tsv
# → use this value as REGISTRY_USERNAME

az acr credential show --name $ACR --query "passwords[0].value" --output tsv
# → use this value as REGISTRY_PASSWORD
```

### 2 — Azure service principal (`AZURE_CREDENTIALS`)

Create a service principal scoped to the resource group the Container App lives in:

```bash
RG=<resource-group-name>

az ad sp create-for-rbac \
  --name "github-tennis-stats-deploy" \
  --role contributor \
  --scopes /subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RG \
  --json-auth
```

The command prints a JSON block. Copy the **entire block** (including the outer `{…}`) as the value for `AZURE_CREDENTIALS`. It looks like:

```json
{
  "clientId": "...",
  "clientSecret": "...",
  "subscriptionId": "...",
  "tenantId": "...",
  ...
}
```

> **Note:** `--json-auth` is required — the `azure/login@v2` action expects this format.

### 3 — Container App details (`AZURE_CONTAINER_APP_NAME`, `AZURE_RESOURCE_GROUP`)

These are plain strings you can look up in the portal or via CLI:

```bash
az containerapp list --query "[].{name:name, rg:resourceGroup}" --output table
```

Use the `name` column as `AZURE_CONTAINER_APP_NAME` and the `rg` column as `AZURE_RESOURCE_GROUP`.

---

## Adding secrets to GitHub

Go to your repository → **Settings → Secrets and variables → Actions → New repository secret**, and add each secret from the table above.

Or use the GitHub CLI:

```bash
gh secret set REGISTRY_LOGIN_SERVER   --body "myregistry.azurecr.io"
gh secret set REGISTRY_USERNAME       --body "<acr-admin-username>"
gh secret set REGISTRY_PASSWORD       --body "<acr-admin-password>"
gh secret set AZURE_CREDENTIALS       --body "$(cat creds.json)"   # paste into creds.json first
gh secret set AZURE_CONTAINER_APP_NAME --body "<container-app-name>"
gh secret set AZURE_RESOURCE_GROUP    --body "<resource-group-name>"
```

---

## Verifying the pipeline

Once all 6 secrets are in place, push any commit to `main` (or trigger manually via **Actions → Deploy to Azure Container Apps → Run workflow**). The job should:

1. Log in to ACR and push two image tags (`<sha>` + `latest`)
2. Log in to Azure via the service principal
3. Update the Container App to the new image

Total runtime is typically 2–3 minutes. If a step fails, the Actions log will show which secret is missing or malformed.

---

## Rotating secrets

- **ACR password:** run `az acr credential renew --name $ACR --password-name password` then update `REGISTRY_PASSWORD` in GitHub.
- **Service principal:** run `az ad sp credential reset --id <clientId>` then update `AZURE_CREDENTIALS`.
- Never commit these values to the repository.
