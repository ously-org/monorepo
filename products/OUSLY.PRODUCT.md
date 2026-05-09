# OUSLY-MAIN: Ously Product Description (web-main)

Ously is the central hub and main marketing presence for the entire ecosystem. It serves as the primary entry point for users to discover and manage their various Ously applications.

## 🎯 Purpose

To act as the "Home Base" for the Ously brand, providing marketing presence and a directory for specialized applications like Prosperously.

## 🏗 Architecture

- **Frontend**: Next.js application.
- **Identity**: Redirects or integrates with the identity hub currently located in **PROSPER** (until the dedicated Account App is established).
- **BFF**: Uses Next.js server-side logic to transform central `API` data for marketing and high-level dashboard views.

## 🚀 Key Features

- **Central Landing Page**: Marketing and brand identity.
- **Unified Account Settings**: Profile management, security, and billing.
- **App Directory**: Links and quick-access views for `web-prosper` and other future apps.

## 🛠 Internal Tools

- **Storybook**: Shared component documentation.
- **Pre-commit Checks**: Automated linting and type-checking via `@precommit_check`.
