import { z } from "zod";

/**
 * Ensures a Zod schema strictly matches a Domain interface.
 * Returns the schema instance itself (S) to preserve .parse()/.safeParse().
 */
export function match<T>() {
  return <S extends z.ZodType<T, any, any>>(schema: S): S => {
    return schema;
  };
}
