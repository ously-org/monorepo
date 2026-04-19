import { z } from "zod";

type Match<T, S> = [T] extends [S] ? ([S] extends [T] ? S : never) : never;

export function match<T>() {
  return <S extends z.ZodTypeAny>(schema: S): Match<T, z.infer<S>> => {
    return schema as any;
  };
}
