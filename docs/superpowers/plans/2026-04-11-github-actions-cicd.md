# GitHub Actions CI/CD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement GitHub Actions CI/CD for the monorepo using Cloudflare deployments.

**Architecture:** Use a single workflow `deploy.yml` that builds the monorepo and deploys the API to Cloudflare Workers and the web apps to Cloudflare Pages using `wrangler-action`.

**Tech Stack:** GitHub Actions, pnpm, Cloudflare Wrangler.

---

### Task 1: Create GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the `.github/workflows` directory**

Run: `mkdir -p .github/workflows`

- [ ] **Step 2: Create the `deploy.yml` file**

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Build & Deploy
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 10.30.3

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Deploy API (Worker)
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          workingDirectory: 'apps/api'
          command: deploy

      - name: Deploy Ously Web (Pages)
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          workingDirectory: 'apps/web-main'
          command: pages deploy .next --project-name=ously-main

      - name: Deploy Prosper Web (Pages)
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          workingDirectory: 'apps/web-prosper'
          command: pages deploy .next --project-name=prosper-web
```

- [ ] **Step 3: Verify the file exists and has correct content**

Run: `cat .github/workflows/deploy.yml`

### Task 2: Update Dependencies and Commit

**Files:**
- Modify: `pnpm-lock.yaml` (indirectly via `pnpm install`)

- [ ] **Step 1: Run `pnpm install`**

Run: `pnpm install`

- [ ] **Step 2: Commit changes**

Run: `git add . && git commit -m "feat: GitHub Actions CI/CD (Cloudflare Deployments)"`

- [ ] **Step 3: Verify the commit**

Run: `git status && git log -n 1`
