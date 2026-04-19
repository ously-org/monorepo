import { z } from "zod";
import { type User } from "@ously/domain";
import { match } from "./match";

export const UserSchema = match<User>()(
  z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
  })
);

export * from "./prosper";
export { type User };
