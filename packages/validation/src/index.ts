import { z } from "zod";
import {
  type User,
  type Account,
  type Session,
  type Verification,
} from "@ously/domain";
import { match } from "./match";

export const UserSchema = match<User>()(
  z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
    image: z.string().optional(),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
    currency: z.enum(["USD", "EUR", "GBP"]).optional(),
    subscriptionStatus: z
      .enum(["active", "inactive", "past_due", "canceled", "trialing"])
      .optional(),
    emailVerified: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const SessionSchema = match<Session>()(
  z.object({
    id: z.string(),
    expiresAt: z.date(),
    token: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    userId: z.string(),
  }),
);

export const AccountSchema = match<Account>()(
  z.object({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    userId: z.string(),
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    idToken: z.string().optional(),
    accessTokenExpiresAt: z.date().optional(),
    refreshTokenExpiresAt: z.date().optional(),
    scope: z.string().optional(),
    password: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const VerificationSchema = match<Verification>()(
  z.object({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.date(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
);

export { type User, type Account, type Session, type Verification };
