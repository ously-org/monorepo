# Prosperously Specification (web-prosper)

This specification maps the high-level Features to the functional requirements of the Prosperously dashboard.

## 🗺 Feature Mapping

### Feature: Account V1 (#2)

- **Requirement**: Seamless login/registration via the central Ously Identity provider.
- **Status**: See GitHub Issue #2.

### Feature: Current Financial V1 (#65)

- **Requirement**: Ability to track multiple accounts, transaction history, and asset valuation.
- **Status**: See GitHub Issue #65.

### Feature: Branch Feature V1 (#63)

- **Requirement**: "Sandbox" mode where users can branch their financial data to test investment strategies or spending changes.
- **Status**: See GitHub Issue #63.

## 🛠 Technical Requirements

- Must use `@ously/ui` for all dashboard widgets.
- Financial calculations should be handled in a BFF layer to keep the central API lean.
