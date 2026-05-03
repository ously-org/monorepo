export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  currency?: "USD" | "EUR" | "GBP";
  subscriptionStatus?:
    | "active"
    | "inactive"
    | "past_due"
    | "canceled"
    | "trialing";
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
