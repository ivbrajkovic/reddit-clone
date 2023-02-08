import { curryN, isNil } from "ramda";

export const throwIfNil = curryN(
  2,
  <T>(message: string | undefined, value: T | null | undefined): T => {
    if (isNil(value)) throw new Error(message ?? "Value is nil.");
    return value;
  },
);
