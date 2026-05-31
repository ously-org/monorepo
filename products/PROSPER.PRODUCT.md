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

## 🗂 Focused Page Architecture & User Interface Spec

To maintain clarity and simplicity, each page in the application is designed to fulfill a single, focused responsibility:

### 1. Dashboard Overview (`/`)

- **Core Focus**: Real-time financial health summary.
- **Key Elements**:
  - **KPI Scorecard**: Net Worth, Total Assets, Total Liabilities.
  - **Active Scenario Indicator**: A persistent banner showing the currently active branch.
  - **Net Worth Trend**: Simple projection chart representing the active branch's trajectory.

### 2. Scenario Manager (`/branches`)

- **Core Focus**: Creating, selecting, and deleting financial "what-if" branches.
- **Key Elements**:
  - **Active Scenario Details**: Status and info card for the selected branch.
  - **Scenario Tree / List**: Clean tabular overview of existing branches.
  - **Actions**: Forms for creating new branches, branching off a timestamp, and switching the active branch.

### 3. Scenario Comparator (`/compare`)

- **Core Focus**: Comparing the financial delta between different decisions.
- **Key Elements**:
  - **Scenario Selector**: Dropdowns to select multiple branches for comparison.
  - **Comparison Projections**: Overlay line-chart showing growth difference.
  - **Milestone Target Projections**: Comparative stats table (e.g. Net Worth at age 50, debt payoff dates).

### 4. Ledger & Transactions (`/ledger`)

- **Core Focus**: Ledger auditing and data entry.
- **Key Elements**:
  - **Ledger Grid**: Filterable, paginated list of assets, liabilities, income, and expenses.
  - **Quick Entry Drawer**: Standardized form to log new financial entries.

### 5. Profile & Identity (`/settings/profile`)

- **Core Focus**: User profile details management.
- **Key Elements**:
  - Personal info fields (Name, email, avatar).
  - Gender choice field (`UserGender` in `@ously/domain`).

### 6. Preferences Settings (`/settings/preferences`)

- **Core Focus**: Localization and formatting configurations.
- **Key Elements**:
  - Default reporting currency dropdown (`UserCurrency` in `@ously/domain`).

### 7. Subscription & Billing (`/settings/billing`)

- **Core Focus**: Ecosystem plan status validation.
- **Key Elements**:
  - Tier display (`UserSubscriptionStatus` in `@ously/domain`).
  - Billing and integration manager.
