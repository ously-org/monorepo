// ISSUE_#81 | 2026-05-09 | Extract UserGender, UserCurrency, UserSubscriptionStatus named types in User domain interface

export type UserGender = "male" | "female" | "other" | "prefer_not_to_say";

export type UserCurrency = "USD" | "EUR" | "GBP";

export type UserSubscriptionStatus =
  | "active"
  | "inactive"
  | "past_due"
  | "canceled"
  | "trialing";

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  gender?: UserGender;
  currency?: UserCurrency;
  subscriptionStatus?: UserSubscriptionStatus;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
