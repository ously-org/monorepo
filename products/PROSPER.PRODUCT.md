# PROSPER: Prosperously Product Description (web-prosper)

Prosperously is the specialized financial management and prosperity dashboard within the Ously ecosystem. It focuses on providing users with deep insights into their financial health, version-controlled financial data, and AI-assisted prosperity planning.

## 🎯 Purpose

To empower users with a "Pro" level financial dashboard that leverages version control concepts (Branching) for financial scenarios and long-term planning.

## 🏗 Architecture

- **Frontend**: Next.js application (deployed on Cloudflare Pages).
- **Identity (Temporary)**: Currently acts as the primary holder for user identity and account management until a dedicated Account App is launched.
- **BFF (Backend-for-Frontend)**: Implemented within the Next.js server layer (Route Handlers/Server Actions). It calls the central `API`, transforms the raw data, and exposes only what is necessary for specific UI pages to optimize performance and security.
- **Shared UI**: Built using `@ously/ui`.

## 🚀 Key Features

- **Financial Dashboard**: High-level overview of assets, liabilities, and net worth.
- **Financial Branching**: A specialized versioning engine for financial data, allowing users to create "What-if" scenarios (e.g., "Branch: Buy a House") without impacting the main ledger.
- **Identity Hub**: Manage user profiles and authentication for the Ously ecosystem (Current).

## 🛠 Internal Tools

- **Storybook**: Used for isolated UI component development and documentation in `apps/storybook`.
- **Vitest**: Unit and integration testing framework.
